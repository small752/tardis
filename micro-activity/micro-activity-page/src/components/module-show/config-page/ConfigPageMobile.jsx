import React from 'react';
import styles from './ConfigPageMobile.less';

function ConfigPageMobile({
    data
}) {

    let {config} = data || {};
    try {
        if(config && config.length > 0 && typeof config == 'string') {
            config = JSON.parse(config);
        }
    } catch(err) {
        config = {};
    }

    return (
        <div className={styles.mobile_show_cont} >

            <div className={styles.share_head_img}>
                <img src='http://115.29.172.104/gimg/img/1efcc3cfdb7dd1d0676c2ace562d5fb9'/>
            </div>
            <div className={styles.share_cont}>
                <div className={styles.share_title}>
                    {config.share_title}
                </div>

                <div className={styles.share_content}>

                    <div className={styles.share_intro} style={{width: 'calc(100% - 50px)'}}>
                        {config.share_intro}
                    </div>

                    <div className={styles.share_img}>
                        <img src={config.share_img} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfigPageMobile;
