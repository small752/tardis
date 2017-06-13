import { parse } from 'qs';
import {queryInstanceById} from '../../../services/index/instance/moduleInstanceService';
import * as swiper from '../../../utils/swiperUitls';
// 模板实例的h5页面
export default {

  namespace: 'instanceH5Model',

  state: {
      loading: false,
      instanceId: '',//模板实例编号
      instancePageList: [],//实例的页配置列表
      configData: {},//配置项
      currentIndex: '',//当前显示页序号

      musicState: 'run',//音乐状态  stop / run
  },

     subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/instance_h5') {
                  let {instanceId} = query;
                  dispatch({
                      type: 'initInstanceData',
                      payload: {
                          instanceId
                      }
                  });

                  wiperSlideChangeEnd = function(wiper) {
                      let {activeIndex} = wiper;
                      dispatch({
                          type: 'updateState',
                          payload: {
                              currentIndex: activeIndex,
                          }
                      });
                  }
              }
          });
      },
  },

  effects: {
      /*初始化模板实例数据*/
      *initInstanceData({ payload } , { put , call , select }){
          let instanceId = payload && payload.instanceId;

          let pageInsList = [];//模板页的配置列表
          let pageInsArr = [];//模板页的排序
          let { ret } = yield call(queryInstanceById, parse({id: instanceId}));
          if( ret && ret.errorCode == 9000 ){
              let page_instances = ret.data.ins_pages;
              if(page_instances && page_instances.length > 0) {
                  pageInsArr = page_instances.split(',');
              }
              pageInsList = ret.results;
          }

          let instancePageList = [];//整合 模板页的配置列表(排好序)
          let configData = {};
          let currentIndex;
          let piaIndex = 0;
          pageInsArr && pageInsArr.map(function(piaItem) {

                let page_instances_item = pageInsList.find(function(value, index, arr) {
                    return value.id == piaItem;
                });

                if(page_instances_item && page_instances_item.page_id != undefined) {

                    let config = page_instances_item.config;
                    try {
                        if(config && config.length > 0 && typeof config == 'string') {
                            config = JSON.parse(config);
                        }
                    } catch(err) {
                        config = {};
                    }
                    if(page_instances_item.type == '0') {
                        configData = {
                            key: 'page_' + piaIndex,
                            index: piaIndex,
                            type: page_instances_item.type,
                            config: config,
                            component: page_instances_item.component,
                            name: page_instances_item.name,
                            page_ins_id: page_instances_item.id,
                            page_id: page_instances_item.page_id,
                            seq_no: piaIndex,
                        };
                    } else {
                        if(currentIndex == undefined) {
                            currentIndex = piaIndex;
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
                        piaIndex++;
                    }
                }
            });

          yield put({
              type: 'updateState',
              payload: {
                  instancePageList,configData,currentIndex,instanceId,loading: false,
              }
          });

          let {config} = configData;
          window.document.title = config.name;
          let switch_type = config.switch_type || 'type_1';
          swiper[switch_type] ? swiper[switch_type]() : swiper['type_1']();

          weixinSign({
              share_title: config.share_title,
              share_desc: config.share_intro,
              share_link: location.href,
              share_imgUrl: config.share_img,
          });
      },
  },

  reducers: {
      updateState(state, action) {
          return { ...state, ...action.payload, };
      },
  },

}
