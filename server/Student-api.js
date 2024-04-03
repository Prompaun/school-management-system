
var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.post('/check-login-student', (req, res) => {
        const { studentId, password } = req.body;
    
        const sql = `
            SELECT EXISTS(
                SELECT 1
                FROM Student
                WHERE Student_ID = ? AND Password = ?
            ) AS exist
        `;
    
        connection.query(sql, [studentId, password], (err, results) => {
            if (err) {
                console.error('Error checking login:', err);
                return res.status(500).json({ error: 'Failed to check login' });
            }
            
            const exist = results[0].exist === 1 ? true : false;
            return res.status(200).json({ exist });
        });
    });
    
    
    
    return router;
}
