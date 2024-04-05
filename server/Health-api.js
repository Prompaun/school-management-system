var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    // router.get('/get-growth-nutrition-info', (req, res) => {
    //     const { studentId, year, semester } = req.query;
    
    //     const sql = `
    //         SELECT Health_Check_Date, Student_Age, Height, Weight
    //         FROM Growth_Nutrition
    //         WHERE Student_ID = ? AND Year = ? AND Semester = ?
    //     `;
    
    //     connection.query(sql, [studentId, year, semester], (err, results) => {
    //         if (err) {
    //             console.error('Error querying growth nutrition information:', err);
    //             return res.status(500).json({ error: 'Failed to retrieve growth nutrition information' });
    //         }
    
    //         return res.status(200).json(results);
    //     });
    // });
    
    router.get('/get-health-check-info', (req, res) => {
        const { studentId } = req.query;
    
        const sql = `
            SELECT Date, EyeExamination, Hearing, OralHealth
            FROM Health_Check
            WHERE Student_ID = ?
        `;
    
        connection.query(sql, [studentId], (err, results) => {
            if (err) {
                console.error('Error querying health check information:', err);
                return res.status(500).json({ error: 'Failed to retrieve health check information' });
            }
    
            return res.status(200).json(results);
        });
    });
    
    // router.get('/get-congenital-disease-info', (req, res) => {
    //     const { studentId } = req.query;
        
    //     // สร้างคำสั่ง SQL สำหรับดึงข้อมูล
    //     const sql = `
    //         SELECT Date, Congenital_Disease
    //         FROM congenital_disease
    //         WHERE Student_ID = ?
    //     `;
        
    //     // ดำเนินการค้นหาในฐานข้อมูล
    //     connection.query(sql, [studentId], (err, results) => {
    //         if (err) {
    //                 // กรณีเกิดข้อผิดพลาดในการค้นหา
    //                 console.error('Error querying congenital disease information:', err);
    //                 return res.status(500).json({ error: 'Failed to retrieve congenital disease information' });
    //             }
        
    //             // ส่งข้อมูลที่ค้นพบกลับไปให้กับผู้ใช้
    //             return res.status(200).json(results);
    //         });
    //     });
    
    // router.get('/get-History-disease-info', (req, res) => {
    //     const { studentId } = req.query;
    
    //     // สร้างคำสั่ง SQL สำหรับดึงข้อมูล
    //     const sql = `
    //         SELECT Date, History_Disease
    //         FROM History_Disease
    //         WHERE Student_ID = ?
    //     `;
    
    //     // ดำเนินการค้นหาในฐานข้อมูล
    //     connection.query(sql, [studentId], (err, results) => {
    //         if (err) {
    //                 // กรณีเกิดข้อผิดพลาดในการค้นหา
    //                 console.error('Error querying History disease information:', err);
    //                 return res.status(500).json({ error: 'Failed to retrieve History disease information' });
    //             }
    
    //             // ส่งข้อมูลที่ค้นพบกลับไปให้กับผู้ใช้
    //             return res.status(200).json(results);
    //         });
    //     });
        
    router.get('/get-Allergies-info', (req, res) => {
        const { studentId } = req.query;
    
        // สร้างคำสั่ง SQL สำหรับดึงข้อมูล
        const sql = `
            SELECT Date, Allergies
            FROM Allergies
            WHERE Student_ID = ?
        `;
    
        // ดำเนินการค้นหาในฐานข้อมูล
        connection.query(sql, [studentId], (err, results) => {
            if (err) {
                    // กรณีเกิดข้อผิดพลาดในการค้นหา
                    console.error('Error querying Allergies information:', err);
                    return res.status(500).json({ error: 'Failed to retrieve Allergies information' });
                }
    
                // ส่งข้อมูลที่ค้นพบกลับไปให้กับผู้ใช้
                return res.status(200).json(results);
            });
        });











    router.get('/get-health-info', (req, res) => {
        const { studentId, year } = req.query;
    
        const sql = `
            SELECT Overall_Results, Growth_Nutrition, Summary_Health
            FROM Health_Overview
            WHERE Student_ID = ? AND Year = ?
            ORDER BY Year DESC
            LIMIT 1
        `;
    
        connection.query(sql, [studentId, year], (err, results) => {
            if (err) {
                console.error('Error querying health information:', err);
                return res.status(500).json({ error: 'Failed to retrieve health information' });
            }
    
            if (results.length === 0) {
                return res.status(404).json({ error: 'Health information not found' });
            }
    
            const healthInfo = results[0];
            return res.status(200).json(healthInfo);
        });
    });
    
    router.get('/get-growth-nutrition-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        const sql = `
            SELECT id, Year, Health_Check_Date, Height, Weight
            FROM growth_nutrition
            WHERE Student_ID = ?
            ORDER BY Year DESC
            LIMIT 1
        `;
    
        connection.query(sql, studentId, (err, results) => {
            if (err) {
                console.error('Error fetching growth_nutrition information:', err);
                return res.status(500).json({ error: 'Failed to fetch growth_nutrition information' });
            }
            return res.status(200).json(results);
        });
    });

    // POST route to insert data into Growth_Nutrition table
    router.post('/add-growth-nutrition', (req, res) => {
        const { Student_ID, Year, Health_Check_Date, Height, Weight } = req.body;
        const sql = `
            INSERT INTO Growth_Nutrition (Student_ID, Year, Health_Check_Date, Height, Weight)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [Student_ID, Year, Health_Check_Date, Height, Weight];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting growth_nutrition data:', err);
                return res.status(500).json({ error: 'Failed to insert growth_nutrition data' });
            }
            return res.status(200).json({ message: 'Data inserted successfully', id: result.insertId });
        });
    });

    // UPDATE route to update data in Growth_Nutrition table
    router.put('/update-growth-nutrition/:id', (req, res) => {
        const { Year, Health_Check_Date, Height, Weight } = req.body;
        const id = req.params.id;
        const sql = `
            UPDATE Growth_Nutrition
            SET Year = ?, Health_Check_Date = ?, Height = ?, Weight = ?
            WHERE id = ?
        `;
        const values = [Year, Health_Check_Date, Height, Weight, id];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating growth_nutrition data:', err);
                return res.status(500).json({ error: 'Failed to update growth_nutrition data' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Data updated successfully' });
        });
    });

    router.get('/get-history-disease-info/:studentId', (req, res) => {
        const studentId = req.params.studentId;
    // router.get('/get-History-disease-info', (req, res) => {
    //     const { studentId } = req.query;
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

    router.get('/get-health_check/:studentId', (req, res) => {
        const studentId = req.params.studentId;
        const sql = `
            SELECT id, Date, EyeExamination, Hearing, OralHealth
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

    router.post('/add-health-check', async (req, res) => {
        const { Student_ID, Date, EyeExamination, Hearing, OralHealth } = req.body;
        const sql = `
            INSERT INTO Health_Check (Student_ID, Date, EyeExamination, Hearing, OralHealth)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [Student_ID, Date, EyeExamination, Hearing, OralHealth];
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.log('Error inserting growth_nutrition data:', err);
                return res.status(500).json({ error: 'Failed to insert growth_nutrition data' });
            }
            else{
                console.log('Health check data added successfully');
            }
            return res.status(200).json({ message: 'Data inserted successfully', id: result.insertId });
        });
    });

    router.put('/update-health-check/:id', (req, res) => {
        const { Date, EyeExamination, Hearing, OralHealth } = req.body;
        const id = req.params.id;
        const sql = `
            UPDATE Health_Check
            SET Date = ?, EyeExamination = ?, Hearing = ?, OralHealth = ?
            WHERE id = ?
        `;
        const values = [Date, EyeExamination, Hearing, OralHealth, id];
    
        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error updating health check data:', err);
                return res.status(500).json({ error: 'Failed to update health check data' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Health check data updated successfully' });
        });
    });
    
    return router;
}
