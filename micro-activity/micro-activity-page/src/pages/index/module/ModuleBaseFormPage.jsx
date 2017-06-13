import React from 'react';
import { connect } from 'dva';
import ModuleBaseFormComponent from '../../../components/module-mgr/module/ModuleBaseFormComponent';

function ModuleBaseFormPage({dispatch, moduleBaseFormModel, }) {

    let {visible,loading,formType,formData,} = moduleBaseFormModel;

    function onClose() {
        dispatch({
            type: 'moduleBaseFormModel/onClose',
        });
    }

    function handleSubmit(params, onCloseClick) {
        dispatch({
            type: 'moduleBaseFormModel/handleSubmit',
            payload: {
                ...params,onCloseClick,
            }
        });
    }

    let comProps = {
        visible,loading,formType,formData,onClose,handleSubmit,
    };
    return (
        <div>
            <ModuleBaseFormComponent {...comProps} />
        </div>
    );
}

function mapStateToProps({moduleBaseFormModel}) {
  return {moduleBaseFormModel};
}

export default connect(mapStateToProps)(ModuleBaseFormPage);
