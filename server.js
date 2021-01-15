var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors')
const express = require('express')
const app = express()
const port = 3001

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

app.post('/auth', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	console.log(username, password);
	if (username && password) {
		response.send('ookoo', username, password);
		response.end();
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
})