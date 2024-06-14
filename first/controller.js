
const { v4: uuidv4 } = require('uuid');

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'huynd',
    host: 'dpg-cpjvnfi1hbls738ap57g-a',
    database: 'my_db_4ljj',
    password: 'oM8SH1VwwsthnUXNNuqJMPk7WQIp8OYL',
    dialect: 'postgres',
    port: 5432,
    connectionTimeoutMillis: 30000
});

//USER REGISTRATION CONTROLLER
module.exports.user_register = async (req, res) => {
    try {
        //1. destructure the values from req.body
        let { username, password, name, email } = req.body;

        //2. Get the user from the users database
        const usersTable = await pool.query('Select * from public."user"');

        //3. check if user already exists and return an error else register the user
        for (i = 0; i < usersTable.rows.length; i++) {
            if (usersTable.rows[i].username === username) {
                res.status(409).json({
                    error: "Sorry! An account with that username already exists!",
                });
                return;
            }
            if (usersTable.rows[i].email === email) {
                res.status(409).json({
                    error: "Sorry! An account with that email already exists!",
                });
                return;
            }
            if (usersTable.rows[i].name === name) {
                res.status(409).json({
                    error: "Sorry! An account with that name already exists!",
                });
                return;
            }
        }

        //encrypt the password before writing/saving it in the database
        // bcrypt.hash(password, 10, async (err, hashedPassword) => {
        //     //check if an error occurs while encrypting and return an error else  return the hashedPassword and write/save it in the database
        //     if (err) {
        //         res.status(500).json({
        //             error: err.message,
        //         });
        //     } else {
        //         //convert the firstname and lastname to be capitalized i.e  (first letter capital and the rest small letters)
        //         firstname = firstname[0].toUpperCase() + firstname.slice(1);
        //         lastname = lastname[0].toUpperCase() + lastname.slice(1);

        //         const newUser = await pool.query(
        //             "INSERT INTO users (firstname, lastname, email, phone, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
        //             [firstname, lastname, email, phone, hashedPassword]
        //         );

        //         //generate a token
        //         const token = jwtGenerator(newUser.rows[0].user_id);

        //         res.status(200).json({
        //             message: `Account created successfully!`,
        //             token,
        //         });
        //     }
        // });

        // create new user_row
        uuid = uuidv4();
        const newUser = await pool.query(
            'INSERT INTO public."user" (username, password, user_id, name, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, password, uuid, name, email]
        );
        res.status(200).json({
            message: "Account created successfully!",
            user_id: newUser.rows[0].user_id
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
        });
    }
};

//USER LOGIN CONTROLLER

module.exports.user_login = async (req, res) => {
    try {
        //1. destructure the user details
        const { username, password } = req.body;

        //1. Get the user from the database
        const usersTable = await pool.query('Select * from public."user"');

        //2. check if user does not exist and return an error else login the user
        if (usersTable.rows.length === 0) {
            res.status(404).json({
                error: "No account registered yet! Please register an account!",
            });
        } else {
            for (i = 0; i < usersTable.rows.length; i++) {
                if (usersTable.rows[i].username === username && usersTable.rows[i].password === password) {
                    res.status(200).json({
                        message: "Login successfully!",
                        user_id: usersTable.rows[i].user_id
                    });
                    return;
                }
            }
            res.status(401).json({
                error: "Username or password is incorrect",
            });
            //check if the password entered matches the one in the database
            // bcrypt.compare(password, usersTable.rows[0].password, (err, validPassword) => {
            //     if (err) {
            //         res.status(401).json({
            //             error: "Sorry! Email or password is incorrect",
            //         });
            //     } else if (validPassword) {
            //         //generate a token
            //         const token = jwtGenerator(usersTable.rows[0].user_id);

            //         res.json({
            //             message: "Login successfully!",
            //             token,
            //         });
            //     } else {
            //         res.status(401).json({
            //             error: "Sorry! Email or password is incorrect",
            //         });
            //     }
            // });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: err.message,
        });
    }
};