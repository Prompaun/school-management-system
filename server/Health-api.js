var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-congenital-disease-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
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
    
    router.get('/get-history-disease-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        const sql = `
            SELECT id, Date, History_Disease
            FROM History_disease
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching History Disease information:', err);
                return res.status(500).json({ error: 'Failed to fetch History Disease information' });
            }
            return res.status(200).json(results);
        });
    });

    router.get('/get-allergies-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
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

    router.get('/get-surgery-accident-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        const sql = `
            SELECT id, Date, Surgery_Accident
            FROM surgery_accident
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching surgery accident information:', err);
                return res.status(500).json({ error: 'Failed to fetch surgery accident information' });
            }
            return res.status(200).json(results);
        });
    });

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

    router.get('/get-growth-nutrition-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        const sql = `
            SELECT id, Health_Check_Date, Height, Weight
            FROM growth_nutrition
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching growth_nutrition information:', err);
                return res.status(500).json({ error: 'Failed to fetch growth_nutrition information' });
            }
            return res.status(200).json(results);
        });
    });

    router.get('/get-health_check/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        const sql = `
            SELECT id, Date, Eye_examination, Hearing, Oral_health
            FROM health_check
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching health_check information:', err);
                return res.status(500).json({ error: 'Failed to fetch health_check information' });
            }
            return res.status(200).json(results);
        });
    });

    router.get('/check-vaccine/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        
        // สร้างคำสั่ง SQL เพื่อดึงข้อมูลการฉีดวัคซีนของนักเรียนจากตาราง Injection_Basic_Vaccine
        const sql = `
                    SELECT bv.Basic_Vaccine_ID, bv.BasicVaccine_name, 
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
    
    
    return router;
}
