import React from 'react';
import {Form,Input,Upload,Icon,Button,Radio,} from 'antd';
import styles from './ConfigPageForm.less';
import HandleBtn from '../common/handle-btn/HandleBtn';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

function ConfigPageForm({
    data, type, showRender, changePage,
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
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
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

    let uploadBtnProps = {
        action: BASE_URL+'/upload/file',
        beforeUpload : imageBeforeUpload,
        withCredentials: true,//上传请求时是否携带 cookie
    };

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

            changePage && changePage(-1);
        });
    }

    function toNextPage() {
        validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }
            changePage && changePage(1);
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

    function musicObjToList(musicObj) {
        let fileList = [];

        if(typeof musicObj == 'object') {
            fileList.push({
                uid: -1,
                name: musicObj.fileName,
                status: 'done',
                url: musicObj.url,
            });
        } else {
            fileList = musicObj;
        }
        return fileList;
    }

    return (
        <div className={styles.form_page_cont} >
            <Form>

                <FormItem
                  {...formItemLayout}
                  label='模板的默认名称'
                  help='模板的默认名称'
                >
                {getFieldDecorator('name', {
                    initialValue: config && config.name,
                    rules: [
                        { required: true, message: '请输入模板名称', },
                        { max: 10, message: '限10汉字以内', },
                    ],
                  })(
                    <Input placeholder={'请输入模板名称默认值'} />
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label='模板默认的背景音乐'
                >
                {getFieldDecorator('music', {
                    initialValue: config && config.music && musicObjToList(config.music),
                    rules: [
                        { required: true, message: '请输入背景音乐', },
                    ],
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  })(
                    <Upload {...uploadBtnProps} >
                         {(getFieldValue('music') && getFieldValue('music').length > 0) ?
                            null
                            :
                            <Button>
                              <Icon type="upload" /> 选择Mp3文件
                            </Button>
                         }
                    </Upload>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label='模板默认的分享标题'
                  help='模板的默认分享标题,不超过10字'
                >
                {getFieldDecorator('share_title', {
                    initialValue: config && config.share_title,
                    rules: [
                        { required: true, message: '请输入模板默认的分享标题', },
                        { max: 10, message: '限10汉字以内', },
                    ],
                  })(
                    <Input placeholder={'请输入模板默认的分享标题'} />
                  )}
                </FormItem>

                <FormItem
                      {...formItemLayout}
                      label='模板默认的分享图片'
                    >
                    {getFieldDecorator('share_img', {
                        initialValue: config && config.share_img && toFileList(config.share_img),
                        rules: [{
                          required: true, message: '请选择模板默认的分享图片',
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: normFile,
                      })(
                        <Upload {...imgUploadBtnProps} >
                             {(getFieldValue('share_img') && getFieldValue('share_img').length > 0) ?
                                null
                                :
                                <div>
                                    <Icon type="plus" />
                                    <div className={styles.img_upload_text}>选择分享图片</div>
                                </div>
                             }
                        </Upload>
                      )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label='模板默认的分享简介'
                  help='模板的默认分享简介,不超过50字'
                >
                {getFieldDecorator('share_intro', {
                    initialValue: config && config.share_intro,
                    rules: [
                        { required: true, message: '请输入模板默认的分享标题', },
                        { max: 50, message: '限50汉字以内', },
                    ],
                  })(
                    <Input type="textarea" placeholder={'请输入模板默认的分享简介'} autosize={{ minRows: 2, maxRows: 4 }} />
                  )}
                </FormItem>

                {!!(type == 'module') &&
                <FormItem
                  {...formItemLayout}
                  label='页面切换效果'
                >
                {getFieldDecorator('switch_type', {
                    initialValue: (config && config.switch_type) || 'style_1',
                  })(
                    <RadioGroup >
                        <Radio className={styles.switch_type_item} value={'type_1'}>3D流</Radio>
                        <Radio className={styles.switch_type_item} value={'type_2'}>3D翻转</Radio>
                        <Radio className={styles.switch_type_item} value={'type_3'}>卡片流</Radio>
                        <Radio className={styles.switch_type_item} value={'type_4'}>平滑滚动</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
                }

                <HandleBtn toPrevPage={toPrevPage} toNextPage={toNextPage} data={data}/>
            </Form>
        </div>
    );
}

function onValuesChange(props, values) {
    //触发改变model里的值
    let {data,showRender} = props;
    let {
        share_img,music,
    } = values;

    if(share_img && share_img.length > 0) {
        let img_file = share_img[0];
        if(img_file && img_file.response && img_file.response.errorCode == '9000' && img_file.response.data) {
            values.share_img = img_file.response.data.url;
        }
    }

    if(music && music.length > 0) {
        let music_file = music[0];
        if(music_file && music_file.response && music_file.response.errorCode == '9000' && music_file.response.data) {
            values.music = {
                fileName: music_file.response.data.fileName,
                url: music_file.response.data.url,
            };
        }
    }
    showRender && showRender(data.key, values);
}

export default Form.create({onValuesChange})(ConfigPageForm);
