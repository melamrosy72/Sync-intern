const {client} = require('../config/db')
const axios = require('axios');

// @desc    Get list of all bugs
// @route   GET /users
// @access  Public
exports.allUsers = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users')
        res.status(200).json({ message: 'success', data: result.rows })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while Fetching users' });

    }
}

// @desc    Edit user position
// @route   Patch /users/:userId
// @access  Public
exports.editPosition = async (req, res) => {
    const { userId } = req.params;
    const { newPosition } = req.body; // Assuming the new position is sent in the request body

    try {
        // Check if the user with the given ID exists
        const userQuery = 'SELECT * FROM users WHERE id = $1';
        const userResult = await client.query(userQuery, [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's position
        const updateQuery = 'UPDATE users SET position = $1 WHERE id = $2';
        await client.query(updateQuery, [newPosition, userId]);

        res.status(200).json({ message: 'User position has been updated' });

    } catch (error) {
        console.error('Error updating user position:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Delete user
// @route   Delete /users/:userId
// @access  Public
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await client.query('DELETE FROM users WHERE id = $1', [userId]);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
}


// for client view
exports.usersView=async(req,res)=>{
    try {
        const response = await axios.get('http://localhost:4000/users');
        const users = response.data.data;
        res.render('users', { users });
    } catch (error) {
        console.error('Error fetching bug data:', error);
        res.status(500).send('Error fethching users data');
    }
}