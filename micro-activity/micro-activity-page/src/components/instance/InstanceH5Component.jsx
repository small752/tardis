import React from 'react';
import styles from './InstanceH5Component.less';

import '../../utils/swiper-3.4.1.min.js';
import '../../utils/swiper-3.4.1.min.css';

/*自定义的渲染组件*/

/*父亲节模板第一页*/
import FatherModulePageOneMobile from '../module-show/father-page-one/FatherModulePageOneMobile';

function InstanceH5Component({
    loading,instanceId,instancePageList,currentIndex,configData,musicState,changeMusicState,
}) {

    /*获取手机渲染的组件*/
    function getMobileRenderCom(currentConfig) {

        let component = currentConfig && currentConfig.component;

        let compon = (<div>未定义的组件</div>);

        if(component == 'FatherModulePageOne') {
            compon = (
                <FatherModulePageOneMobile data={currentConfig} currentIndex={currentIndex} />
            );
        }
        return compon;
    }

    let {config} = configData;
    let music = (config && config.music) || {};

    function switchMusic() {
        let music = document.getElementById('common_activity_music_audio');
        let musicState = 'stop';
        if(music!==null){
            if(music.paused){
                music.play();
                musicState = 'run';
            } else {
                music.pause();
                musicState = 'stop';
            }
        }

        changeMusicState(musicState);
    }

    return (
        <div className={styles.instance_h5_page}>
            <div className={styles.instance_h5_content}>
               <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {instancePageList && instancePageList.map(function(ipItem, ipIndex) {
                            return (
                                <div className='common_instance_h5_page_item swiper-slide' key={'h5_page_item_' + ipIndex} >
                                   {getMobileRenderCom(ipItem)}
                                </div>
                            );
                        })}
                   </div>
                   <div className="swiper-scrollbar"></div>
                </div>
            </div>

            <div onClick={() => switchMusic()} className={musicState=='stop' ? styles.music_switch_cont_stop : styles.music_switch_cont_run} ></div>
            <audio loop autoPlay height="0" width="0" hidden="true" src={music.url} id='common_activity_music_audio'></audio>
        </div>
    );
}

export default InstanceH5Component;
