var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-distinct-years', (req, res) => {
        const sql = `
            SELECT DISTINCT Year
            FROM classroom
            ORDER BY Year;
        `;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error querying distinct years:', err);
                return res.status(500).json({ error: 'Failed to retrieve distinct years' });
            }
            // res.status(200).json(results);
            const years = results.map(result => result.Year);
            return res.status(200).json(years);
        });
    });

    router.get('/personnel-get-student-info', (req, res) => {
        const { Student_ID } = req.query;

        // SQL query to get NameTitle, FirstName, and LastName by Student_ID
        const sql = `
            SELECT Student_ID, NameTitle, FirstName, LastName
            FROM Student
            WHERE Student_ID = ?
        `;

        // Execute the SQL query
        connection.query(sql, [Student_ID], (err, results) => {
            if (err) {
                console.error('Error querying student information:', err);
                return res.status(500).json({ error: 'Failed to retrieve student information' });
            }
            
            // Check if the student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.get('/get-distinct-years-of-personnel', (req, res) => {
        const { Personnel_Email } = req.query;
        const sql = `
            SELECT DISTINCT Year
            FROM Class_Teacher
            WHERE Personnel_Email = ?
        `;

        connection.query(sql, [Personnel_Email], (err, results) => {
            if (err) {
                console.error('Error querying distinct years of personnel:', err);
                return res.status(500).json({ error: 'Failed to retrieve distinct years of personnel' });
            }
            // res.status(200).json(results);
            const years = results.map(result => result.Year);
            return res.status(200).json(years);
        });
    });

    router.get('/get-classroom-info-from-personnel', (req, res) => {
        const { Personnel_Email } = req.query;

        // SQL query to get Year, Level, Room by Personnel_Email
        const sql = `
            SELECT Year, Level, Room
            FROM Class_Teacher
            WHERE Personnel_Email = ?
        `;

        // Execute the SQL query to get Year, Level, Room
        connection.query(sql, [Personnel_Email], (err, results) => {
            if (err) {
                console.error('Error querying class_teacher information:', err);
                return res.status(500).json({ error: 'Failed to retrieve class_teacher information' });
            }

            // Check if the class_teacher information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'Not found class of this class teacher' });
            }

            // Get Year, Level, Room from all results
            const classroomInfo = results.map(result => {
                return {
                    Year: result.Year,
                    Level: result.Level,
                    Room: result.Room
                };
            });

            // SQL query to get Student_ID by Year, Level, Room
            const classroomQuery = `
                SELECT Student_ID
                FROM classroom
                WHERE Year = ? AND Level = ? AND Room = ?
            `;

            // Execute the SQL query to get Student_ID for each classroomInfo
            const promises = classroomInfo.map(info => {
                return new Promise((resolve, reject) => {
                    connection.query(classroomQuery, [info.Year, info.Level, info.Room], (err, classroomResults) => {
                        if (err) {
                            console.error('Error querying classroom information:', err);
                            return reject(err);
                        }
                        info.Student_ID = classroomResults.map(result => result.Student_ID);
                        resolve();
                    });
                });
            });

            // Wait for all promises to resolve
            Promise.all(promises)
                .then(() => {
                    // Return the classroomInfo with Student_ID results
                    res.status(200).json(classroomInfo);
                })
                .catch(err => {
                    res.status(500).json({ error: 'Failed to retrieve classroom information' });
                });
        });
    });


    // router.get('/get-classroom-info-from-personnel', (req, res) => {
    //     const { Personnel_Email } = req.query;

    //     // SQL query to get Year, Level, Room by Personnel_Email
    //     const sql = `
    //         SELECT Year, Level, Room
    //         FROM Class_Teacher
    //         WHERE Personnel_Email = ?
    //     `;

    //     // Execute the SQL query to get Year, Level, Room
    //     connection.query(sql, [Personnel_Email], (err, results) => {
    //         if (err) {
    //             console.error('Error querying class_teacher information:', err);
    //             return res.status(500).json({ error: 'Failed to retrieve class_teacher information' });
    //         }

    //         // Check if the class_teacher information is found
    //         if (results.length === 0) {
    //             return res.status(404).json({ error: 'Not found class of this class teacher' });
    //         }

    //         // Get Year, Level, Room from the first result
    //         const { Year, Level, Room } = results[0];

    //         // SQL query to get Student_ID by Year, Level, Room
    //         const classroomQuery = `
    //             SELECT Student_ID
    //             FROM classroom
    //             WHERE Year = ? AND Level = ? AND Room = ?
    //         `;

    //         // Execute the SQL query to get Student_ID
    //         connection.query(classroomQuery, [Year, Level, Room], (err, classroomResults) => {
    //             if (err) {
    //                 console.error('Error querying classroom information:', err);
    //                 return res.status(500).json({ error: 'Failed to retrieve classroom information' });
    //             }

    //             // Return the Student_ID results
    //             res.status(200).json(classroomResults);
    //         });
    //     });
    // });

    router.get('/personnel-get-classroom-info-from-year', (req, res) => {
        const { Personnel_Email, Year } = req.query;

        // SQL query to get Year, Level, Room by Personnel_Email
        const sql = `
            SELECT Year, Level, Room
            FROM Class_Teacher
            WHERE Personnel_Email = ? AND Year = ?
        `;

        // Execute the SQL query to get Year, Level, Room
        connection.query(sql, [Personnel_Email, Year], (err, results) => {
            if (err) {
                console.error('Error querying class_teacher information:', err);
                return res.status(500).json({ error: 'Failed to retrieve class_teacher information' });
            }

            // Check if the class_teacher information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'Not found class of this class teacher' });
            }

            // Get Year, Level, Room from the first result
            const { Year, Level, Room } = results[0];

            // SQL query to get Student_ID by Year, Level, Room
            const classroomQuery = `
                SELECT Student_ID
                FROM classroom
                WHERE Year = ? AND Level = ? AND Room = ?
            `;

            // Execute the SQL query to get Student_ID
            connection.query(classroomQuery, [Year, Level, Room], (err, classroomResults) => {
                if (err) {
                    console.error('Error querying classroom information:', err);
                    return res.status(500).json({ error: 'Failed to retrieve classroom information' });
                }

                // Return the Student_ID results
                res.status(200).json(classroomResults);
            });
        });
    });

    // router.get('/get-student-info-by-id', (req, res) => {
    //     const studentIDs = req.query; // รับข้อมูล Student_ID ที่ส่งมา

    //     // ตรวจสอบว่ามีข้อมูล Student_ID ที่ส่งมาหรือไม่
    //     if (!studentIDs || Object.keys(studentIDs).length === 0) {
    //         return res.status(400).json({ error: 'No Student_ID provided' });
    //     }

    //     // สร้าง SQL query เพื่อคิวรี่ข้อมูลจากตาราง student
    //     const sql = `
    //         SELECT Student_ID, NameTitle, FirstName, LastName
    //         FROM student
    //         WHERE Student_ID IN (?)
    //     `;

    //     // ส่งคำสั่ง SQL query ไปยังฐานข้อมูล
    //     connection.query(sql, [Object.values(studentIDs)], (err, results) => {
    //         if (err) {
    //             console.error('Error querying student information:', err);
    //             return res.status(500).json({ error: 'Failed to retrieve student information' });
    //         }

    //         // ตรวจสอบว่ามีข้อมูลหรือไม่
    //         if (results.length === 0) {
    //             return res.status(404).json({ error: 'No student information found' });
    //         }

    //         // ส่งข้อมูลที่ได้กลับไปยังผู้ใช้งาน
    //         res.status(200).json(results);
    //     });
    // });


    router.post('/get-student-info-by-id', (req, res) => {
        const studentIDs = req.body; // รับข้อมูล Student_ID ที่ส่งมา

        // ตรวจสอบว่ามีข้อมูล Student_ID ที่ส่งมาหรือไม่
        if (!studentIDs || studentIDs.length === 0) {
            return res.status(400).json({ error: 'No Student_ID provided' });
        }

        // สร้าง SQL query เพื่อคิวรี่ข้อมูลจากตาราง student
        const sql = `
            SELECT Student_ID, NameTitle, FirstName, LastName
            FROM student
            WHERE Student_ID IN (?)
        `;

        // ส่งคำสั่ง SQL query ไปยังฐานข้อมูล
        connection.query(sql, [studentIDs.map(student => student.Student_ID)], (err, results) => {
            if (err) {
                console.error('Error querying student information:', err);
                return res.status(500).json({ error: 'Failed to retrieve student information' });
            }

            // ตรวจสอบว่ามีข้อมูลหรือไม่
            if (results.length === 0) {
                return res.status(404).json({ error: 'No student information found' });
            }

            // ส่งข้อมูลที่ได้กลับไปยังผู้ใช้งาน
            res.status(200).json(results);
        });
    });

    router.get('/personnel-get-parent-info-from-student-id', (req, res) => {
        const { Student_ID } = req.query;

        // SQL query to get first_ParentEmail, second_ParentEmail, third_ParentEmail by Student_ID
        const parentEmailQuery = `
            SELECT first_ParentEmail, second_ParentEmail, third_ParentEmail
            FROM student_parentemail
            WHERE Student_ID = ?
        `;

        // Execute the SQL query to get parent emails
        connection.query(parentEmailQuery, [Student_ID], (err, parentEmailResults) => {
            if (err) {
                console.error('Error querying parent emails:', err);
                return res.status(500).json({ error: 'Failed to retrieve parent emails' });
            }

            // Extract parent emails from the results
            const parentEmails = parentEmailResults[0];

            // Prepare an array to store parent information
            const parentInfoList = [];

            // Iterate through each parent email and query parent information
            Object.values(parentEmails).forEach(parentEmail => {
                // SQL query to get parent information by Email
                const parentQuery = `
                    SELECT FirstName, LastName, DateOfBirth, Nationality, Occupation, Office, Role, Tel
                    FROM parent
                    WHERE Email = ?
                `;

                // Execute the SQL query to get parent information
                connection.query(parentQuery, [parentEmail], (err, parentResults) => {
                    if (err) {
                        console.error('Error querying parent information:', err);
                        return res.status(500).json({ error: 'Failed to retrieve parent information' });
                    }

                    // Add parent information to the list
                    parentInfoList.push(parentResults[0]);

                    // If all parent information is retrieved, return the list
                    if (parentInfoList.length === Object.keys(parentEmails).length) {
                        res.status(200).json(parentInfoList);
                    }
                });
            });
        });
    });


    router.get('/personnel-get-student-info-by-student-id', (req, res) => {
        const { Student_ID } = req.query;

        // SQL query to retrieve student information
        const sql = `
            SELECT 
                Student_NID, 
                Student_ID, 
                NameTitle, 
                FirstName, 
                LastName, 
                Student_DOB, 
                BirthCert_file, 
                Transcript_type, 
                Transcript_file,
                parent
            FROM 
                student
            WHERE 
                Student_ID = ?
        `;
        // const sql = `
        //             SELECT Student_NID, Student_ID, NameTitle, FirstName, LastName, Student_DOB, BirthCert_file, Transcript_type, Transcript_file
        //             FROM student
        //             WHERE Student_ID = ?
        //         `;

        // Execute the SQL query
        connection.query(sql, [Student_ID], (err, results) => {
            if (err) {
                console.error('Error querying student information:', err);
                return res.status(500).json({ error: 'Failed to retrieve student information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'Student information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.get('/personnel-get-student-address-by-student-id', (req, res) => {
        const { Student_ID } = req.query;

        // SQL query to retrieve student information
        const sql = `
            SELECT 
                House_No, 
                Moo, 
                Soi, 
                Road, 
                Province, 
                District, 
                Sub_District, 
                HouseReg_file
            FROM 
                student
            WHERE 
                Student_ID = ?
        `;
        connection.query(sql, [Student_ID], (err, results) => {
            if (err) {
                console.error('Error querying student information:', err);
                return res.status(500).json({ error: 'Failed to retrieve student information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'Student information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.get('/teaching-assignment-get-year', (req, res) => {
        const sql = `
            SELECT distinct 
                year
            FROM 
                teaching_assignment
            ORDER BY year ASC
        `;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to retrieve year of assignment information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'year of assignment information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/teaching-assignment-get-semester', (req, res) => {
        const { year } = req.body;
        const sql = `
            SELECT distinct 
                Semester
            FROM 
                teaching_assignment
            WHERE
                year = ?
            ORDER BY semester ASC
        `;
        connection.query(sql, [year], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to retrieve semester of assignment information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'semester of assignment information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/teaching-assignment-get-subject', (req, res) => {
        const { year, semester } = req.body;
        const sql = `
            SELECT distinct 
                subject.subject_name,
                teaching_assignment.subject_id
            FROM 
                teaching_assignment
            join 
                subject
            on 
                teaching_assignment.subject_id = subject.Subject_ID
            where
                teaching_assignment.year = ?
            AND 
                teaching_assignment.semester = ?
        `;
        connection.query(sql,[year,semester], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to retrieve subject of assignment information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'subject of assignment information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/assessment-get-name-proportion', (req, res) => {
        const { year, semester, subject } = req.body;
        const sql = `
            SELECT 
                assessment.Assessment_name, 
                assessment.Assessment_proportion,
                assessment.id as Assessment_id
            FROM 
                assessment
            join 
                subject
            on 
                assessment.subject_id = subject.Subject_ID
            where
                assessment.year = ? AND
                assessment.semester = ? AND
                subject.subject_name = ?
        `;
        connection.query(sql,[year,semester,subject], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to retrieve assessment information' });
            }

            // Check if student information is found
            if (results.length === 0) {
                return res.status(404).json({ error: 'Assessment information not found' });
            }

            // Return the student information
            res.status(200).json(results);
        });
    });

    router.post('/update-assessment', (req, res) => {
        const { assessment_name, assessment_proportion, id } = req.body;
        const sql = `
            UPDATE 
                assessment
            SET 
                Assessment_proportion = ?,
                Assessment_name = ?
            WHERE
                id = ?;
        `;
        connection.query(sql,[assessment_proportion, assessment_name, id], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to update assessment information' });
            }
            res.status(200).json({results, message: "Update assessment successfully"});
        });
    });

    router.post('/insert-new-assessment', (req, res) => {
        const { subject, assessment_name, assessment_proportion, year, semester } = req.body;
        const sqlget = `
            select 
                Subject_id
            from 
                subject
            where 
                subject_name = 'science';
        `;
        connection.query(sqlget,[subject], (err, results) => {
            if (err) {
                console.error('Error querying assignment information:', err);
                return res.status(500).json({ error: 'Failed to insert assessment information' });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'subject information not found' });
            }

            const sql = `
            insert into Assessment 
                (Subject_ID, Assessment_Name, Assessment_Proportion,Year,Semester)
            VALUES
                (?,?,?,?,?)
            `;
            connection.query(sql,[results[0].Subject_id, assessment_name, assessment_proportion, year, semester], (err, outcome) => {
                if (err) {
                    console.error('Error querying assignment information:', err);
                    return res.status(500).json({ error: 'Failed to insert assessment information' });
                }
                res.status(200).json({outcome, message: "Insert assessment successfully"});
            });
        });
    });

    return router;
}



// module.exports = router;