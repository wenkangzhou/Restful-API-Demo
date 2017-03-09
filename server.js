var express    = require('express'),
    path       = require('path'),
    app        = express(),
    bodyParser = require('body-parser'),
    port       = process.env.PORT || 8087,
    router     = express.Router(),
    db         = [];

app.set('views',path.join(__dirname , './templete') );

app.engine('.html', require('ejs').__express);  

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));//support x-www-form-urlencoded

app.use(bodyParser.json());

/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

router.get('/', function(req, res) {
    res.send('<h1>Hello Api</h1>');
});

router.get('/:name', function(req, res) {
    // res.send('<h1>Hello ' + req.params.name + '</h1>');
    res.json(db);
});

router.get('/show/:title', function(req, res) {
    var data = [{
        name: "james",
        age: "33"
    }];
    if(db.length > 0){
        data = db;
    }
    res.render('index',{title:req.params.title,data});
});

router.post('/', function (req, res) {
    var name = req.body.name;
    res.json({message: 'Hello ' + name});
});

router.post('/show', function (req, res) {
    var name = req.body.name,
        age = req.body.age;
    if(db.length > 0){
        db.push({name:name,age:age});
    }else{
        db  = [{name:name,age:age}];
    }
    res.send({name:name,age:age});
});

router.delete('/show/:name', function (req, res) {
    var name = req.params.name;
    db.pop();
    res.send("success");
})

router.put('/show/:name', function (req, res) {
    var name = req.params.name;
    db[0] = {name:'update',age:'update'};
    res.send("success");
})

app.use('/api', router);

app.listen(port);
