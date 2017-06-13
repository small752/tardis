'use strict';
//判断是否是 局域网IP
function isInnerIp(ip) {
    return true;
}

// 测试环境配置
module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_dev_' + '_201705141415';

  // add your config here

    // 视图相关-  模板引擎
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.upload = {
        baseUrl: 'http://192.168.1.52'
  };

    //请求参数的大小限制
   config.bodyParser = {
    jsonLimit: '100kb',
    formLimit: '1mb',
  };

    // 自定义的参数-news相关的参数
  config.news = {
    pageSize: 8,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

    // 禁止站点访问
  config.middleware = [
    'robot',
  ];

  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };

    config.mysql = {
      // 单数据库信息配置
      client: {
        // host
        host: '192.168.1.52',
        // 端口号
        port: '3306',
        // 用户名
        user: 'jpss',
        // 密码
        password: 'Jpss541018!',
        // 数据库名
        database: 'micro-activity-db',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    };

    config.security = {
      csrf: {
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        ignore: ctx => isInnerIp(ctx.ip),
      },
    };

    config.logger = {
        dir: '/root/logs/micro-activity',
    };
  return config;
};
