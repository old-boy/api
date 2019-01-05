const Validator = require('validator');
const isEmpty = require("./isEmpty");

module.exports = function validatorProfile(data) {
  let msg = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if(!Validator.isLength(data.handle,{min:2,max:40})){
    msg.handle = "用户名的长度不能小于2位并且不能大于40位!";
  }

  if(Validator.isEmpty(data.handle)){
    msg.handle = "handle不能为空!";
  }

  if(Validator.isEmpty(data.status)){
    msg.status = "status不能为空!";
  }

  if(Validator.isEmpty(data.skills)){
    msg.skills = "skills不能为空!";
  }

  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)){
        msg.website = "url不合法";
    }
  }

  if(!isEmpty(data.tengxunkt)){
    if(!Validator.isURL(data.tengxunkt)){
        msg.tengxunkt = "url不合法";
    }
  }

  if(!isEmpty(data.wangyikt)){
    if(!Validator.isURL(data.wangyikt)){
        msg.wangyikt = "url不合法";
    }
  }

  

  return {
    msg,
    isValid:isEmpty(msg)
  };
}