import {message} from 'antd';
import { parse } from 'qs';
import {saveModule} from '../../../services/index/module-mgr/moduleService';

// 模板的基础信息表单
export default {

  namespace: 'moduleBaseFormModel',

  state: {
      visible: false,
      loading: false,
      formType: '1',  //表单类型  1创建  2修改
      formData: {},
  },

  effects: {

      /*查询通知列表*/
      *handleOpen({ payload } , { put , call , select }){
          let formType = payload && payload.formType;
          yield put({
              type: 'updateState',
              payload: {
                  visible: true,
                  loading: false,
                  formType: formType || '1',
              }
          });
      },

        /*查询通知列表*/
      *handleSubmit({ payload } , { put , call , select }){

          let {id,name,intro,preview_img,expire_time,status,type} = payload;
          let params = {
              id,name,intro,status,type,
          };
          if(preview_img && preview_img.length > 0) {
              try{
                  params.preview_img = preview_img[0].response.data.url;
              } catch(err) {
                  message.error('预览图片未选择或者图片上传失败');
                  return;
              }
          }
          if(expire_time) {
              try{
                  params.expire_time = expire_time.format('YYYY-MM-DD HH:mm:ss');
              } catch(err) {
                  message.error('过期时间未选择或者格式不正确');
                  return;
              }
          }

          yield put({
              type: 'changeLoading',
          });

          let { ret } = yield call( saveModule, parse(params));
            if( ret && ret.errorCode == 9000 ){
                message.success('模板保存成功');
                payload.onCloseClick && payload.onCloseClick();
                yield put({
                  type: 'moduleModel/queryList',
                });
            } else {
                yield put({
                    type : 'changeLoading',
                });
                message.error((ret && ret.errorMessage) || '模板保存出错啦');
            }
      }

  },

  reducers: {

      updateState(state, action) {
          return { ...state, ...action.payload, };
      },
      changeLoading(state, action) {
          return { ...state, loading: !state.loading};
      },
       onClose(state, action) {
          return { ...state, visible: false, loading: false, };
      },
  },

}
