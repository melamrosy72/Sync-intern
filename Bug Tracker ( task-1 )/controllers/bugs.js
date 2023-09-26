const {client} = require('../config/db')
const axios = require('axios');


// @desc    Get list of all bugs
// @route   GET /bugs
// @access  Public
exports.allBugs = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM bugs')
        res.status(200).json({ message: 'success', data: result.rows })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });

    }
}

// @desc    create new bug
// @route   POST /bugs
// @access  Public
exports.newBug = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        // Ensure you use placeholders for the values and pass them as an array
        const insertQuery = {
            text: 'INSERT INTO bugs(title, description, priority) VALUES($1, $2, $3) RETURNING *',
            values: [title, description, priority],
        };

        const newBug = await client.query(insertQuery);

        // res.status(201).json({ message: 'success', data: newBug.rows[0] });
        res.status(201).redirect('/bugs/all')

    } catch (error) {
        console.error('Error creating a new bug:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// @desc    Get  specific bug by id   
// @route   GET /bugs/:bugId
// @access  Public
exports.getBug = async (req, res) => {
    const { bugId } = req.params;

    try {
        const queryText = 'SELECT * FROM bugs WHERE id = $1';
        const result = await client.query(queryText, [bugId]);

        if (result.rows.length === 0) return res.status(404).json({ message: 'Bug not found' });

        res.status(200).json({ message: 'success', data: result.rows[0] });
    } catch (error) {
        console.error('Error fetching bug:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


// @desc    Edit specific bug by id
// @route   PATCh /bugs/:bugId
// @access  Public
exports.updatebug = async (req, res) => {
    const { bugId } = req.params;
    const { title, description, priority, fixed, responsible} = req.body;
    const updatedProperties = {};

    if (title !== undefined) updatedProperties.title = title;
    if (description !== undefined) updatedProperties.description = description;
    if (priority !== undefined) updatedProperties.priority = priority;
    if (fixed !== undefined) updatedProperties.fixed = fixed;
    if (responsible !== undefined) updatedProperties.responsible = responsible


    try {
        // Check if the bug with the given ID exists
        const query = 'SELECT * FROM bugs WHERE id = $1';
        const result = await client.query(query, [bugId]);

        if (result.rows.length === 0) return res.status(404).json({ message: 'Bug not found' });

        // const updateQuery = 'UPDATE bugs SET title = $2, description = $3, priority = $4, fixed = $5 WHERE id = $1';
        const updateQuery = {
            text: 'UPDATE bugs SET ' + Object.keys(updatedProperties).map((key, index) => {
                return `${key} = $${index + 2}`;
            }).join(', ') + ' WHERE id = $1',
            values: [bugId, ...Object.values(updatedProperties)],
        };
        await client.query(updateQuery);
        res.status(200).json({ message: 'Bug updated successfully' });

    } catch (error) {
        console.error('Error updating bug:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// @desc    Delete specific bug by id
// @route   DELETE /bugs/:bugId
// @access  Public
exports.deleteBug = async (req, res) => {
    const { bugId } = req.params;

    try {
        // Check if the bug with the given ID exists
        const query = 'SELECT * FROM bugs WHERE id = $1';
        const result = await client.query(query, [bugId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Bug not found' });
        }

        // Delete the bug by bugId
        const deleteQuery = 'DELETE FROM bugs WHERE id = $1';
        await client.query(deleteQuery, [bugId]);

        res.status(204).json({ message: 'deleted successfully' }); // No content after successful deletion
    } catch (error) {
        console.error('Error deleting bug:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// @desc    Assign specific bug by id to user
// @route   PATCh /bugs/:bugId
// @access  Public
exports.assignUserToBug = async (req, res) => {
    const { bugId } = req.params;
    const { userId } = req.body;

    try {
        // Check if the bug with the given ID exists
        const queryBug = 'SELECT * FROM bugs WHERE bug_id = $1';
        const resultBug = await client.query(queryBug, [bugId]);

        if (resultBug.rows.length === 0) {
            return res.status(404).json({ message: 'Bug not found' });
        }

        // Check if the user with the given ID exists
        const queryUser = 'SELECT * FROM users WHERE user_id = $1';
        const resultUser = await client.query(queryUser, [userId]);

        if (resultUser.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the bug to assign the user
        const updateQuery = 'UPDATE bugs SET responsible_user_id = $1 WHERE bug_id = $2';
        await client.query(updateQuery, [userId, bugId]);

        res.status(200).json({ message: 'User assigned to the bug successfully' });

    } catch (error) {
        console.error('Error assigning user to bug:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// for bugs view
exports.bugsview=async(req,res)=>{
    try {
        const response = await axios.get('http://localhost:4000/bugs');
        const bugs = response.data.data;
        res.render('bugs', { bugs });
    } catch (error) {
        console.error('Error fetching bug data:', error);
        res.status(500).send('Error fetching bugs data');
    }
}

exports.bugFormView=(req,res)=>{
    try {
        res.render('newBug');
    } catch (error) {
        console.error('Error fetching bug data:', error);
        res.status(500).send('Error while creating new bug');
    }
}