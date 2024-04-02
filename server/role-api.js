var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-role/:email', (req, res) => {
        const email = req.params.email;
        console.log('yoke yoke',email);
        const sql = `
            SELECT Email, Role
            FROM personnel
            WHERE Email = ?
        `;
    
        connection.query(sql, email, (err, results) => {
            if (err) {
                console.error('Error fetching role:', err);
                return res.status(500).json({ error: 'Failed to fetch role' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Email not found' });
            }
            const role = results[0].Role;
            return res.status(200).json({ role });
        });
    });
    
    
    
    return router;
}
