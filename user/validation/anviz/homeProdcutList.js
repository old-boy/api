const Validator = require('validator');
const isEmpty = require("../isEmpty");

module.exports = function homeProdcutValidator(data) {
    let msg = {};

    data.prodctName = !isEmpty(data.prodctName) ? data.prodctName : '';
    data.prodctSubTitel = !isEmpty(data.prodctSubTitel) ? data.prodctSubTitel : '';
    data.prodctDes = !isEmpty(data.prodctDes) ? data.prodctDes : '';
    data.prodctLink = !isEmpty(data.prodctLink) ? data.prodctLink :'';
    data.prodctImg = !isEmpty(data.prodctImg) ? data.prodctImg : '';
    data.prodctFeature = !isEmpty(data.prodctFeature) ? data.prodctFeature : '';

    if(Validator.isEmpty(data.prodctName)){
        msg.prodctName = "prodctName不能为空";
    };
    if(Validator.isEmpty(data.prodctSubTitel)){
        msg.prodctSubTitel = "prodctSubTitel不能为空";
    };
    if(Validator.isEmpty(data.prodctLink)){
        msg.prodctLink = "prodctLink不能为空";
    };
    if(Validator.isEmpty(data.prodctImg)){
        msg.prodctImg = "prodctImg不能为空";
    };

    if(Validator.isEmpty(data.prodctDes)){
        msg.prodctDes = "prodctDes不能为空";
    };
    if(Validator.isEmpty(data.prodctFeature)){
        msg.prodctFeature = "prodctFeature不能为空";
    };

    if(!isEmpty(data.prodctLink)){
        if(!Validator.isURL(data.prodctLink)){
            msg.prodctLink = "url不合法";
        }
      }

      if(!isEmpty(data.prodctImg)){
        if(!Validator.isURL(data.prodctImg)){
            msg.prodctImg = "url不合法";
        }
      }


    return {
        msg,
        isValid: isEmpty(msg)
    }
}