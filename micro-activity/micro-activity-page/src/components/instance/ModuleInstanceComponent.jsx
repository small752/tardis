import React from 'react';
import {Icon,Input,Spin,Tabs,Button,Form,Select,} from 'antd';
import MobileShowComponent from '../common/mobile-show/MobileShowComponent';
import styles from './ModuleInstanceComponent.less';

/*自定义的渲染组件*/

/*基础配置页面*/
import ConfigpageMobile from '../module-show/config-page/ConfigpageMobile';
import ConfigpageForm from '../module-show/config-page/ConfigpageForm';

/*父亲节模板第一页*/
import FatherModulePageOneMobile from '../module-show/father-page-one/FatherModulePageOneMobile';
import FatherModulePageOneForm from '../module-show/father-page-one/FatherModulePageOneForm';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

function ModuleInstanceComponent({
    loading,instanceId,moduleId,instancePageList,currentConfigKey, showRender, changePage, toRemovePage, toSave,
}) {

    /*获取手机渲染的组件*/
    function getMobileRenderCom() {
        let currentConfig = instancePageList.find(function(value,index) {
            return value.key == currentConfigKey;
        });
        let component = currentConfig && currentConfig.component;

        let compon = (<div>未定义的组件</div>);

        if(component == 'config-page') {
            compon = (
                <ConfigpageMobile data={currentConfig}/>
            );
        } else if(component == 'FatherModulePageOne') {
            compon = (
                <FatherModulePageOneMobile data={currentConfig} />
            );
        }
        return compon;
    }

    /*获取模板实例配置的组件*/
    function getInstanceConfigCom(data, index) {
        let compon = (<div>未定义的组件</div>);
        let {component} = data;
        let isLast = instancePageList && ((instancePageList.length-1) == index);
        if(component == 'config-page') {
            compon = (
                <ConfigpageForm data={data} type='instance' showRender={showRender} changePage={changePage}/>
            );
        } else if(component == 'FatherModulePageOne') {
            compon = (
                <FatherModulePageOneForm data={data} showRender={showRender} changePage={changePage} toRemovePage={toRemovePage} toSave={isLast && toSave} type='instance' />
            );
        }
        return compon;
    }

    return (
        <div className={styles.instance_config_page}>
            <div className={styles.instance_config_content}>

                <div className={styles.mobile_show_cont}>
                    <MobileShowComponent >
                        {getMobileRenderCom()}
                    </MobileShowComponent>
                </div>

                <div className={styles.form_config_cont}>
                   <Spin spinning={loading} tip='正在提交...'>
                    <Tabs activeKey={currentConfigKey} onChange={(pageKey)=>changePage('', pageKey)}  className='instance_config_tab_title' >
                        {instancePageList && instancePageList.map(function(ipItem, ipIndex) {
                            return (
                                <TabPane tab={ipItem.name} key={ipItem.key}>
                                    {getInstanceConfigCom(ipItem, ipIndex)}
                                </TabPane>
                            );
                        })}
                    </Tabs>
                    </Spin>
                </div>

            </div>
        </div>
    );
}

export default ModuleInstanceComponent;
