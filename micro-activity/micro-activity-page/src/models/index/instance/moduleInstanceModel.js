import {message} from 'antd';
import { parse } from 'qs';
import {queryModuleById, } from '../../../services/index/module-mgr/moduleService';
import {queryInstanceById, saveModuleInstance, } from '../../../services/index/instance/moduleInstanceService';
// 模板的页面配置 表单
export default {

  namespace: 'moduleInstanceModel',

  state: {
      loading: false,
      instanceId: '',//模板实例编号
      moduleId: '',//模板编号
      instancePageList: [],//实例的页配置列表
      currentConfigKey: '',//当前配置页
  },

     subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/instance') {
                  let {instanceId, moduleId} = query;
                  dispatch({
                      type: 'initInstanceData',
                      payload: {
                          instanceId, moduleId,
                      }
                  });
              }
          });
      },
  },

  effects: {

      /*初始化模板实例数据*/
      *initInstanceData({ payload } , { put , call , select }){
          let instanceId = payload && payload.instanceId;
          let moduleId = payload && payload.moduleId;

          if((instanceId == undefined || instanceId == '') && (moduleId == undefined || moduleId == '')) {
              message.error('请选择模板或者模板实例');
              return;
          }

          let pageInsList = [];//模板页的配置列表
          let pageInsArr = [];//模板页的排序
          if(instanceId == undefined || instanceId == '') {
              //创建实例时
              let { ret } = yield call(queryModuleById, parse({id: moduleId}));
              if( ret && ret.errorCode == 9000 ){
                  let page_instances = ret.data.page_instances;
                  if(page_instances && page_instances.length > 0) {
                      pageInsArr = page_instances.split(',');
                  }
                  pageInsList = ret.results;
              }
          } else {
              let { ret } = yield call(queryInstanceById, parse({id: instanceId}));
              if( ret && ret.errorCode == 9000 ){
                  let page_instances = ret.data.ins_pages;
                  if(page_instances && page_instances.length > 0) {
                      pageInsArr = page_instances.split(',');
                  }
                  pageInsList = ret.results;
              }
          }

          let instancePageList = [];//整合 模板页的配置列表(排好序)
          let currentConfigKey = '';

          pageInsArr && pageInsArr.map(function(piaItem, piaIndex) {

                let page_instances_item = pageInsList.find(function(value, index, arr) {
                    return value.id == piaItem;
                });

                if(page_instances_item && page_instances_item.page_id != undefined) {

                    if(currentConfigKey == '') {
                        currentConfigKey = 'page_' + piaIndex;
                    }
                    let config = page_instances_item.config;
                    try {
                        if(config && config.length > 0 && typeof config == 'string') {
                            config = JSON.parse(config);
                        }
                    } catch(err) {
                        config = {};
                    }
                    instancePageList.push({
                        key: 'page_' + piaIndex,
                        index: piaIndex,
                        type: page_instances_item.type,
                        config: config,
                        component: page_instances_item.component,
                        name: page_instances_item.name,
                        page_ins_id: page_instances_item.id,
                        page_id: page_instances_item.page_id,
                        seq_no: piaIndex,
                    });
                }
            });

          yield put({
              type: 'updateState',
              payload: {
                  instancePageList,currentConfigKey,instanceId,moduleId,loading: false,
              }
          });
      },

          /*初始化模板实例数据*/
      *toSave({ payload } , { put , call , select }){

          yield put({
              type: 'updateState',
              payload: {
                  loading: true
              }
          });

          let moduleInstanceModel = yield select(state => state.moduleInstanceModel);
          let {instanceId,moduleId,instancePageList,} = moduleInstanceModel;

          let params = {
              instanceId,moduleId,instancePageList: JSON.stringify(instancePageList),
          };

          let { ret } = yield call( saveModuleInstance, parse(params));
          if( ret && ret.errorCode == 9000 ){
            message.success('模板实例保存成功');
            yield put({
              type: 'updateState',
              payload: {
                  instanceId: '', moduleId: '',instancePageList: [],currentConfigKey: '',
              }
            });
              window.gameIframeCloseAction && window.gameIframeCloseAction();
          } else {
            yield put({
              type: 'updateState',
              payload: {
                  loading: false
              }
          });
            message.error((ret && ret.errorMessage) || '模板实例保存出错啦');
          }
      },
  },

  reducers: {

      updateState(state, action) {
          return { ...state, ...action.payload, };
      },

      showRender(state, action) {
          let {key, config} = action.payload;
          let {instancePageList} = state;
          instancePageList && instancePageList.map(function(ipItem) {
                if(ipItem.key == key) {
                    ipItem.config = {...ipItem.config, ...config};
                }
          });
          return { ...state, instancePageList,};
      },

      toRemovePage(state, action) {
          let {pageKey} = action.payload;
          let {instancePageList,} = state;
          let newInsList = [];
          let currentConfigKey = '';
         let index = 0;
          instancePageList && instancePageList.map(function(item) {
              if(item.key == pageKey) {
                  currentConfigKey = 'page_' + (item.index-1);
              } else {
                  item.seq_no = index++;
                  newInsList.push(item);
              }
          });
          return { ...state, instancePageList: newInsList, currentConfigKey,};
      },

      changePage(state, action) {
          let {pageKey,seq_no} = action.payload;
          let {instancePageList,currentConfigKey,} = state;

          if(pageKey == undefined || pageKey == '') {

              if(seq_no < 0) {
                 message.warn('已经是最前一页');
                 return {...state};
              }

               let max_seq_no = 0;
               if(instancePageList && instancePageList.length > 0) {
                   max_seq_no = instancePageList[instancePageList.length-1].seq_no;
               }
               if(seq_no > max_seq_no) {
                   message.warn('已经是最后一页');
                   return {...state};
               }

               let new_page_key = currentConfigKey;
               instancePageList && instancePageList.map(function(pcItem) {
                   if(pcItem.seq_no == seq_no) {
                       new_page_key = pcItem.key;
                   }
               });

              return { ...state, currentConfigKey: new_page_key, };
          } else {
              return { ...state, currentConfigKey: pageKey, };
          }

      },
  },

}
