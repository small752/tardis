import React from 'react';
import { connect } from 'dva';
import ModulePageComponent from '../../../components/module-mgr/module-page/ModulePageComponent';

function ModulePagePage({dispatch, modulePageModel, }) {

    let {loading, total, pageIndex, pageSize, query, dataSource, selectedRowKeys } = modulePageModel;

    function selectChange(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'modulePageModel/updateState',
            payload: {
                selectedRowKeys: selectedRowKeys,
            }
        });
    }
    function pageChange(pageIndex) {
        dispatch({
            type: 'modulePageModel/queryList',
            payload: {
                pageIndex: pageIndex-1,
            }
        });
    }

    /*每页显示数量变化*/
    function pageSizeChange(pageIndex, pageSize) {
        dispatch({
            type: 'modulePageModel/queryList',
            payload: {
                pageIndex: pageIndex-1,
                pageSize,
            }
        });
    }

    function onCreate() {
        dispatch({
            type: 'modulePageFormModel/openCreate',
        });
    }

    function onSearch(value) {
        dispatch({
            type: 'modulePageModel/queryList',
            payload: {
                query: {
                    searchKey: value
                }
            }
        });
    }

    let comProps = {
        loading, total, pageIndex, pageSize, query, dataSource, selectedRowKeys,selectChange, pageChange, pageSizeChange,onCreate,onSearch,
    };
    return (
        <ModulePageComponent {...comProps} />
    );
}

function mapStateToProps({modulePageModel}) {
  return {modulePageModel};
}

export default connect(mapStateToProps)(ModulePagePage);
