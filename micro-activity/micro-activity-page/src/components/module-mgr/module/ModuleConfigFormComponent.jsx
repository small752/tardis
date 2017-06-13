import React from 'react';
import {Icon,Tabs,Button,Tooltip,Form,Select,Popover,Modal,Input,Spin,} from 'antd';
import styles from './ModuleConfigFormComponent.less';
import PageModal from '../../common/page-modal/PageModal';
import PageConfigLayout from './PageConfigLayout';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function ModuleConfigFormComponent({
    visible, loading, moduleId, pageConfigList, pageConfigListSort, currentConfigKey, addPageVisible, pageComList,
    onClose, onAddPage, addPage, closePageModal, changePageIns,
    showRender, changePage, changePageSeqNo, onSaveSubmit,
}) {

    function getBtnItemHandle(seq_no, key) {
        let max_seq_no = 0;
        if(pageConfigList && pageConfigList.length > 0) {
            max_seq_no = pageConfigList[pageConfigList.length-1].index;
        }
        return (
            <div className={styles.btn_item_handle_cont}>
                {!!(seq_no != '0') && <a href='javascript:void(0)' className={styles.btn_item_handle_a} onClick={()=>changePageSeqNo(key, (seq_no-1))}>上移</a>}
                {!!(seq_no != max_seq_no) && <a href='javascript:void(0)' className={styles.btn_item_handle_a} onClick={()=>changePageSeqNo(key, (seq_no+1))}>下移</a>}
                <a href='javascript:void(0)' className={styles.btn_item_handle_a}>删除</a>
            </div>
        );
    }

    let addPageProps = {
        visible: addPageVisible,
        pageComList,
        handleSubmit: addPage,
        onClose: closePageModal,
    };

    return (
        <PageModal
           visible={visible}
           onClose={onClose}
           title='模板配置'
        >
           <Spin spinning={loading} tip='正在提交...'>
            <div className={styles.module_form_cont}>

                { /*模板页列表*/}
                <div className={styles.page_list_cont}>

                    <div className={styles.page_lsit_item}>
                        {pageConfigListSort && pageConfigListSort.length > 0 && pageConfigListSort.map(function(pageConfigItem, pageConfigIndex) {

                            return (
                                <Tooltip placement='right' title={getBtnItemHandle(pageConfigItem.seq_no, pageConfigItem.key)} key={'btn_item_tip_' + pageConfigIndex}>
                                    <Button
                                        key={'btn_item_cont_' + pageConfigIndex}
                                        icon={pageConfigItem.type == '0' ? 'share-alt' : 'file'}
                                        disabled={currentConfigKey == pageConfigItem.key}
                                        className={styles.btn_item_cont}
                                        style={{width: '100%'}}
                                        size='large'>
                                            {pageConfigItem.name}
                                        </Button>
                                </Tooltip>
                            )
                        })}
                        <Button icon="file-add" className={styles.btn_item_cont} size='large' type='primary' onClick={onAddPage}>增加一页</Button>
                        <Button icon="save" className={styles.btn_item_cont} size='large' type='primary' onClick={onSaveSubmit}>保存</Button>
                    </div>

                </div>

                { /*模板页配置界面*/ }
                <div className={styles.page_config_cont} style={{width: 'calc(100% - 200px)'}}>
                    <Tabs activeKey={currentConfigKey}  className='module_page_config_tab_title' >
                        {pageConfigListSort && pageConfigListSort.length > 0 && pageConfigListSort.map(function(pageConfigItem, pageConfigIndex) {

                            return (
                                <TabPane tab={pageConfigItem.name} key={pageConfigItem.key}>
                                    <PageConfigLayout data={pageConfigItem} showRender={showRender} changePage={changePage} />
                                </TabPane>
                            )
                        })}
                      </Tabs>
                </div>

            </div>
            </Spin>

            <AddPageModal_T {...addPageProps} />
        </PageModal>
    );
}

function AddPageModal({
    visible, handleSubmit, onClose, pageComList,
    form: {
        getFieldDecorator,
        getFieldValue,
        getFieldsValue,
        setFieldsValue,
        validateFields,
        resetFields,
        validateFieldsAndScroll
    }
}) {

    function handleOk() {
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }
            handleSubmit && handleSubmit(values, onCloseClick);
        });
    }

    function onCloseClick() {
        resetFields();
        onClose && onClose();
    }

    let formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };

    return (
        <Modal
             title='添加模板页'
             visible={visible}
             okText='保存'
             onOk={handleOk}
             cancelText='取消'
             onCancel={onCloseClick}
             closable={true}
             maskClosable={false}
        >
            <div className={styles.add_page_cont}>
                <Form>

                    <FormItem
                      {...formItemLayout}
                      label='模板页'
                    >
                    {getFieldDecorator('page_id', {
                        rules: [
                            { required: true, message: '请选择模板页', },
                        ],
                      })(
                            <Select
                               placeholder="请选择模板页"
                               allowClear
                               style={{width: '100%'}}
                               notFoundContent='没有模板页'>
                                {pageComList && pageComList.map(function(item) {
                                    let popContent = (
                                        <img src={item.preview_img} width='200px' />
                                    );
                                    return (
                                        <Option key={item.id+''} value={item.id+''}>
                                            <Popover content={popContent} title={null} trigger="hover" placement='right'>
                                                <div>{item.name}</div>
                                            </Popover>
                                        </Option>
                                    );
                                })}
                            </Select>
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label='模板名称'
                    >
                    {getFieldDecorator('page_ins_name', {
                        rules: [
                            { required: true, message: '请输入模板页名称', },
                            { max: 20, message: '限20汉字以内', },
                        ],
                      })(
                        <Input placeholder={'请输入模板页名称'}/>
                      )}
                    </FormItem>
                </Form>
            </div>
        </Modal>
    );
}

const AddPageModal_T = Form.create()(AddPageModal);

export default ModuleConfigFormComponent;
