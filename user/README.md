## Restful Api

当前主要有两个分支，分别为 anviz 与 utec ，都是关于网站的相关接口。
所有接口基于登录用户的 token 进行操作。

#### 环境

-（+*）"bcrypt": "^3.0.2",
-（+*）"body-parser": "^1.18.3",
-（+*）"express": "^4.16.4",
-（+*）"jsonwebtoken": "^8.4.0",
-（+*）"mongoose": "^5.4.0",
-（+*）"nodemon": "^1.18.9",
-（+*）"passport": "^0.4.0",
-（+*）"passport-jwt": "^4.0.0",
-（+*）"validator": "^10.10.0",
-（+*）"node": "^10.14.2",
-（+*）"npm": "^6.4.1"

#### 结构

    api
        user
            config
            models
            node_modules
            router
                api
                    anviz
                    utec
                    profile.js
                    user.js
            validation
            package.json
            package-lock.json
            server.js
            .gitignore

#### anviz api

    GET     http://localhost:3000/api/anviz/home/banner
    POST    http://localhost:3000/api/anviz/home/banner
    POST    http://localhost:5000/api/anviz/home/prodcut


#### user api

    POST    http://localhost:3000/api/user/register
    > userName
    > userEmail
    > userPassword
    > userPassword2

    POST    http://localhost:3000/api/user/login
    > userEmail
    > userPassword

    POST    http://localhost:3000/api/profile/
    > handle
    > company
    > website
    > location
    > status
    > skills

    POST    http://localhost:3000/api/profile/experience
    > title
    > company
    > location
    > from
    > to
    > description
    > current

    POST    http://localhost:3000/api/profile/education
    > school
    > degree
    > fieldofstudy
    > from
    > to
    > description

    GET     http://localhost:3000/api/profile/
    GET     http://localhost:3000/api/profile/user/id
    GET     http://localhost:3000/api/profile/all


一直更新中...
