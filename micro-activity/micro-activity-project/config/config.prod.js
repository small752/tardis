'use strict';

// 生产环境配置
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

    // 自定义的参数-news相关的参数
  config.news = {
    pageSize: 10,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

   config.upload = {
        baseUrl: 'http://saas.ishanshan.com'
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

  return config;
};
