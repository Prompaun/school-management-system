var express = require('express')
const router = express.Router();

module.exports = function(connection) {
    router.get('/get-news', (req, res) => {
        const sql = `
            SELECT id, topic, content, link, date
            FROM Information_data
            ORDER BY date DESC
        `;
    
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error querying get news:', err);
                return res.status(500).json({ error: 'Failed to retrieve news' });
            }
            return res.status(200).json(results);
        });
    });
    

    router.get('/get-post-news', (req, res) => {
        const sql = `
            SELECT id, topic, content, link 
            FROM Information_data
        `;

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error querying get Information_data:', err);
                return res.status(500).json({ error: 'Failed to retrieve Information_data' });
            }
            // res.status(200).json(results);
            return res.status(200).json(results);
        });
    });

    router.post('/add-post-news', (req, res) => {
        const { topic, content, link, date } = req.body;
    
        // Validate incoming data
        // if (!topic || !content || !link) {
        //     return res.status(200).json({ error: 'Please provide all required fields' });
        // }
    
        const sql = `
            INSERT INTO Information_data (topic, content, link, date)
            VALUES (?, ?, ?, ?)
        `;
        const values = [topic, content, link, date];
    
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error inserting into Information_data:', err);
                return res.status(500).json({ error: 'Failed to add post news' });
            }
            return res.status(201).json({ message: 'Post news added successfully' });
        });
    });

    router.delete('/delete-post/:id', (req, res) => {
        const postId = req.params.id;
    
        const sql = `
            DELETE FROM Information_data
            WHERE id = ?
        `;
    
        connection.query(sql, postId, (err, results) => {
            if (err) {
                console.error('Error deleting post:', err);
                return res.status(500).json({ error: 'Failed to delete post' });
            }
            return res.status(200).json({ message: 'Post deleted successfully' });
        });
    });

    router.put('/update-post/:id', (req, res) => {
        const postId = req.params.id;
        const { topic, content, link, date } = req.body;
    
        const sql = `
            UPDATE Information_data
            SET topic = ?, content = ?, link = ?, date = ?
            WHERE id = ?
        `;
    
        const values = [topic, content, link, date, postId];
    
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error updating post:', err);
                return res.status(500).json({ error: 'Failed to update post' });
            }
            return res.status(200).json({ message: 'Post updated successfully' });
        });
    });
    
    
    
    return router;
}
