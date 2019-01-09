const Validator = require('validator');
const isEmpty = require("../isEmpty");

module.exports = function homeCaseValidator(data) {
    let msg = {};

    data.caseImg = !isEmpty(data.caseImg) ? data.caseImg : '';
    data.caseTitle = !isEmpty(data.caseTitle) ? data.caseTitle : '';
    data.caseSubTitle = !isEmpty(data.caseSubTitle) ? data.caseSubTitle : '';
    data.caseLink = !isEmpty(data.caseLink) ? data.caseLink :'';

    if(Validator.isEmpty(data.caseImg)){
        msg.caseImg = "caseImg不能为空";
    };
    if(Validator.isEmpty(data.caseTitle)){
        msg.caseTitle = "caseTitle不能为空";
    };
    if(Validator.isEmpty(data.caseSubTitle)){
        msg.caseSubTitle = "caseSubTitle不能为空";
    };
    if(Validator.isEmpty(data.caseLink)){
        msg.caseLink = "caseLink不能为空";
    };


    if(!isEmpty(data.caseImg)){
        if(!Validator.isURL(data.caseImg)){
            msg.caseImg = "url不合法";
        }
      }

    return {
        msg,
        isValid: isEmpty(msg)
    }
}