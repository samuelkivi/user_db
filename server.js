var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors')
const express = require('express')
const app = express()
const port = 3001
var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'rootpassword',
	database: 'user_database'
});


app.use(cors());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello World!')
})


app.post('/save', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	console.log(username, password);
	if (username && password) {
		var sql = "INSERT INTO users (username, pword) VALUES ('" + username + "', '" + password + "')";
		pool.query(sql, function (err, result, fields) {
			if (err) throw err;
			console.log("Number of records inserted: " + result.affectedRows);
		});
		response.send('ookoo');
		response.end();
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/getUsers', function (request, response) {
		pool.query("SELECT * FROM users", function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			response.send(result);
			response.end();
		  });
});


app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})