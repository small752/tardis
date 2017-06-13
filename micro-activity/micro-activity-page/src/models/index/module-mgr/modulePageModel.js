import {message} from 'antd';
import { parse } from 'qs';
import { queryModulePage, batchDelete } from '../../../services/index/module-mgr/modulePageService';

// 模板页管理
export default {

  namespace: 'modulePageModel',

  state: {
      loading: false,
      total: 0,
      pageIndex: 0,
      pageSize: 10,
      query: {},
      dataSource: [],
      selectedRowKeys: [],
  },

    subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/module_page_mgr') {
                  dispatch({
                    type: 'queryList',
                  });
              }
          });
      },
  },

  effects: {

      /*查询通知列表*/
      *queryList({ payload } , { put , call , select }){
            yield put({
                type : 'changeShowLoading',
            });

            let modulePageModel = yield select(state => state.modulePageModel);

            payload = payload || {};
            let pageIndex = payload.pageIndex != undefined ? payload.pageIndex : modulePageModel.pageIndex;
            let pageSize = payload.pageSize != undefined ? payload.pageSize    : modulePageModel.pageSize;
            let query = payload.query || modulePageModel.query;

            let queryParams = {
                pageIndex,pageSize,...query,
            };

            let { ret } = yield call( queryModulePage, parse(queryParams));
            if( ret && ret.errorCode == 9000 ){
                yield put({
                    type : 'updateState',
                    payload : {
                        dataSource: ret.results,
                        total: ret.data.total,
                        loading: false,
                        pageIndex,pageSize,query,
                        selectedRowKeys: [],
                    }
                });
            } else {
                yield put({
                    type : 'changeShowLoading',
                });
                message.error((ret && ret.errorMessage) || '查询模板页出错啦');
            }
      },

},

  reducers: {

      updateState(state, action) {
          return { ...state, ...action.payload, };
      },

    /*显隐模糊检索栏*/
      changeShowLoading(state, action) {
          let loading = state.loading;
          return {...state, loading: !loading};
      },
  },

}
