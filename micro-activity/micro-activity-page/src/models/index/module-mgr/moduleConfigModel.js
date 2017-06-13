import {message} from 'antd';
import { parse } from 'qs';
import {objListSort} from '../../../utils/arrayUtils';
import {queryModuleById, saveModulePage, } from '../../../services/index/module-mgr/moduleService';
import {queryPageComList} from '../../../services/index/module-mgr/modulePageService';
// 模板的页面配置 表单
export default {

  namespace: 'moduleConfigModel',

  state: {
      visible: false,
      loading: false,
      moduleId: '',//模板编号
      pageConfigList: [],//模板页的配置
      pageConfigListSort: [],//模板页的配置(排好序的)
      currentConfigKey: '',//当前操作的模板页配置

      pageComList: [],//模板页的摘要列表

      addPageVisible: false,//添加模板页的窗口是否显示
  },

  effects: {

      /*显示界面*/
      *handleOpen({ payload } , { put , call , select }){
          let {moduleId} = payload;
          let result_com = yield call(queryPageComList);
          let pageComList = [];
          if( result_com && result_com.ret && result_com.ret.errorCode == 9000 ){
            pageComList = result_com.ret.results;
            yield put({
                type : 'updateState',
                payload : {
                    pageComList,
                }
            });
          } else {
            message.error((ret && ret.errorMessage) || '查询模板页出错啦');
            return;
          }

          let { ret } = yield call(queryModuleById, parse({id: moduleId}));
            if( ret && ret.errorCode == 9000 ){

                let page_instances = ret.data.page_instances;
                let pageConfigList = [];

                let currentConfigKey = '';
                if(page_instances && page_instances.length > 0 && ret.results && ret.results.length > 0) {
                    let page_instances_arr = page_instances.split(',');
                    page_instances_arr && page_instances_arr.map(function(piaItem, piaIndex) {

                        let page_instances_item = ret.results.find(function(value, index, arr) {
                            return value.id == piaItem;
                        });

                        if(page_instances_item && page_instances_item.page_id != undefined) {
                            let page_item = pageComList.find(function(value, index, arr) {
                                return value.id == page_instances_item.page_id;
                            });

                            if(page_item) {
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
                                pageConfigList.push({
                                    key: 'page_' + piaIndex,
                                    index: piaIndex,
                                    type: page_item.type,
                                    config: config,
                                    component: page_item.component,
                                    name: page_instances_item.name,
                                    page_ins_id: page_instances_item.id,
                                    page_id: page_item.id,
                                    preview_img: page_instances_item.preview_img,
                                    seq_no: piaIndex,
                                });
                            }
                        }
                    });
                }
                let pageConfigListSort = objListSort(pageConfigList, 'seq_no');

                yield put({
                    type : 'updateState',
                    payload : {
                        moduleId,
                        pageConfigList,
                        visible: true,
                        loading: false,
                        pageConfigListSort,
                        currentConfigKey,
                    }
                });
            } else {
                message.error((ret && ret.errorMessage) || '模板不存在或者已经被删除');
            }
      },

      /*查询模板页的摘要列表*/
      *addPage({ payload } , { put , call , select }){
          let {page_id, page_ins_name, closePageModal, } = payload;
          let moduleConfigModel = yield select(state => state.moduleConfigModel);
          let { pageConfigList, pageComList } = moduleConfigModel;

          let page_item = pageComList.find(function(value, index, arr) {
            return value.id == page_id;
          });

          let maxIndex = 0;
          if(pageConfigList && pageConfigList.length > 0) {
              maxIndex = pageConfigList[pageConfigList.length-1].index;
              maxIndex += 1;
          }

          let config = page_item.default_config;
          try {
                if(config && config.length > 0 && typeof config == 'string') {
                    config = JSON.parse(config);
                }
            } catch(err) {
                config = {};
            }
          pageConfigList.push({
            key: 'page_' + maxIndex,
            index: maxIndex,
            type: page_item.type,
            config: config,
            component: page_item.component,
            name: page_ins_name,
            page_id,
            preview_img: page_item.preview_img,
            seq_no: maxIndex,
          });

          let pageConfigListSort = objListSort(pageConfigList, 'seq_no');
          closePageModal && closePageModal();

          yield put({
              type: 'updateState',
              payload: {
                  pageConfigList,
                  pageConfigListSort,
                  currentConfigKey: 'page_' + maxIndex,
              }
          });
      },

      /*更新配置*/
      *showRender({ payload } , { put , call , select }){
          let {key, config } = payload;

          let moduleConfigModel = yield select(state => state.moduleConfigModel);
          let { pageConfigList } = moduleConfigModel;

          let page_config_item = pageConfigList.find(function(value, index, arr) {
            return value.key == key;
          });

          page_config_item.config = {...page_config_item.config, ...config};

          let pageConfigListSort = objListSort(pageConfigList, 'seq_no');
          yield put({
              type: 'updateState',
              payload: {
                  pageConfigList,pageConfigListSort,
              }
          });
      },

          /*更新配置*/
      *onSaveSubmit({ payload } , { put , call , select }){

          let moduleConfigModel = yield select(state => state.moduleConfigModel);
          let { moduleId,pageConfigList,pageConfigListSort } = moduleConfigModel;

          let params = {moduleId};
          if(pageConfigListSort && pageConfigListSort.length > 0 ) {
              let pageIns = [];
              pageConfigListSort.map(function(pcItem, pcIndex) {
                  pageIns.push({
                      id: pcItem.page_ins_id,
                      name: pcItem.name,
                      page_id: pcItem.page_id,
                      type: pcItem.type,
                      component: pcItem.component,
                      preview_img: pcItem.preview_img,
                      config: pcItem.config,
                  });
              });

              params.pageIns = JSON.stringify(pageIns);

              yield put({
                  type: 'switchLoading',
              });

              let { ret } = yield call( saveModulePage, parse(params));
                if( ret && ret.errorCode == 9000 ){
                    message.success('模板页配置保存成功');
                    payload.onCloseClick && payload.onCloseClick();
                } else {
                    yield put({
                        type : 'switchLoading',
                    });
                    message.error((ret && ret.errorMessage) || '模板页配置保存出错啦');
                }

          } else {
              message.warn('请至少配置一个页面');
              return;
          }
      },

  },

  reducers: {

      updateState(state, action) {
          return { ...state, ...action.payload, };
      },
      switchLoading(state, action) {
          return { ...state, loading: !state.loading, };
      },
      onClose(state, action) {
          return { ...state, visible: false, loading: false, };
      },

      switchPageModalShow(state, action) {
          return { ...state, addPageVisible: !state.addPageVisible, };
      },
       /*更改当前显示的页*/
       changePage(state, action) {

          let {seq_no} = action.payload;
          let {pageConfigList,currentConfigKey,} = state;
          if(seq_no < 0) {
             message.warn('已经是最前一页');
             return {...state};
          }

           let max_seq_no = 0;
           if(pageConfigList && pageConfigList.length > 0) {
               max_seq_no = pageConfigList[pageConfigList.length-1].index;
           }
           if(seq_no > max_seq_no) {
               message.warn('已经是最后一页');
               return {...state};
           }

           let new_page_key = currentConfigKey;
           pageConfigList && pageConfigList.map(function(pcItem) {
               if(pcItem.seq_no == seq_no) {
                   new_page_key = pcItem.key;
               }
           });

          return { ...state, currentConfigKey: new_page_key, };
      },

      /*更改页的排序*/
      changePageSeqNo(state, action) {
          let {pageKey, seq_no} = action.payload;
          let {pageConfigList} = state;

          let source_item,target_item;
          pageConfigList && pageConfigList.map(function(pcItem) {
              if(pcItem.key == pageKey) {
                  source_item = pcItem;
              }
              if(pcItem.seq_no == seq_no) {
                  target_item = pcItem;
              }
          });

          if(source_item && target_item) {
              target_item.seq_no = source_item.seq_no;
              source_item.seq_no = seq_no;
          } else {
              message.warn('移动出错啦，请检查操作是否正确');
              return {...state};
          }

          let pageConfigListSort = objListSort(pageConfigList, 'seq_no');

          return {...state, pageConfigList, pageConfigListSort};
      },
  },

}
