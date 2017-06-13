import React from 'react';
import {Icon,Button,Form,Select,Popover,Modal,Input,} from 'antd';
import MobileShowComponent from '../../common/mobile-show/MobileShowComponent';
import styles from './PageConfigLayout.less';

/*自定义的渲染组件*/

/*基础配置页面*/
import ConfigpageMobile from '../../module-show/config-page/ConfigpageMobile';
import ConfigpageForm from '../../module-show/config-page/ConfigpageForm';

/*父亲节模板第一页*/
import FatherModulePageOneMobile from '../../module-show/father-page-one/FatherModulePageOneMobile';
import FatherModulePageOneForm from '../../module-show/father-page-one/FatherModulePageOneForm';

function PageConfigLayout({
    data, showRender, changePage,
}) {

    /*根据配置 渲染不同的组件*/
    function getMobileRenderCom(data) {
        let compon = (<div>未定义的组件</div>);
        let {component} = data;

        if(component == 'config-page') {
            compon = (
                <ConfigpageMobile data={data}/>
            );
        } else if(component == 'FatherModulePageOne') {
            compon = (
                <FatherModulePageOneMobile data={data} showRender={showRender} changePage={changePage}/>
            );
        }
        return compon;
    }

    function getFormRenderCom(data) {
        let compon = (<div>未定义的组件</div>);
        let {component} = data;

        if(component == 'config-page') {
            compon = (
                <ConfigpageForm data={data} showRender={showRender} changePage={changePage}/>
            );
        } else if(component == 'FatherModulePageOne') {
            compon = (
                <FatherModulePageOneForm data={data} showRender={showRender} changePage={changePage}/>
            );
        }
        return compon;
    }

    return (
        <div className={styles.module_page_config_content}>

            <div className={styles.mobile_show_cont}>
                <div className={styles.mobile_show_content}>
                    <MobileShowComponent >
                        {getMobileRenderCom(data)}
                    </MobileShowComponent>
                </div>
            </div>

            <div className={styles.config_form_cont} style={{width: 'calc(100% - 500px)'}}>
                {getFormRenderCom(data)}
            </div>

        </div>
    );
}

export default PageConfigLayout;
