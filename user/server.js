const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

/**端口
 * 为了满足正式环境中的node服务的端口启动需求，有时候需要用到port环境变量，那么这时候就需要在node启动时，设置process.env.PORT。
 * process.env.PORT  意思是读取当前目录下环境变量port的值
 */
// const port = process.env.PORT || 5000;
const port = 8000;

/**初始化中件间
 * POST配置  给数据库添加数据中间件 bodyParser
 * 新版本的 express 已经分离出了 body-parser 组件，如果在 app 使用过程中，将 bodyParser 配置在路由之后，会导到 POST 请求后，返回为 undefined
 * 因此，bodyParser 的配置要在 接口路由配置前使用
 * 
 * bodyParser.urlencoded 用来解析 form 表单提交的数据，也就是请求头包含 form-urlencoded 这样信息的，
 * 解析成功后覆盖原来的req.body，如果解析失败则为 {}
 * 
 * 该模块有一个属性extended，extended选项允许配置使用querystring(false)或qs(true)来解析数据，默认值是true
 * extended - 当设置为false时，会使用querystring库解析URL编码的数据；
 *            当设置为true时，会使用qs库解析URL编码的数据。后没有指定编码时，使用此编码。默认为true
 */
app.use(bodyParser.urlencoded({extended:false}))  
app.use(bodyParser.json());
app.use(passport.initialize());


/**
 * 接口文件
 */
const userApi = require('./router/api/user');
const profileApi = require('./router/api/profile');


/**
 * db 数据库配置文件
 */
const db = require('./config/key').mongoURI;

/**
 * 连接数据库
 * 当前版本需要在连接数据库时添加 { useNewUrlParser: true }，否则在提交数据时会显示数据库连接超时
 */
mongoose.connect(db,{ useNewUrlParser: true }).then( () => console.log('数据库连接成功！')).catch((err) => console.log(err));

/** 
 * 配置 passport，验证 token
 * 把 passport 这个中间件传给 passport 配置文件，方便调用
*/
require("./config/passport")(passport);

/**
 * 配置路由( 路由地址就是当前接口文件的目录地址 ),当请求路由地址时，指向对应的接口方法
 * 获取POST提交的数据
 * res 在浏览器中返回的 json
 * req 传入的参数
 */
app.get('/',(req,res) => {
    res.send('服务启动成功，返回数据为 OK!');
});

app.use('/api/user',userApi);
app.use('/api/profile',profileApi);


/**
 * 监听 app
 */
app.listen(port,() => {
    //验证服务是否成功
    console.log('服务启动成功！')
});

