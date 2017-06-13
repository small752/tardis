import React from 'react';
import {Icon} from 'antd';
import styles from './PageModal.less';

function PageModal({visible, title='标题', children, onClose, mockClose=false, width='60%', footer}) {

    return (
        <div className={visible ? 'form_modal_box form_modal_box_open' : 'form_modal_box form_modal_box_close'} >
          {!!visible && <div className={styles.form_modal_mock} onClick={mockClose?onClose:null}></div>}
          <div className={visible ? 'form_modal_page form_modal_page_active' : 'form_modal_page'} style={{width}}>
              <div className={styles.form_modal_header}>

                   <div className={styles.header_title_text}>
                       {title}
                   </div>

                   <div className={styles.header_close_btn} onClick={onClose}>
                       <FormModalCloseIcon />
                   </div>
               </div>

               <div className={styles.form_modal_content} style={footer ? {width: '100%', height: 'calc(100% - 80px)'} : {width: '100%', height: 'calc(100% - 30px)'}}>
                 <div className={styles.form_modal_warp}>
                     <div className={styles.form_modal_body}>
                          {children}
                      </div>
                 </div>
               </div>

               {!!footer &&
               <div className={styles.formal_modal_footer}>
                    {footer.map(function(footerItem, footerIndex) {
                         return (
                            <div className={styles.footer_item} key={'footer_item_' + footerIndex}>
                                {footerItem}
                             </div>
                        )
                     })}
               </div>
               }
          </div>

        </div>
    );
}

class FormModalCloseIcon extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
            iconType: 'close'
        };

        // ES6 类中函数必须手动绑定
        this.onHover = this.onHover.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    onHover() {
        this.setState({
            iconType: 'close-square'
        });
    }

    onMouseOut() {
        this.setState({
            iconType: 'close'
        });
    }

    render() {
        return (
            <Icon type={this.state.iconType} onMouseOver={this.onHover} onMouseOut={this.onMouseOut}/>
        );
    }
}

export default PageModal;
