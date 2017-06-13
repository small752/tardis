import React from 'react';
import { connect } from 'dva';
import ModuleComponent from '../../../components/module-mgr/module/ModuleComponent';
import ModuleBaseFormPage from './ModuleBaseFormPage';
import ModuleConfigFormPage from './ModuleConfigFormPage';
import ModuleInstanceFormComponent from '../../../components/module-mgr/module/ModuleInstanceFormComponent';

function ModulePage({dispatch, moduleModel, }) {

    let {
        loading, total, pageIndex, pageSize, query, dataSource, selectedRowKeys,
        instanceModalVisible,instanceModuleId,instanceUrl,
    } = moduleModel;

    function selectChange(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'moduleModel/updateState',
            payload: {
                selectedRowKeys: selectedRowKeys,
            }
        });
    }

    function pageChange(pageIndex) {
        dispatch({
            type: 'moduleModel/queryList',
            payload: {
                pageIndex: pageIndex-1,
            }
        });
    }

    /*每页显示数量变化*/
    function pageSizeChange(pageIndex, pageSize) {
        dispatch({
            type: 'moduleModel/queryList',
            payload: {
                pageIndex: pageIndex-1,
                pageSize,
            }
        });
    }

    function onCreate() {
        dispatch({
            type: 'moduleBaseFormModel/handleOpen',
            payload: {
                formType: '1'
            }
        });
    }

    function onUpdate(id) {
        dispatch({
            type: 'moduleBaseFormModel/handleOpen',
            payload: {
                formType: '2',
                formId: id,
            }
        });
    }

    function onConfig(id) {
        dispatch({
            type: 'moduleConfigModel/handleOpen',
            payload: {
                moduleId: id,
            }
        });
    }

    function onSearch(value) {
        dispatch({
            type: 'moduleModel/queryList',
            payload: {
                query: {
                    searchKey: value
                }
            }
        });
    }

    function onCreateIns(id) {
        dispatch({
            type: 'moduleModel/onCreateIns',
            payload: {
                moduleId: id,
            }
        });
    }

    function closeInsModal() {
        dispatch({
            type: 'moduleModel/closeInsModal',
        });
    }

    let comProps = {
        loading, total, pageIndex, pageSize, query, dataSource, selectedRowKeys,selectChange, pageChange, pageSizeChange,
        onCreate,onSearch,onUpdate,onConfig, onCreateIns,
    };

    let insPros = {
        instanceModalVisible,instanceModuleId,instanceUrl, onClose: closeInsModal,
    };
    return (
        <div>
            <ModuleComponent {...comProps} />
            <ModuleBaseFormPage />
            <ModuleConfigFormPage />
            <ModuleInstanceFormComponent {...insPros} />
        </div>
    );
}

function mapStateToProps({moduleModel}) {
  return {moduleModel};
}

export default connect(mapStateToProps)(ModulePage);
