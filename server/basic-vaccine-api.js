var express = require('express')
const router = express.Router();

module.exports = function(connection) {

    // router.get('/check-vaccine/:studentId', (req, res) => {
    //     const studentId = req.params.studentId;
        
    //     // สร้างคำสั่ง SQL เพื่อดึงข้อมูลการฉีดวัคซีนของนักเรียนจากตาราง Injection_Basic_Vaccine
    //     const sql = `
    //                 SELECT bv.Basic_Vaccine_ID, bv.BasicVaccine_name, 
    //                 CASE WHEN ibv.Student_ID IS NULL THEN false ELSE true END AS value
    //         FROM Basic_Vaccine bv
    //         LEFT JOIN Injection_Basic_Vaccine ibv ON bv.Basic_Vaccine_ID = ibv.Basic_Vaccine_ID
    //                                                     AND ibv.Student_ID = ?
    //         ORDER BY value DESC;
    //     `;
    
    //     connection.query(sql, studentId, (err, results) => {
    //         if (err) {
    //             console.error('Error checking vaccines:', err);
    //             return res.status(500).json({ error: 'Failed to check vaccines' });
    //         }
    //         console.log(results);
    //         return res.status(200).json(results);
    //     });
    // });
    router.get('/check-vaccine/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        
        // สร้างคำสั่ง SQL เพื่อดึงข้อมูลการฉีดวัคซีนของนักเรียนจากตาราง Injection_Basic_Vaccine
        const sql = `
            SELECT ibv.Vaccine_ID, bv.Basic_Vaccine_ID, bv.BasicVaccine_name, 
                   CASE WHEN ibv.Student_ID IS NULL THEN false ELSE true END AS value
            FROM Basic_Vaccine bv
            LEFT JOIN Injection_Basic_Vaccine ibv ON bv.Basic_Vaccine_ID = ibv.Basic_Vaccine_ID
                                                        AND ibv.Student_ID = ?
            ORDER BY value DESC;
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error checking vaccines:', err);
                return res.status(500).json({ error: 'Failed to check vaccines' });
            }
            console.log(results);
            return res.status(200).json(results);
        });
    });
    

    router.get('/get-basic-vaccines', (req, res) => {
        const sql = `
            SELECT BasicVaccine_name
            FROM Basic_Vaccine
        `;
    
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error querying basic vaccine information:', err);
                return res.status(500).json({ error: 'Failed to retrieve basic vaccine information' });
            }
    
            const basicVaccines = results.map(result => result.BasicVaccine_name);
            return res.status(200).json(basicVaccines);
        });
    });
    
    router.get('/get-basic-injection-info', (req, res) => {
        const { studentId } = req.query;
    
        const sql = `
            SELECT ibv.Vaccinated_Date, ibv.Side_Effects, ibv.Note, bv.BasicVaccine_name
            FROM Injection_Basic_Vaccine AS ibv
            INNER JOIN Basic_Vaccine AS bv ON ibv.Basic_Vaccine_ID = bv.Basic_Vaccine_ID
            WHERE ibv.Student_ID = ?
        `;
    
        connection.query(sql, [studentId], (err, results) => {
            if (err) {
                console.error('Error querying injection information:', err);
                return res.status(500).json({ error: 'Failed to retrieve injection information' });
            }
    
            return res.status(200).json(results);
        });
    });

    router.post('/add-injection-basic-vaccine', (req, res) => {
        const { Basic_Vaccine_ID, Student_ID, Vaccinated_Date, Side_Effects, Note } = req.body;
        const sql = `
            INSERT INTO Injection_Basic_Vaccine (Basic_Vaccine_ID, Student_ID, Vaccinated_Date, Side_Effects, Note)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [Basic_Vaccine_ID, Student_ID, Vaccinated_Date, Side_Effects, Note];
    
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding injection basic vaccine information:', err);
                return res.status(500).json({ error: 'Failed to add injection basic vaccine information' });
            }
            return res.status(201).json({ message: 'Injection basic vaccine information added successfully' });
        });
    });

    
    router.delete('/delete-injection-basic-vaccine/:id', (req, res) => {
        const id = req.params.id;
        const sql = `
            DELETE FROM Injection_Basic_Vaccine
            WHERE Vaccine_ID = ?
        `;
    
        connection.query(sql, id, (err, result) => {
            if (err) {
                console.error('Error deleting injection basic vaccine information:', err);
                return res.status(500).json({ error: 'Failed to delete injection basic vaccine information' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Injection basic vaccine information deleted successfully' });
        });
    });
    
    

    return router;
}
