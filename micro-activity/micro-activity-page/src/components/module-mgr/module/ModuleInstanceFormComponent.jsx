import React from 'react';
import styles from './ModuleInstanceFormComponent.less';
import PageModal from '../../common/page-modal/PageModal';


function ModuleInstanceFormComponent({
    instanceModalVisible, instanceId, instanceModuleId, instanceUrl, onClose,
}) {

    let iframe_src = '';
    if(instanceId == undefined || instanceId == '') {
        iframe_src = instanceUrl + '?moduleId='+instanceModuleId;
    } else {
        iframe_src = instanceUrl + '?instanceId='+instanceId;
    }
    return (
        <PageModal
           visible={instanceModalVisible}
           onClose={onClose}
           title='实例创建'
        >
            <div className={styles.module_instance_cont}>
                {!!instanceModalVisible &&
                   <iframe
                        src = {iframe_src}
                        frameBorder="0"
                        width="100%"
                        height="100%"
                        marginHeight="0"
                        marginWidth="0"
                        scrolling="auto" >
                    </iframe>
                }
            </div>
        </PageModal>
    );
}


export default ModuleInstanceFormComponent;
