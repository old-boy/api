const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatorLogin(data){
    let msg = {};

    //字段不能为空,确保返回的值均为字符串
    data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : '';
    data.userPassword = !isEmpty(data.userPassword) ? data.userPassword : '';

    

    if(Validator.isEmpty(data.userName)){
        msg.userName = "用户名称不能为空";
    }

    if(Validator.isEmail(data.userEmail)){
        msg.userEmail = "邮箱不合法";
    }
    if(!Validator.isEmpty(data.userEmail)){
        msg.userEmail = "邮箱不能为空";
    }
    

    if(Validator.isEmpty(data.userPassword)){
        msg.userPassword = "密码不能为空";
    }
    

    //通过 isEmpty() 这个方法来验证传过去的这个对象是否存在等
    return {
        msg,
        isValid: isEmpty(msg)
    }
}