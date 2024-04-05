var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-history-disease-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
    // router.get('/get-history-disease-info', (req, res) => {
    //     const { studentId } = req.query;
        const sql = `
            SELECT id, Date, History_Disease
            FROM history_disease
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching history disease information:', err);
                return res.status(500).json({ error: 'Failed to fetch history disease information' });
            }
            return res.status(200).json(results);
        });
    });
    
    router.post('/add-history-disease-info', (req, res) => {
        const { Student_ID, Date, History_Disease } = req.body;
        const sql = `
            INSERT INTO history_disease (Student_ID, Date, History_Disease)
            VALUES (?, ?, ?)
        `;
        const values = [Student_ID, Date, History_Disease];
    
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding history disease information:', err);
                return res.status(500).json({ error: 'Failed to add history disease information' });
            }
            return res.status(201).json({ message: 'Congenital disease information added successfully' });
        });
    });
    
    router.delete('/delete-history-disease/:id', (req, res) => {
        const id = req.params.id;
        const sql = `
            DELETE FROM history_disease
            WHERE id = ?
        `;
    
        connection.query(sql, id, (err, result) => {
            if (err) {
                console.error('Error deleting history disease information:', err);
                return res.status(500).json({ error: 'Failed to delete history disease information' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Congenital disease information deleted successfully' });
        });
    });
    return router;
}
