var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/add-student-id-get-student-info', (req, res) => {
        const sql = `
            SELECT
                id, NameTitle, FirstName, LastName, course, Student_ID
            FROM
                student
            WHERE
				enroll_year = ?
        `;
    
        connection.query(sql, [new Date().getFullYear()+543], (err, results) => {
            if (err) {
                console.error('Error fetching student info id:', err);
                return res.status(500).json({ error: 'Failed to fetch student info id', email });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Student info id not found' });
            }
            return res.status(200).json(results);
        });
    });
    
    // router.post('/add-student-id-update-student-info', (req, res) => {
    //     const {student_id, id} = req.body
    //     const sql = `
    //         UPDATE 
    //             student
    //         SET
    //             Student_ID = ?
    //         WHERE
    //             id = ?
    //     `;
    
    //     connection.query(sql, [student_id, id], (err, results) => {
    //         if (err) {
    //             console.error('Error updating student info id:', err);
    //             return res.status(500).json({ error: 'Failed to update student info id', email });
    //         }
    //         return res.status(200).json(results);
    //     });
    // });

    router.post('/add-student-id-update-student-info', (req, res) => {
        const {student_id, id} = req.body
        const sql = `
            UPDATE 
                student
            SET
                Student_ID = ?
            WHERE
                id = ?
        `;
    
        connection.query(sql, [student_id, id], (err, results) => {
            if (err) {
                console.error('Error updating student info id:', err);
                return res.status(500).json({ error: 'Failed to update student info id', email });
            }
            const sql = `
                UPDATE
                    student_parentemail
                SET
                    Student_ID = ?
                WHERE
                    Student_NID = (SELECT Student_NID FROM student WHERE id = ?)
            `;
        
            connection.query(sql, [student_id, id], (err, results) => {
                if (err) {
                    console.error('Error updating student id to parentEmail:', err);
                    return res.status(500).json({ error: 'Failed to update student id to parentEmail', email });
                }
                return res.status(200).json(results);
            });

            // return res.status(200).json(results);
        });
    });
    
    return router;
}