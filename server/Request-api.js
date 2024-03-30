var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-all-requests', (req, res) => {
        const sql = `
            SELECT Request_No, Request_Date, Request_type, Request_detail, Request_status
            FROM Request
        `;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching requests:', err);
                return res.status(500).json({ error: 'Failed to fetch requests' });
            }
            return res.status(200).json(results);
        });
    });

    router.get('/get-requests/:status', (req, res) => {
        const status = req.params.status;
    
        const sql = `
            SELECT Request_No, Request_Date, Request_type, Request_detail, Request_status
            FROM Request
            WHERE Request_status = ?
        `;
    
        connection.query(sql, status, (err, results) => {
            if (err) {
                console.error('Error fetching all requests:', err);
                return res.status(500).json({ error: 'Failed to fetch all requests' });
            }
            return res.status(200).json(results);
        });
    });
    
    router.put('/update-request/:id', (req, res) => {
        const requestId = req.params.id;
        const { Request_status } = req.body;
    
        const sql = `
            UPDATE Request
            SET Request_status = ?
            WHERE Request_No = ?
        `;
    
        const values = [Request_status, requestId];
    
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error updating request:', err);
                return res.status(500).json({ error: 'Failed to update request' });
            }
            return res.status(200).json({ message: 'Request updated successfully' });
        });
    });
    
    
    
    return router;
}
