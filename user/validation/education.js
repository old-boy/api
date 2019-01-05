const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatorEducation(data){
    let msg = {};

    //字段不能为空,确保返回的值均为字符串
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    //Validator true 取反时 !Validator

    if(Validator.isEmpty(data.school)){
        msg.school = "school不能为空";
    };

    if(Validator.isEmail(data.degree)){
        msg.degree = "degree不能为空";
    };

    if(Validator.isEmpty(data.fieldofstudy)){
        msg.fieldofstudy = "fieldofstudy不能为空";
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