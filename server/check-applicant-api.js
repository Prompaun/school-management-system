var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.post('/get-applicant-info', (req, res) => {
        const sql = `
            SELECT 
                Enroll_ID AS Enroll_ID, 
                Enroll_No AS Registration_Number, 
                Enroll_Date AS Registration_Date, 
                NameTitle AS Applicant_name_title, 
                FirstName AS Applicants_first_name, 
                LastName AS Applicants_last_name, 
                Enroll_Course AS Educational_Program, 
                Admission_Scores AS Exam_results, 
                Admission_Status AS ExamStatus, 
                Enroll_Status AS EnrollStatus
            FROM 
                enrollment
            JOIN
                applicant
            ON
                applicant.Student_NID = enrollment.Student_NID
            WHERE
                Enroll_Year = ?
    
        `;
        connection.query(sql, [new Date().getFullYear()], (err, results) => {
            if (err) {
                console.error('Error querying get applitcant info:', err);
                return res.status(500).json({ error: 'Failed to retrieve applitcant info' });
            }

            if (results.length === 0) {
                return res.status(200).json({ message: 'Info not found' });
            }

            return res.status(200).json({results, message: 'Retrieve applitcant info successfully' });
        });
    });

    router.post('/update-applicant-info', (req, res) => {
        const {score,exam_status,enroll_status,enroll_no} = req.body
        const sql = `
            UPDATE
                enrollment
            SET
                Admission_Scores = ?,
                Admission_Status = ?,
                Enroll_Status = ?
            WHERE
                Enroll_No = ?
        `;
        connection.query(sql, [score,exam_status,enroll_status,enroll_no], (err, results) => {
            if (err) {
                console.error('Error updating applitcant info:', err);
                return res.status(500).json({ error: 'Failed to update applitcant info' });
            }

            return res.status(200).json({results, message: 'Update applitcant info successfully' });
        });
    });

    router.post('/insert-applicant-to-student-info', (req, res) => {
        const {Enroll_ID} = req.body
        const sql = `
        INSERT INTO student 
            (Student_ID, Student_NID, NameTitle, FirstName, LastName, Student_DOB, House_No, Moo, Soi, Road, Province, District, 
            Sub_District, Transcript_type, Transcript_file, BirthCert_file, HouseReg_file, Password, Avatar, parent, course, enroll_year)
        SELECT 
            null,
            applicant.Student_NID,
            applicant.NameTitle,
            applicant.FirstName,
            applicant.LastName,
            applicant.Student_DOB,
            applicant.House_No,
            applicant.Moo,
            applicant.Soi,
            applicant.Road,
            applicant.Province,
            applicant.District,
            applicant.Sub_District,
            applicant.Transcript_type,
            applicant.Transcript_file,
            applicant.BirthCert_file,
            applicant.HouseReg_file,
            applicant.Student_NID,
            applicant.Avatar,
            applicant.Parent,
            enrollment.Enroll_Course,
            ?
        FROM
            enrollment
        JOIN
            applicant ON applicant.Student_NID = enrollment.Student_NID
        JOIN
            applicant_parentemail ON applicant_parentemail.Student_NID = applicant.Student_NID
        WHERE
            enrollment.Enroll_No = ?;
        `;
        connection.query(sql, [new Date().getFullYear()+543, Enroll_ID], (err, results) => {
            if (err) {
                console.error('Error querying get applitcant info:', err);
                if (err.sqlMessage !== "Duplicate entry '' for key 'student.Student_ID'" ){
                    return res.status(500).json({ error: 'Failed to insert applitcant to student info' });
                } else {
                    return res.status(200).json({ error: 'Already have' });
                }
            }

            const {Enroll_ID} = req.body
            const sql = `
                INSERT INTO student_parentemail
                    (Student_NID, first_ParentEmail, second_ParentEmail, third_ParentEmail)
                SELECT 
                    applicant_parentemail.Student_NID, first_ParentEmail, second_ParentEmail, third_ParentEmail
                FROM
                    applicant_parentemail
                JOIN
                    enrollment ON enrollment.Student_NID = applicant_parentemail.Student_NID
                WHERE
                    Enroll_No = ?
            `;
            connection.query(sql, [Enroll_ID], (err, results) => {
                if (err) {
                    console.error('Error querying get applitcant info:', err);
                    if (err.sqlMessage !== "Duplicate entry '' for key 'student.Student_ID'" ){
                        return res.status(500).json({ error: 'Failed to insert applitcant to student info' });
                    } else {
                        return res.status(200).json({ error: 'Already have' });
                    }
                }
                return res.status(200).json({results, message: 'Insert applitcant to student info successfully' });
            });

            // return res.status(200).json({results, message: 'Insert applitcant to student info successfully' });
        });
    });

    router.post('/get-applicant-detail-info', (req, res) => {
        const {applicant} = req.body
        const sql = `
            SELECT
                Enroll_ID, applicant.Student_NID, Enroll_No, applicant.NameTitle, applicant.FirstName, applicant.LastName, 
                Student_DOB, House_No, Moo, Soi, Road, Province, District, Sub_District, Sub_District, Transcript_type, Transcript_file, 
                BirthCert_file, HouseReg_file, Enroll_No, parent.FirstName AS pFirstName, parent.LastName AS pLastName, 
                DateOfBirth, Nationality, Office, Occupation, Role, Tel, Email, applicant_parentemail.first_ParentEmail,
                applicant_parentemail.second_ParentEmail, applicant_parentemail.third_ParentEmail
            FROM
                enrollment
            JOIN
                applicant
            ON
                applicant.Student_NID = enrollment.Student_NID
            JOIN
                applicant_parentemail
            ON
                applicant_parentemail.Student_NID = applicant.Student_NID
            JOIN
                parent
            ON
                parent.Email = applicant_parentemail.first_ParentEmail
            OR
                parent.Email = applicant_parentemail.second_ParentEmail
            OR
                parent.Email = applicant_parentemail.third_ParentEmail
            WHERE
                Enroll_No = ?
        `;
        connection.query(sql, [applicant], (err, results) => {
            if (err) {
                console.error('Error querying get applitcant info:', err);
                return res.status(500).json({ error: 'Failed to retrieve applitcant info' });
            }

            if (results.length === 0) {
                return res.status(200).json({ message: 'Info not found' });
            }

            return res.status(200).json({results, message: 'Retrieve applitcant info successfully' });
        });
    });
    
    return router;
}