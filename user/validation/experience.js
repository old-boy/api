const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatorExperience(data){
    let msg = {};

    //字段不能为空,确保返回的值均为字符串
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    //Validator true 取反时 !Validator

    if(Validator.isEmpty(data.title)){
        msg.title = "title不能为空";
    };

    if(Validator.isEmail(data.company)){
        msg.company = "company不能为空";
    };

    if(Validator.isEmpty(data.from)){
        msg.from = "from不能为空";
    };


    //通过 isEmpty() 这个方法来验证传过去的这个对象是否存在等
    return {
        msg,
        isValid: isEmpty(msg)
    }
}