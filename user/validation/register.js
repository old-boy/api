const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatorRegister(data){
    let msg = {};

    //字段不能为空,确保返回的值均为字符串
    data.userName = !isEmpty(data.userName) ? data.userName : '';
    data.userEmail = !isEmpty(data.userEmail) ? data.userEmail : '';
    data.userPassword = !isEmpty(data.userPassword) ? data.userPassword : '';
    data.userPassword2 - !isEmpty(data.userPassword2) ? data.userPassword2 : '';

    //Validator true 取反时 !Validator
    if(!Validator.isLength(data.userName,{min:2,max:30})){
        msg.userName = "用户名称不能小于2位不能大于30位";
    }
    if(!Validator.isLength(data.userPassword,{min:2,max:30})){
        msg.userPassword = "密码不能小于2位不能大于30位";
    }

    if(Validator.isEmpty(data.userName)){
        msg.userName = "用户名称不能为空";
    }

    if(Validator.isEmpty(data.userEmail)){
        msg.userEmail = "邮箱不能为空";
    }
    if(!Validator.isEmail(data.userEmail)){
        msg.userEmail = "邮箱不合法";
    }

    if(Validator.isEmpty(data.userPassword)){
        msg.userPassword = "密码不能为空";
    }
    if(Validator.isEmpty(data.userPassword2)){
        msg.userPassword2 = "确认密码不能为空";
    }

    if(Validator.equals(data.userPassword,data.userPassword2)){
        msg.userPassword2 = "两次密码不一致"
    }

    //通过 isEmpty() 这个方法来验证传过去的这个对象是否存在等
    return {
        msg,
        isValid: isEmpty(msg)
    }
}