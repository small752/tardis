import React from 'react';
import { connect } from 'dva';
import ModuleInstanceMgrComponent from '../../../components/module-mgr/instance-mgr/ModuleInstanceMgrComponent';
import ModuleInstanceFormComponent from '../../../components/module-mgr/module/ModuleInstanceFormComponent';

function ModuleInstanceMgrPage({dispatch, moduleInstanceMgrModel, }) {

    let {
        loading, total, pageIndex, pageSize, query, dataSource, selectedRowKeys,
        instanceModalVisible,instanceInstanceId,instanceUrl,
    } = moduleInstanceMgrModel;

    function selectChange(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'moduleInstanceMgrModel/updateState',
            payload: {
                selectedRowKeys: selectedRowKeys,
            }
        });
    }

    function pageChange(pageIndex) {
        dispatch({
            type: 'moduleInstanceMgrModel/queryList',
            payload: {
                pageIndex: pageIndex-1,
            }
        });
    }

    /*每页显示数量变化*/
    function pageSizeChange(pageIndex, pageSize) {
        dispatch({
            type: 'moduleInstanceMgrModel/queryList',
            payload: {
                pageIndex: pageIndex-1,
                pageSize,
            }
        });
    }

    function onUpdate(id) {
        dispatch({
            type: 'moduleInstanceMgrModel/onUpdateIns',
            payload: {
                instanceId: id,
            }
        });
    }

    function onSearch(value) {
        dispatch({
            type: 'moduleInstanceMgrModel/queryList',
            payload: {
                query: {
                    searchKey: value
                }
            }
        });
    }

    function closeInsModal() {
        dispatch({
            type: 'moduleInstanceMgrModel/closeInsModal',
        });
    }

    let comProps = {
        loading, total, pageIndex, pageSize, query, dataSource, selectedRowKeys,selectChange, pageChange, pageSizeChange,
        onSearch,onUpdate,
    };

    let insPros = {
        instanceModalVisible,instanceId: instanceInstanceId,instanceUrl, onClose: closeInsModal,
    };
    return (
        <div>
            <ModuleInstanceMgrComponent {...comProps} />
            <ModuleInstanceFormComponent {...insPros} />
        </div>
    );
}

function mapStateToProps({moduleInstanceMgrModel}) {
  return {moduleInstanceMgrModel};
}

export default connect(mapStateToProps)(ModuleInstanceMgrPage);
