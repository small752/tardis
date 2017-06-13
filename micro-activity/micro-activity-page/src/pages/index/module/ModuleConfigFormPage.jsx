import React from 'react';
import { connect } from 'dva';
import {Button} from 'antd';
import ModuleConfigFormComponent from '../../../components/module-mgr/module/ModuleConfigFormComponent';

function ModuleConfigFormPage({dispatch, moduleConfigModel, }) {

    let {visible, loading, moduleId, pageConfigList, pageConfigListSort, currentConfigKey, addPageVisible, pageComList, } = moduleConfigModel;

    function onClose() {
        dispatch({
            type: 'moduleConfigModel/onClose',
        });
    }

    function onAddPage() {
        dispatch({
            type: 'moduleConfigModel/switchPageModalShow',
        });
    }

    function closePageModal() {
        dispatch({
            type: 'moduleConfigModel/switchPageModalShow',
        });
    }

    function addPage(params, closePageModal) {
        dispatch({
            type: 'moduleConfigModel/addPage',
            payload: {
                ...params, closePageModal,
            }
        });
    }

    function changePageIns(key) {
         dispatch({
            type: 'moduleConfigModel/updateState',
            payload: {
                currentConfigKey: key,
            }
        });
    }

    /*更新配置数据*/
    function showRender(key, config) {
        dispatch({
            type: 'moduleConfigModel/showRender',
            payload: {
                key, config
            }
        });
    }

    /*更改显示页 -- 跳到指定页*/
    function changePage(seq_no) {
        dispatch({
            type: 'moduleConfigModel/changePage',
            payload: {
                seq_no
            }
        });
    }

    /*更改页的顺序*/
    function changePageSeqNo(pageKey, seq_no) {
        dispatch({
            type: 'moduleConfigModel/changePageSeqNo',
            payload: {
                pageKey, seq_no
            }
        });
    }

    /*保存模板页配置*/
    function onSaveSubmit() {
        dispatch({
            type: 'moduleConfigModel/onSaveSubmit',
            payload: {
                onCloseClick: onClose,
            }
        });
    }

    let comProps = {
        visible, loading, moduleId, pageConfigList, pageConfigListSort, currentConfigKey, addPageVisible, pageComList,
        onClose, onAddPage, closePageModal, addPage, changePageIns, showRender, changePage, changePageSeqNo,
        onSaveSubmit,
    };

    return (
        <ModuleConfigFormComponent {...comProps} />
    );
}

function mapStateToProps({moduleConfigModel}) {
  return {moduleConfigModel};
}

export default connect(mapStateToProps)(ModuleConfigFormPage);
