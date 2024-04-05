var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-Surgery_accident-info', (req, res) => {
        const { studentId } = req.query;
    
        // สร้างคำสั่ง SQL สำหรับดึงข้อมูล
        const sql = `
            SELECT Date, Surgery_accident
            FROM Surgery_accident
            WHERE Student_ID = ?
        `;
    
        // ดำเนินการค้นหาในฐานข้อมูล
        connection.query(sql, [studentId], (err, results) => {
            if (err) {
                    // กรณีเกิดข้อผิดพลาดในการค้นหา
                    console.error('Error querying Surgery_accident information:', err);
                    return res.status(500).json({ error: 'Failed to retrieve Surgery_accident information' });
                }
    
                // ส่งข้อมูลที่ค้นพบกลับไปให้กับผู้ใช้
                return res.status(200).json(results);
            });
        });
    
    // POST API เพื่อเพิ่มข้อมูลในตาราง Surgery_accident
    router.post('/add-surgery-accident-info', (req, res) => {
        const { Student_ID, Date, Surgery_Accident } = req.body;
        const sql = `
            INSERT INTO Surgery_accident (Student_ID, Date, Surgery_Accident)
            VALUES (?, ?, ?)
        `;
        const values = [Student_ID, Date, Surgery_Accident];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error adding surgery/accident information:', err);
                return res.status(500).json({ error: 'Failed to add surgery/accident information' });
            }
            return res.status(201).json({ message: 'Surgery/accident information added successfully' });
        });
    });

    // DELETE API เพื่อลบข้อมูลในตาราง Surgery_accident โดยใช้ ID
    router.delete('/delete-surgery-accident/:id', (req, res) => {
        const id = req.params.id;
        const sql = `
            DELETE FROM Surgery_accident
            WHERE id = ?
        `;

        connection.query(sql, id, (err, result) => {
            if (err) {
                console.error('Error deleting surgery/accident information:', err);
                return res.status(500).json({ error: 'Failed to delete surgery/accident information' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }
            return res.status(200).json({ message: 'Surgery/accident information deleted successfully' });
        });
    });
    return router;
}
