 import './index.html';
import dva from 'dva';

import '../../utils/request';
import './index.css';

import {message} from 'antd';

window.BASE_URL = window.BASE_URL||'/modules';


import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

message.config({
  duration: 3,
});
/*
 * 前端缓存数据
 */
window._init_data = {};


// 1. Initialize
const app = dva();

// 2. Model
app.model(require('../../models/index/common/layoutModel'));
app.model(require('../../models/index/module-mgr/modulePageModel'));
app.model(require('../../models/index/module-mgr/moduleModel'));
app.model(require('../../models/index/module-mgr/moduleBaseFormModel'));
app.model(require('../../models/index/module-mgr/moduleConfigModel'));
app.model(require('../../models/index/module-mgr/moduleInstanceMgrModel'));

app.model(require('../../models/index/instance/moduleInstanceModel'));

app.model(require('../../models/h5/instance/instanceH5Model'));

// 3. Router
app.router(require('./router'));

// 4. Start
app.start('#root');
