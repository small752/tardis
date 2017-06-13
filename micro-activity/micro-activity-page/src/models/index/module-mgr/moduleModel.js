import {message} from 'antd';
import { parse } from 'qs';
import { queryModule, batchDelete } from '../../../services/index/module-mgr/moduleService';

// 模板页管理
export default {

  namespace: 'moduleModel',

  state: {
      loading: false,
      total: 0,
      pageIndex: 0,
      pageSize: 10,
      query: {},
      dataSource: [],
      selectedRowKeys: [],

      instanceModalVisible: false,
      instanceModuleId: '',
      instanceUrl: 'http://192.168.1.22:8989/#/instance'
  },

    subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/module_mgr') {
                  dispatch({
                    type: 'queryList',
                  });

                  dispatch({
                    type: 'moduleConfigModel/onClose',
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

            let moduleModel = yield select(state => state.moduleModel);

            payload = payload || {};
            let pageIndex = payload.pageIndex != undefined ? payload.pageIndex : moduleModel.pageIndex;
            let pageSize = payload.pageSize != undefined ? payload.pageSize    : moduleModel.pageSize;
            let query = payload.query || moduleModel.query;

            let queryParams = {
                pageIndex,pageSize,...query,
            };

            let { ret } = yield call( queryModule, parse(queryParams));
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

      /*删除*/
      *deleteBatch({ payload } , { put , call , select }){
            yield put({
                type : 'changeShowLoading',
            });

            let queryParams = {
                ids: payload.ids,
            };
            let { ret } = yield call( batchDelete, parse(queryParams));
            if( ret && ret.errorCode == 9000 ){
                yield put({
                    type : 'queryList',
                });
            } else {
                yield put({
                    type : 'changeShowLoading',
                });
                message.error((ret && ret.errorMessage) || '批量数据出现错误啦');
            }
      },

      /*打开创建实例窗口*/
      *onCreateIns({ payload } , { put , call , select }){
            let {moduleId} = payload;

            yield put({
                type: 'updateState',
                payload: {
                    instanceModalVisible: true,
                    instanceModuleId: moduleId,
                }
            });
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

      closeInsModal(state, action) {
          return { ...state, instanceModalVisible: false, instanceModuleId: ''};
      },
  },

}
