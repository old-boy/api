const Validator = require('validator');
const isEmpty = require("../isEmpty");

module.exports = function homeBannerValidator(data) {
    let msg = {};

    data.bannerBg = !isEmpty(data.bannerBg) ? data.bannerBg : '';
    data.bannerName = !isEmpty(data.bannerName) ? data.bannerName : '';
    data.bannerSubName = !isEmpty(data.bannerSubName) ? data.bannerSubName : '';
    data.bannerFeather = !isEmpty(data.bannerFeather) ? data.bannerFeather :'';
    data.bannerLink = !isEmpty(data.bannerLink) ? data.bannerLink : '';

    if(Validator.isEmpty(data.bannerBg)){
        msg.bannerBg = "bannerBg不能为空";
    };

    if(!isEmpty(data.bannerBg)){
        if(!Validator.isURL(data.bannerBg)){
            msg.bannerBg = "url不合法";
        }
      }

    if(Validator.isEmpty(data.bannerName)){
        msg.bannerName = "bannerName 不能为空";
    };

    return {
        msg,
        isValid: isEmpty(msg)
    }
}