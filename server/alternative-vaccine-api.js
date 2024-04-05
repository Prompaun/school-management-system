var express = require('express')
const router = express.Router();

module.exports = function(connection) {

    router.get('/get-injection-alternative-vaccine-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        const sql = `
            SELECT Alternative_Vaccine_ID, Vaccine_name
            FROM injection_alternative_vaccine
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching injection alternative vaccine information:', err);
                return res.status(500).json({ error: 'Failed to fetch injection alternative vaccine information' });
            }
            return res.status(200).json(results);
        });
    });

    // router.get('/get-alternative-vaccine-info/:studentId', (req, res) => {
    router.get('/get-alternative-vaccine-info', (req, res) => {
        // let studentId;
        // if (req.query.studentId) {
        //     studentId = req.query.studentId;
        // } else if (req.params.studentId) {
        //     studentId = req.params.studentId;
        // } else {
        //     return res.status(400).json({ error: 'Student ID is required' });
        // }
        const { studentId } = req.query;
        
        const sql = `
            SELECT Vaccine_name, Vaccinated_Date, Side_Effects, Note
            FROM Injection_Alternative_vaccine
            WHERE Student_ID = ?
        `;
        
        connection.query(sql, [studentId], (err, results) => {
            if (err) {
            console.error('Error querying alternative vaccine information:', err);
            return res.status(500).json({ error: 'Failed to retrieve alternative vaccine information' });
            }
        
            return res.status(200).json(results);
        });
        });
    
    // Update alternative vaccine information
    router.put('/update-injection-alternative-vaccine/:id', (req, res) => {
        const id = req.params.id;
        const { Student_ID, Vaccine_name, Vaccinated_Date, Side_Effects, Note } = req.body;
        const sql = `
            UPDATE Injection_Alternative_vaccine
            SET Student_ID = ?, Vaccine_name = ?, Vaccinated_Date = ?, Side_Effects = ?, Note = ?
            WHERE Alternative_Vaccine_ID = ?
        `;
        const values = [Student_ID, Vaccine_name, Vaccinated_Date, Side_Effects, Note, id];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating injection alternative vaccine information:', err);
                return res.status(500).json({ error: 'Failed to update injection alternative vaccine information' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Injection alternative vaccine information updated successfully' });
        });
    });

    // Delete alternative vaccine information
    router.delete('/delete-injection-alternative-vaccine/:id', (req, res) => {
        const id = req.params.id;
        const sql = `
            DELETE FROM Injection_Alternative_vaccine
            WHERE Alternative_Vaccine_ID = ?
        `;

        connection.query(sql, id, (err, result) => {
            if (err) {
                console.error('Error deleting injection alternative vaccine information:', err);
                return res.status(500).json({ error: 'Failed to delete injection alternative vaccine information' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Injection alternative vaccine information deleted successfully' });
        });
    });

    router.post('/add-injection-alternative-vaccine', (req, res) => {
        const { Student_ID, Vaccine_name, Vaccinated_Date, Side_Effects, Note } = req.body;
        const sql = `
            INSERT INTO injection_alternative_vaccine (Student_ID, Vaccine_name, Vaccinated_Date, Side_Effects, Note)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [Student_ID, Vaccine_name, Vaccinated_Date, Side_Effects, Note];
    
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding injection alternative vaccine information:', err);
                return res.status(500).json({ error: 'Failed to add injection alternative vaccine information' });
            }
            return res.status(201).json({ message: 'Injection alternative vaccine information added successfully' });
        });
    });
    
    
    

    return router;
}
