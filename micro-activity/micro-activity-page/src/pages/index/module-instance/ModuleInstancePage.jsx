import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ModuleInstanceComponent from '../../../components/instance/ModuleInstanceComponent';

function ModuleInstancePage({dispatch, children, location, moduleInstanceModel}) {

    let {loading,instanceId,moduleId,instancePageList,currentConfigKey,} = moduleInstanceModel;

    /*更新配置数据*/
    function showRender(key, config) {
        dispatch({
            type: 'moduleInstanceModel/showRender',
            payload: {
                key, config
            }
        });
    }

    /*更改显示页 -- 跳到指定页*/
    function changePage(seq_no, pageKey) {
        dispatch({
            type: 'moduleInstanceModel/changePage',
            payload: {
                pageKey, seq_no
            }
        });
    }

    function toRemovePage(pageKey) {
        dispatch({
            type: 'moduleInstanceModel/toRemovePage',
            payload: {
                pageKey
            }
        });
    }

    function toSave() {
        dispatch({
            type: 'moduleInstanceModel/toSave',
        });
    }

    let comProps = {
        loading,instanceId,moduleId,instancePageList,currentConfigKey,showRender,changePage, toRemovePage, toSave,
    };

    return (
        <ModuleInstanceComponent {...comProps} />
    );
}

function mapStateToProps({moduleInstanceModel}) {
  return {moduleInstanceModel};
}

export default connect(mapStateToProps)(ModuleInstancePage);
