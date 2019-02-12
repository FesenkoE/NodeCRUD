var express = require('express');
var bodyParser = require('body-parser');
var courses = require ('./data/courses.json');
var app = express();

app.set('view engine', 'pug');

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('/', function (req, res) {
	res.render('index', {title: 'CRUD Demo'});
});

app.get('/courses', function(req, res) {
	res.render('courses', {
		title: 'CRUD Курсы',
		courses: courses	
	});
});

// Get all courses
app.get('/courses/add', function(req, res) {
	res.render('add');
});

/***********************************************checked******************************/

app.post('/courses/add', function(req, res) {
	var course = {
		id: Date.now(),
		name: req.body.name
	};

	courses.push(course);

	res.redirect('/courses');
});

app.get('/courses/edit/:id', function(req, res) {
	var course = courses.find(function(course) {
		return course.id === parseInt(req.params.id);
	});

	if (!course) {
		res.sendStatus(404);
		return;
	}

	res.render('edit', {course: course});
});

app.get('/courses/delete/:id', function (req, res) {
		courses = courses.filter(function (course) {
			return course.id !== parseInt(req.params.id);		
		});
		res.redirect('/course');
});

// app.post('/api/courses', function(req, res) {
// 	var course = {
// 		id: Date.now(),
// 		name: req.body.name
// 	}
// 	console.log(req.body.name);
// 	courses.push(course);
// 	res.send(courses);
// });



// app.put('/api/courses/:id', function(req, res) {
// 	var course = courses.find(function (course) {
// 		return course.id === parseInt(req.params.id);		
// 	});
// 	course.name = req.body.name;
// 	res.send(course);
// });

// app.delete('/api/courses/:id', function(req, res) {
// 	courses = courses.filter(function (course) {
// 		return course.id !== parseInt(req.params.id);		
// 	});

// 	res.sendStatus(200);
// });

app.listen(3000, function() {
	console.log('Example app listening on port 3000');
});



