import { message } from 'antd';
import { routerRedux } from 'dva/router';

// 全局布局model
export default {

  namespace: 'layoutModel',

  state: {
      currentMenuKey: '',
      allMenuList: [],
      collapsed: true,//菜单是否展开
  },

  reducers: {

      updateState(state, action) {
          return { ...state, ...action.payload, };
      },

  },

}
