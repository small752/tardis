import React from 'react';
import {Icon,Tabs,Modal,Form,Upload,Input,Radio,DatePicker,Spin,} from 'antd';
import styles from './ModuleBaseFormComponent.less';
import moment from 'moment';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;

function ModuleBaseFormComponent({
    visible,loading,formType,formData,onClose,handleSubmit,
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

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    /*校验图片*/
    function imageBeforeUpload(file) {
		if(file.size > 5242880) {
			message.error('图片大小过大,请选择小于5M的图片');
			return false;
		}
		return true;
    }

    let uploadBtnProps = {
        action: BASE_URL+'/upload/img',
        listType: 'picture-card',
        beforeUpload : imageBeforeUpload,
        withCredentials: true,//上传请求时是否携带 cookie
    };

    /*模板过期时间限制*/
    function disabledTime(dateValue) {
        if(dateValue) {
            let today_begin = moment(moment().format('YYYY-MM-DD') + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss');
            return dateValue < today_begin;
        }
	    return false;
    }

    return (
        <Modal
             title={formType=='1'?'创建模板':'修改模板'}
             visible={visible}
             okText='保存'
             onOk={handleOk}
             cancelText='取消'
             onCancel={onCloseClick}
             closable={true}
             maskClosable={false}
        >
            <div className={styles.module_base_info_form_cont}>
               <Spin spinning={loading} tip='正在提交中...'>
                <Form>
                   {getFieldDecorator('id', {
                        initialValue: formData && formData.id,
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem
                      {...formItemLayout}
                      label='模板名称'
                    >
                    {getFieldDecorator('name', {
                        initialValue: formData && formData.name,
                        rules: [
                            { required: true, message: '请输入模板名称', },
                            { max: 20, message: '限20汉字以内', },
                        ],
                      })(
                        <Input placeholder={'请输入模板名称'}/>
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label='模板描述'
                    >
                    {getFieldDecorator('intro', {
                        initialValue: formData && formData.intro,
                      })(
                        <Input type="textarea" placeholder = { '请输入模板描述' } autosize={{ minRows: 2, maxRows: 3 }}  />
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label='模板预览'
                    >
                    {getFieldDecorator('preview_img', {
                        initialValue: formData && formData.preview_img,
                        rules: [{
                          required: true, message: '请选择模板预览图片',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...uploadBtnProps} >
                             {(getFieldValue('preview_img') && getFieldValue('preview_img').length > 0) ?
                                null
                                :
                                <div>
                                    <Icon type="plus" />
                                    <div className={styles.img_upload_text}>选择模板预览</div>
                                </div>
                             }
                        </Upload>
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label='模板到期时间'
                    >
                    {getFieldDecorator('expire_time', {
                        initialValue: (formData && formData.expire_time) || moment('2099-12-31 00:00:00', 'YYYY-MM-DD HH:mm:ss'),
                        rules: [{
                          required: true, message: '请选择模板到期时间',
                        }],
                      })(
                        <DatePicker
                            showTime
                            disabledDate={disabledTime}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择模板到期时间"
                            style={{width : '100%'}}
                        />
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label='模板类型'
                    >
                    {getFieldDecorator('type', {
                        initialValue: (formData && formData.type) || '1',
                        rules: [{
                          required: true, message: '请选择模板类型',
                        }],
                      })(
                        <RadioGroup>
                            <Radio value='1'>微活动</Radio>
                            <Radio value='2'>微传单</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label='状态'
                    >
                    {getFieldDecorator('status', {
                        initialValue: (formData && formData.status) || '2',
                        rules: [{
                          required: true, message: '请选择模板状态',
                        }],
                      })(
                        <RadioGroup>
                            <Radio value='2'>上架</Radio>
                            <Radio value='1'>下架</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>

                </Form>
                </Spin>
            </div>
        </Modal>
    );
}

export default Form.create()(ModuleBaseFormComponent);
