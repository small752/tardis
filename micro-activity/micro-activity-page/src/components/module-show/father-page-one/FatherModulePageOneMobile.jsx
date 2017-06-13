import React from 'react';
import styles from './FatherModulePageOneMobile.less';

function FatherModulePageOneMobile({
    data, currentIndex,
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

            <div className={styles.p_content}
               style={{
                    backgroundImage: 'url(' + config.bg_img +')',
                }}
               >
                <div className={styles.logo_cont}>
                    <img src={config.logo} />
                </div>

                <div className={styles.title_cont}>
                    <div className={styles.title_text}
                       style={{
                            backgroundImage: 'url(http://115.29.172.104/gimg/img/576bac5b2c2a632428113605ff86ab0c)',
                        }}>
                        {config.title || '标题'}
                    </div>
                </div>

                <div className={styles.intro_cont}>
                    <div className={styles.intro_text}>
                        {config.intro || '副标题'}
                    </div>
                </div>

                <div className={styles.anim_img} style={(currentIndex == undefined || currentIndex == data.index) ? {transform: 'translate(0)'} : {transform: 'translate(100%)'}}>
                    <img src={config.anim_img} />
                </div>
            </div>

        </div>
    );
}

export default FatherModulePageOneMobile;
