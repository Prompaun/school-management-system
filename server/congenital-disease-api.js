var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-congenital-disease-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
    // router.get('/get-congenital-disease-info', (req, res) => {
    //     const { studentId } = req.query;
        const sql = `
            SELECT id, Date, Congenital_Disease
            FROM congenital_disease
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching congenital disease information:', err);
                return res.status(500).json({ error: 'Failed to fetch congenital disease information' });
            }
            return res.status(200).json(results);
        });
    });
    
    router.post('/add-congenital-disease-info', (req, res) => {
        const { Student_ID, Date, Congenital_Disease } = req.body;
        const sql = `
            INSERT INTO congenital_disease (Student_ID, Date, Congenital_Disease)
            VALUES (?, ?, ?)
        `;
        const values = [Student_ID, Date, Congenital_Disease];
    
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding congenital disease information:', err);
                return res.status(500).json({ error: 'Failed to add congenital disease information' });
            }
            return res.status(201).json({ message: 'Congenital disease information added successfully' });
        });
    });
    
    router.delete('/delete-congenital-disease/:id', (req, res) => {
        const id = req.params.id;
        const sql = `
            DELETE FROM congenital_disease
            WHERE id = ?
        `;
    
        connection.query(sql, id, (err, result) => {
            if (err) {
                console.error('Error deleting congenital disease information:', err);
                return res.status(500).json({ error: 'Failed to delete congenital disease information' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Congenital disease information deleted successfully' });
        });
    });
    return router;
}
