var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-allergies-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
    // router.get('/get-Allergies-info', (req, res) => {
    //     const { studentId } = req.query;
        const sql = `
            SELECT id, Date, Allergies
            FROM allergies
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching allergies information:', err);
                return res.status(500).json({ error: 'Failed to fetch allergies information' });
            }
            return res.status(200).json(results);
        });
    });

    // POST API เพื่อเพิ่มข้อมูลในตาราง Allergies
    router.post('/add-allergies-info', (req, res) => {
        const { Student_ID, Date, Allergies } = req.body;
        const sql = `
            INSERT INTO Allergies (Student_ID, Date, Allergies)
            VALUES (?, ?, ?)
        `;
        const values = [Student_ID, Date, Allergies];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding allergies information:', err);
                return res.status(500).json({ error: 'Failed to add allergies information' });
            }
            return res.status(201).json({ message: 'Allergies information added successfully' });
        });
    });

    // DELETE API เพื่อลบข้อมูลในตาราง Allergies โดยใช้ ID
    router.delete('/delete-allergies/:id', (req, res) => {
        const id = req.params.id;
        const sql = `
            DELETE FROM Allergies
            WHERE id = ?
        `;

        connection.query(sql, id, (err, result) => {
            if (err) {
                console.error('Error deleting allergies information:', err);
                return res.status(500).json({ error: 'Failed to delete allergies information' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Allergies information deleted successfully' });
        });
    });
    return router;
}
