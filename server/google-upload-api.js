
var express = require('express')
const router = express.Router();
require('dotenv').config();

// const path = require("path");
const iconv = require('iconv-lite');
const { google } = require("googleapis");
const multer = require("multer"); // import multer ก่อน stream
const stream = require("stream"); // import stream หลังจาก multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function(connection) {
    // const KEYFILEPATH = path.join(__dirname, "school-project-ggDrive.json");
    const SCOPES = ["https://www.googleapis.com/auth/drive"];

    const auth = new google.auth.GoogleAuth({
        credentials: {
            "type": process.env.type,
            "project_id": process.env.project_id,
            "private_key_id": process.env.private_key_id,
            "private_key": process.env.private_key,
            "client_email": process.env.client_email,
            "client_id": process.env.client_id,
            "auth_uri": process.env.auth_uri,
            "token_uri": process.env.token_uri,
            "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
            "client_x509_cert_url": process.env.client_x509_cert_url,
            "universe_domain": process.env.universe_domain
        },
        scopes: SCOPES,
    });

    // const auth = new google.auth.GoogleAuth({
    //     keyFile: KEYFILEPATH,
    //     scopes: SCOPES,
    // });

    router.post("/upload", upload.any(), async (req, res) => {
        try {
                console.log("req.body", req.body);
                console.log("req.files", req.files);
                const { body, files } = req;

                // ดึงข้อมูลนักเรียนที่ส่งมาจากฟอร์ม
                const { Student_NID, NameTitle, FirstName, LastName, Student_DOB, Transcript_type, ParentEmail, HouseNumber, Moo, Soi, Road, Province, District, SubDistrict } = body;

                console.log("files",files);

                const transcriptFilesUrls = [];
                // อัปโหลดไฟล์ที่ส่งมาไปยัง Google Drive
                for (let f = 0; f < files.length; f += 1) {
                    const data = await uploadFile(files[f]);
                    transcriptFilesUrls.push(`https://drive.google.com/file/d/${data.id}`);
                }

                // ตรวจสอบว่ามี URL ของไฟล์ที่อัปโหลดพอสำหรับการเข้าถึงหรือไม่
                if (transcriptFilesUrls.length >= 4) {
                    // เรียกใช้งานฟังก์ชันเพื่อเพิ่มข้อมูลลงในฐานข้อมูล
                    await addApplicantToDatabase(Student_NID, NameTitle, FirstName, LastName, Student_DOB, transcriptFilesUrls[0], HouseNumber, Moo, Soi, Road, Province, District, SubDistrict, Transcript_type, transcriptFilesUrls[1], transcriptFilesUrls[2], transcriptFilesUrls[3], ParentEmail);
                    res.status(200).send("Form Submitted");
                } else {
                    // จัดการข้อผิดพลาดหาก URL ของไฟล์ไม่เพียงพอ
                    console.error("Not enough transcript file URLs for accessing.");
                    // ส่งคำตอบเฉพาะข้อผิดพลาดกลับไป
                    res.status(500).json({ error: "Not enough transcript file URLs for accessing." });
                }

                // อัปโหลดไฟล์ที่ส่งมาไปยัง Google Drive
                // for (let f = 0; f < files.length; f += 1)
                // {
                //     // await uploadFile(files[f]);
                //     const data = await uploadFile(files[f]);

                // }

                // res.status(200).send("Form Submitted");

                // const Transcript_file = `https://drive.google.com/file/d/${data.id}`;


                // เพิ่มข้อมูลนักเรียนลงในฐานข้อมูล
                // await addApplicantToDatabase(Student_NID, NameTitle, FirstName, LastName, Student_DOB, transcriptFilesUrls[0], House_No, Moo, Soi, Road, Province, District, Sub_District, Transcript_type, transcriptFilesUrls[1], transcriptFilesUrls[2], HouseReg_file, ParentEmail);
                // res.status(200).send("Form Submitted");
            }   
            catch (error) {
                if (error.status && error.message) {
                    return res.status(error.status).json({ error: error.message });
                } else {
                    console.error(error);
                    return res.status(500).send();
                }
            }
        });

    const uploadFile = async (fileObject) => {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);
        // ใช้ iconv-lite ในการ decode ชื่อไฟล์
        const originalFilename = iconv.decode(Buffer.from(fileObject.originalname, 'binary'), 'utf-8');
        console.log('originalFilename', originalFilename);
        const { data } = await google.drive({ version: "v3", auth }).files.create({
            media: {
                mimeType: fileObject.mimeType,
                body: bufferStream,
            },
            requestBody: {
                name: originalFilename,
                parents: [process.env.PARENT],
            },
            fields: "id,name",
        });
        console.log(`Uploaded file ${data.name} ${data.id}`);
        console.log(`https://drive.google.com/file/d/${data.id}`);
        return data;
    };

    const addApplicantToDatabase = async (Student_NID, NameTitle, FirstName, LastName, Student_DOB, Avatar, House_No, Moo, Soi, Road, Province, District, Sub_District, Transcript_type, Transcript_file, BirthCert_file, HouseReg_file, ParentEmail) => {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO Applicant (Student_NID, NameTitle, FirstName, LastName, Student_DOB, Avatar, House_No, Moo, Soi, Road, Province, District, Sub_District, Transcript_type, Transcript_file, BirthCert_file, HouseReg_file, ParentEmail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [Student_NID, NameTitle, FirstName, LastName, Student_DOB, Avatar, House_No, Moo, Soi, Road, Province, District, Sub_District, Transcript_type, Transcript_file, BirthCert_file, HouseReg_file, ParentEmail],
                (err, results, fields) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            reject({ status: 409, message: "Identification number already exists." });
                        } else {
                            console.log("Error while inserting student information into the database", err);
                            reject({ status: 400, message: err.message });
                        }
                    } else {
                        resolve({ status: 200, message: "Student information successfully recorded!" });
                    }
                }
            );
        });
    };

    router.post("/upload-student-img-request", upload.any(), async (req, res) => {
        try {
                console.log("req.body", req.body);
                console.log("req.files", req.files);
                const { body, files } = req;

                // ดึงข้อมูลนักเรียนที่ส่งมาจากฟอร์ม
                // const { Student_ID, Parent_Email, Request_Date, Request_type, Requested_Copies, Request_detail, Request_status } = body;
                const { CheckRequestStudent, CheckRequestTranscript, Student_ID, Parent_Email, Request_Date, AmountRequestStudent, AmountRequestTranscript, Request_detail, Request_status } = body;

                console.log("files",files);

                const requestFilesUrls = [];
                // อัปโหลดไฟล์ที่ส่งมาไปยัง Google Drive
                for (let f = 0; f < files.length; f += 1) {
                    const data = await uploadFile(files[f]);
                    requestFilesUrls.push(`https://drive.google.com/file/d/${data.id}`);
                }

                console.log("requestFilesUrls",requestFilesUrls);
                // ตรวจสอบว่ามี URL ของไฟล์ที่อัปโหลดพอสำหรับการเข้าถึงหรือไม่
                console.log("111111",AmountRequestStudent);
                console.log("2222222",AmountRequestTranscript);
                if (requestFilesUrls.length >= 1) {
                    try {
                        // await addRequestToDatabase(Student_ID, Parent_Email, Request_Date, Request_type, Requested_Copies, Request_detail, requestFilesUrls[0], Request_status);
                        console.log("777777777",CheckRequestStudent);
                        if(CheckRequestStudent === "true"){
                            console.log("555555555",AmountRequestTranscript);
                            await addRequestToDatabase(Student_ID, Parent_Email, Request_Date, 'ปพ.7', AmountRequestStudent, Request_detail, requestFilesUrls[0], Request_status);
                        }

                        if(CheckRequestTranscript === "true"){
                            await addRequestToDatabase(Student_ID, Parent_Email, Request_Date, 'ปพ.1', AmountRequestTranscript, Request_detail, requestFilesUrls[0], Request_status);
                        }
                        
                        res.status(200).send("Form Submitted");
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ error: "Failed to save request information" });
                    }
                } else {
                    console.error("Not enough transcript file URLs for accessing.");
                    res.status(500).json({ error: "Not enough transcript file URLs for accessing." });
                }
                
            }   
            catch (error) {
                if (error.status && error.message) {
                    return res.status(error.status).json({ error: error.message });
                } else {
                    console.error(error);
                    return res.status(500).send();
                }
            }
        });

    const addRequestToDatabase = async (Student_ID, Parent_Email, Request_Date, Request_type, Requested_Copies, Request_detail, Request_StudentPicture, Request_status) => {
        const sql = `
            INSERT INTO Request (Student_ID, Parent_Email, Request_Date, Request_type, Requested_Copies, Request_detail, Request_StudentPicture, Request_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
    
        connection.query(sql, [Student_ID, Parent_Email, Request_Date, Request_type, Requested_Copies, Request_detail, Request_StudentPicture, Request_status], (err, results) => {
            if (err) {
                console.error('Error saving request information:', err);
                // ไม่ต้องส่งคำตอบกลับในที่นี้
                // res.status(500).json({ error: 'Failed to save request information' });
            }
    
            // ไม่ต้องส่งคำตอบกลับในที่นี้
            // res.status(200).json({ message: 'Request information saved successfully' });
        });
    };
    
    
    
    return router;
}
