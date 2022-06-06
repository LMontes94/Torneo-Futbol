const express = require('express');
const bodyParser = require('body-parser');
const rutasMain = require('./routes/main.js');
const rutasUsers = require('./routes/user.js');
const rutasData = require('./routes/data');

const app = express();
const port = process.env.PORT || 3030;

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.set('view engine','ejs');


app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('	[GET] http://localhost:3030/');
});

app.use('/',rutasMain);
app.use('/user',rutasUsers);
app.use('/data',rutasData);

