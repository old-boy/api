const express = require("express");
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const cors = require('cors');

const app = express();

// port
const port = 3000;

// db
const dburl = "mongodb://localhost:27017/local";
mongoose.connect(dburl, { useNewUrlParser: true }).then(() => console.log('Database Successful！')).catch((err) => console.log(err));

//验证 token
// require("./config/passport")(passport);

// init 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(session({
    secret: 'anviz',
    store: new MongoStore({
        url: dburl,
        collection: 'sessions'
    })
}));
app.use(cors());
app.use(require('serve-static')(__dirname + '/../../public'));

// router
app.use('/api/user', require('./routes/api/user'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/product', require('./routes/api/productModule'));
app.use('/api/product', require('./routes/api/productTag'));
app.use('/api/faq', require('./routes/api/faq'));
app.use('/api/product/status', require('./routes/api/sellStatus'));
app.use('/api/product/staticpage', require('./routes/api/productTemplate'));

const server = app.listen(port, 'localhost', () => {
    const host = server.address().address
    const port = server.address().port
    console.log("server started! 访问地址为 http://%s:%s", host, port)
});