import React from 'react';
import styles from './MobileShowComponent.less';

function MobileShowComponent({
    children
}) {

    return (
        <div className={styles.mobile_show_cont}
           style={{
                background: 'url(http://115.29.172.104/gimg/img/4693c8465348642727cf85efc7ed1f07) no-repeat',
                backgroundSize: 'cover',
            }}
           >
            <div className='common_mobile_show_content' >
                {children}
            </div>
        </div>
    );
}

export default MobileShowComponent;
