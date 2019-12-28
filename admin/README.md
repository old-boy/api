# admin 后台管理系统
# anviz-web 后台api

## Project 后台api相关接口
```
/localhost:3000/admin/api

/user                   GET 用户相关
/user/signout           GET
/user/add               POST
/user/login             POST

/product/modules        GET 产品相关
/product/modules        POST
/product/modules/:id    DELETE/UPDATE
/product/tag            GET
/product/tag            POST
/product/status         GET
/product/status/add     POST
/product/status/:id     DELETE/UPDATE
/product/staticpage     GET
/product/staticpage/add POST
/product/staticpage/:id DELETE/UPDATE

/faq/                   GET 技术支持相关
/faq/add                POST
/faq/:id                DELETE/UPDATE

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [WEBSITE](https://www.anviz.com/).
