module.exports = {
    mongoURI:"mongodb://localhost/users",
    // mongoURI:"mongodb://test:bai123456@ds063150.mlab.com:63150/api"
}

/**
 * mongoURI 指向本地或服务器中的数据库,并将这个 key 以对象的形式 exports，方便其它模块中使用
 * 连接数据库一定要使用 mongodb，URL 地址可以不添加 port
 */