var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/manageClass-get-student-info', (req, res) => {
        const sql = `
            SELECT
                Student_ID, NameTitle, FirstName, LastName
            FROM
                student
        `;
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching student info id:', err);
                return res.status(500).json({ error: 'Failed to fetch student info id', email });
            }

            const sql = `
                SELECT
                    Student_ID, Year, Level, Room
                FROM
                    classroom
                WHERE
	                Year = 2567
            `;
            connection.query(sql, (err, outcome) => {
                if (err) {
                    console.error('Error fetchinf class of student info id:', err);
                    return res.status(500).json({ error: 'Failed to fetch class of student info id', email });
                }
                return res.status(200).json({results, outcome});
            });
        });
    });

    router.post('/manageClass-update-student-info', (req, res) => {
        const {mode, level, room, student} = req.body
        let sql
        if (mode === 'update') {
            sql = `
                UPDATE
                    classroom
                set
                    Level = ?,
                    Room = ?
                WHERE
                    Student_ID = ?
                AND
                    Year = ?
            `;
        } else if (mode === 'insert') {
            sql = `
                INSERT INTO classroom 
                    (Level, Room, Student_ID, Year, Student_Course) 
                VALUES 
                    (?, ?, ?, ?, 
                        (SELECT
                            course
                        FROM
                            student
                        WHERE
                            Student_ID = ${student}));
            `;
        }
        
        connection.query(sql, [level, room, student, new Date().getFullYear()+543],(err, results) => {
            if (err) {
                console.error('Error fetching student info id:', err);
                return res.status(500).json({ error: 'Failed to fetch student info id', email });
            }
            return res.status(200).json(results);
        });
    });
    
    return router;
}