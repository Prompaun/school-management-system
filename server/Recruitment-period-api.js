var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-recruitment-period', (req, res) => {
        const sql = `
            SELECT id, course, start_date, end_date
            FROM recruitment_period
        `;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error querying get recruitment-period:', err);
                return res.status(500).json({ error: 'Failed to retrieve recruitment-period' });
            }
            // res.status(200).json(results);
            return res.status(200).json(results);
        });
    });

    router.put('/update-recruitment-period/:id', (req, res) => {
        const id = req.params.id;
        const { course, start_date, start_time, end_date, end_time } = req.body;
    
        const sql = `
            UPDATE recruitment_period
            SET course = ?, start_date = ?, start_time = ?, end_date = ?, end_time = ?
            WHERE id = ?
        `;
        const values = [course, start_date, start_time, end_date, end_time, id];
    
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating recruitment period:', err);
                return res.status(500).json({ error: 'Failed to update recruitment period' });
            }
            console.log('Updated recruitment period:', result.affectedRows);
            return res.status(200).json({ message: 'Recruitment period updated successfully' });
        });
    });
    
    
    
    return router;
}
