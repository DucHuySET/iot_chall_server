// Entry Point of the API Server 

const express = require('express');
const controller = require('./first/controller');


/* Creates an Express application. 
The express() function is a top-level 
function exported by the express module.
*/
const app = express();
const bodyParser = require('body-parser');
const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'huynd',
	host: 'dpg-cpjvnfi1hbls738ap57g-a',
	database: 'my_db_4ljj',
	password: 'oM8SH1VwwsthnUXNNuqJMPk7WQIp8OYL',
	dialect: 'postgres',
	port: 5432,
	// Increase the connection timeout to 30 seconds
	connectionTimeoutMillis: 30000
});


/* To handle the HTTP Methods Body Parser 
is used, Generally used to extract the 
entire body portion of an incoming 
request stream and exposes it on req.body 
*/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


pool.connect((err, client, release) => {
	if (err) {
		return console.error(
			'Error acquiring client', err.stack)
	}
	client.query('SELECT NOW()', (err, result) => {
		release()
		if (err) {
			return console.error(
				'Error executing query', err.stack)
		}
		console.log("Connected to Database !")
	})
})

app.get('/', (req, res, next) => {
	console.log("user table :");
	pool.query('Select * from public."user"')
		.then(testData => {
			console.log(testData);
			res.send(testData.rows);
		})
})

app.use('/login', controller.user_login);
app.use('/register', controller.user_register);

// Require the Routes API 
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
	let host = server.address().address
	let port = server.address().port
	// Starting the Server at the port 3000
})
