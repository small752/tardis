'use strict';

// 默认环境配置
module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_201705141415';

  // add your config here

    // 视图相关-  模板引擎
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

    //请求参数的大小限制
   config.bodyParser = {
    jsonLimit: '100kb',
    formLimit: '1mb',
  };

    // 自定义的参数-news相关的参数
  config.news = {
    pageSize: 5,
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

  return config;
};
