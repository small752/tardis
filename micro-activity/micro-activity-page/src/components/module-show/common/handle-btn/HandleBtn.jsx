import React from 'react';
import {Icon,Button,Popconfirm,} from 'antd';
import styles from './HandleBtn.less';

function HandleBtn({
   data, toPrevPage, toNextPage, toRemovePage, toSave,
}) {
    return (
        <div className={styles.form_page_handle_bars}>

           <div className={styles.top_btn_cont}>
               <Button className={styles.handle_bar_btn} size='large' type='ghost' onClick={toPrevPage} icon='double-left' />
                <Button className={styles.handle_bar_btn} size='large' type='ghost' onClick={toNextPage} icon='double-right' />
           </div>

            <div className={styles.page_btns_cont}>
               {!!(toRemovePage) &&
                <Popconfirm title="确定要删除当前页吗?" okText="确定" cancelText="取消" onConfirm={toRemovePage}>
                    <Button className={styles.handle_bar_btn} size='large' type='default' ><Icon type="delete" />删除</Button>
                </Popconfirm>
                }
                {!!(toSave) &&
                <Popconfirm title="确定要保存所有配置吗?" okText="确定" cancelText="取消" onConfirm={toSave}>
                    <Button className={styles.handle_bar_btn} size='large' type='primary' ><Icon type="cloud-upload-o" />保存</Button>
                </Popconfirm>
                }
            </div>

        </div>
    );
}

export default HandleBtn;
