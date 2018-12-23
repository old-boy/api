module.exports = {
    mongoURI:'mongodb://localhost:27017/users',
    // mongoURI:"mongodb://test:bai123456@ds063150.mlab.com:63150/api",
    secretName:"secret"
}

/**
 * mongoURI 指向本地或服务器中的数据库,并将这个 key 以对象的形式 exports，方便其它模块中使用
 * 连接数据库一定要使用 mongodb，URL ,port 本地测试一定要添加，否则 保存不到数据库
 * 
 * secretKey 指向返回 token 加密名称
 */