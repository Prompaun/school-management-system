var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    // router.get('/get-role/:email', (req, res) => {
    //     const email = req.params.email;
    //     // console.log('yoke yoke',email);
    //     const sql = `
    //         SELECT Email, Role
    //         FROM personnel
    //         WHERE Email = ?
    //     `;
    
    //     connection.query(sql, email, (err, results) => {
    //         if (err) {
    //             console.error('Error fetching role:', err);
    //             return res.status(500).json({ error: 'Failed to fetch role', email });
    //         }
    //         if (results.length === 0) {
    //             return res.status(404).json({ error: 'Email not found' });
    //         }
    //         const role = results[0].Role;
    //         return res.status(200).json({ role });
    //     });
    // });

    router.get('/get-role/:email', (req, res) => {
        const email = req.params.email;
    
        // ค้นหาในตาราง personnel ก่อน
        const sqlPersonnel = `
            SELECT Email, Role
            FROM personnel
            WHERE Email = ?
        `;
    
        connection.query(sqlPersonnel, email, (err, personnelResults) => {
            if (err) {
                console.error('Error fetching role from personnel:', err);
                return res.status(500).json({ error: 'Failed to fetch role', email });
            }
    
            // หากไม่พบในตาราง personnel
            if (personnelResults.length === 0) {
                // ค้นหาในตาราง student_parentemail
                const sqlStudentParentEmail = `
                    SELECT Student_ID
                    FROM Student_ParentEmail
                    WHERE first_ParentEmail = ? OR second_ParentEmail = ? OR third_ParentEmail = ?
                `;
    
                connection.query(sqlStudentParentEmail, [email, email, email], (err, studentParentEmailResults) => {
                    if (err) {
                        console.error('Error fetching role from student_parentemail:', err);
                        return res.status(200).json({ error: 'Failed to fetch role', email });
                    }
    
                    // หากพบในตาราง student_parentemail
                    if (studentParentEmailResults.length > 0) {
                        return res.status(200).json({ role: 'Parent' });
                    } else {
                        // หากไม่พบในทั้งสองตาราง
                        return res.status(200).json({ role: 'NewParent' });
                    }
                });
            } else {
                // หากพบในตาราง personnel
                const role = personnelResults[0].Role;
                return res.status(200).json({ role });
            }
        });
    });
    
    
    
    return router;
}
