const {client} = require('../config/db')
const bcrypt = require('bcrypt')


// @desc    create new User
// @route   POST /auth/signup
// @access  Public
exports.newUser = async (req, res) => {
    try {
        const { username, password, password_confirm  } = req.body;

        if (password !== password_confirm) return res.status(400).json({ message: 'password not match' })

        const hashedPassword = await bcrypt.hash(password, 10)
        // Ensure you use placeholders for the values and pass them as an array
        const insertQuery = {
            text: 'INSERT INTO users(username, password ) VALUES($1, $2) RETURNING *',
            values: [username, hashedPassword],
        };

        const newUser = await client.query(insertQuery);

        // res.status(201).json({ message: 'success', data: newUser.rows[0] });
        res.status(201).redirect('/auth/login');

    } catch (error) {
        console.error('Error creating a new bug:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// @desc    Login user
// @route   POST /auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Retrieve the user with the given username from the database
        const userQuery = {
            text: 'SELECT * FROM users WHERE username = $1',
            values: [username],
        };

        const { rows } = await client.query(userQuery);

        if (rows.length === 0) return res.status(401).json({ message: 'Wrong username or password ' });

        const user = rows[0];

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.status(401).json({ message: 'Wrong Password' });

        // res.status(200).json({ message: 'success', username: user.username });
        res.status(200).redirect('/bugs/all');


    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Login for view
exports.loginView=(req,res)=>{
    res.render('login')
}

// Signup for view  
exports.signupView=(req, res) => {
    res.render('signup')
}