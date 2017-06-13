import React from 'react';
import {Form,Input,Upload,Icon,Button,} from 'antd';
import styles from './FatherModulePageOneForm.less';
import HandleBtn from '../common/handle-btn/HandleBtn';

const FormItem = Form.Item;

/*
 * data 页面数据
 * type 页面类型 默认是模板配置页， module 是模板配置页   instance 实例配置页
 */
function FatherModulePageOneForm({
    data, type, showRender, changePage, toRemovePage, toSave,
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
    type = (type == undefined || type == '') ? 'module' : type;
    let formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };

    let {config} = data;
    try {
        if(config && config.length > 0 && typeof config == 'string') {
            config = JSON.parse(config);
        }
    } catch(err) {
        config = {};
    }

    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    /*校验图片*/
    function imageBeforeUpload(file) {
		if(file.size > 5242880) {
			message.error('文件大小过大,请选择小于5M的文件');
			return false;
		}
		return true;
    }

    let imgUploadBtnProps = {
        action: BASE_URL+'/upload/img',
        listType: 'picture-card',
        beforeUpload : imageBeforeUpload,
        withCredentials: true,//上传请求时是否携带 cookie
    };

    function toPrevPage() {
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }

            changePage && changePage(data.seq_no-1);
        });
    }

    function toNextPage() {
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }
            changePage && changePage(data.seq_no + 1);
        });
    }

    function toFileList(imgStr) {
        let fileList = [];
        if(imgStr && imgStr.length > 0) {
            if(typeof imgStr == 'string') {
                let imgArr = imgStr.split(',');
                imgArr && imgArr.map(function(item, index) {
                    fileList.push({
                        uid: index*-1,
                        name: 'img_' + index,
                        status: 'done',
                        url: item,
                    });
                });
            } else {
                fileList = imgStr;
            }
        }
        return fileList;
    }

    function handleRemovePage() {
        toRemovePage && toRemovePage(data.key);
    }

    return (
        <div className={styles.form_page_cont} >
            <Form>

                <FormItem
                  {...formItemLayout}
                  label='默认标题'
                >
                {getFieldDecorator('title', {
                    initialValue: config && config.title,
                    rules: [
                        { required: true, message: '请输入模板标题', },
                        { max: 10, message: '限10汉字以内', },
                    ],
                  })(
                    <Input placeholder={'请输入标题默认值'} />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label='默认的副标题'
                >
                {getFieldDecorator('intro', {
                    initialValue: config && config.intro,
                    rules: [
                        { required: true, message: '请输入默认的副标题', },
                        { max: 60, message: '限60汉字以内', },
                    ],
                  })(
                    <Input type="textarea" placeholder={'请输入默认的副标题'} autosize={{ minRows: 2, maxRows: 4 }} />
                  )}
                </FormItem>

                <FormItem
                      {...formItemLayout}
                      label='Logo图片'
                    >
                    {getFieldDecorator('logo', {
                        initialValue: config && config.logo && toFileList(config.logo),
                        rules: [{
                          required: true, message: '请选择Logo图片',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...imgUploadBtnProps} >
                             {(getFieldValue('logo') && getFieldValue('logo').length > 0) ?
                                null
                                :
                                <div>
                                    <Icon type="plus" />
                                    <div className={styles.img_upload_text}>选择Logo图片</div>
                                </div>
                             }
                        </Upload>
                      )}
                </FormItem>

               {!!(type == 'module') &&
                <FormItem
                      {...formItemLayout}
                      label='背景图片'
                    >
                    {getFieldDecorator('bg_img', {
                        initialValue: config && config.bg_img && toFileList(config.bg_img),
                        rules: [{
                          required: true, message: '请选择背景图片',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...imgUploadBtnProps} >
                             {(getFieldValue('bg_img') && getFieldValue('bg_img').length > 0) ?
                                null
                                :
                                <div>
                                    <Icon type="plus" />
                                    <div className={styles.img_upload_text}>选择背景图片</div>
                                </div>
                             }
                        </Upload>
                      )}
                </FormItem>
                }

               {!!(type == 'module') &&
                <FormItem
                      {...formItemLayout}
                      label='动画图片'
                    >
                    {getFieldDecorator('anim_img', {
                        initialValue: config && config.anim_img && toFileList(config.anim_img),
                        rules: [{
                          required: true, message: '请选择动画图片',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...imgUploadBtnProps} >
                             {(getFieldValue('anim_img') && getFieldValue('anim_img').length > 0) ?
                                null
                                :
                                <div>
                                    <Icon type="plus" />
                                    <div className={styles.img_upload_text}>选择动画图片</div>
                                </div>
                             }
                        </Upload>
                      )}
                </FormItem>
                }

                   <HandleBtn toPrevPage={toPrevPage} toNextPage={toNextPage} toRemovePage={toRemovePage && handleRemovePage} toSave={toSave} data={data}/>
            </Form>
        </div>
    );
}

function onValuesChange(props, values) {
    //触发改变model里的值
    let {data,showRender} = props;
    let {
        bg_img,logo,anim_img,
    } = values;

    if(logo && logo.length > 0) {
        let img_file = logo[0];
        if(img_file && img_file.response && img_file.response.errorCode == '9000' && img_file.response.data) {
            values.logo = img_file.response.data.url;
        }
    }

    if(bg_img && bg_img.length > 0) {
        let img_file = bg_img[0];
        if(img_file && img_file.response && img_file.response.errorCode == '9000' && img_file.response.data) {
            values.bg_img = img_file.response.data.url;
        }
    }

    if(anim_img && anim_img.length > 0) {
        let img_file = anim_img[0];
        if(img_file && img_file.response && img_file.response.errorCode == '9000' && img_file.response.data) {
            values.anim_img = img_file.response.data.url;
        }
    }

    showRender && showRender(data.key, values);
}

export default Form.create({onValuesChange})(FatherModulePageOneForm);
