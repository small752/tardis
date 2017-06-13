const sendToWormhole = require('stream-wormhole');
const FormStream = require('formstream');
const fs = require('fs');
const uuid = require('node-uuid');

module.exports = app => {
  class UploadController extends app.Controller {
    * img() {
      // 文件处理，上传到云存储等等
      let result,fileStream, fileStream2;
      try {
          fileStream = yield this.ctx.getFileStream();
          const form = new FormStream();
          form.stream('file',fileStream, 'file.jpg');

          result = yield this.ctx.curl('http://115.29.172.104/gimg/upload', {
              method: 'post',
              headers: form.headers(),
              stream: form,
              dataType: 'json'
          });

          this.ctx.body = {
            errorCode: 9000,
            errorMessage: '上传图片成功',
            data: {
                url: result.data.url,
            }
          };
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        yield sendToWormhole(fileStream);
          this.ctx.body = {
            errorCode: 5000,
            errorMessage: '上传图片失败',
          };
      }

    }

      * file() {
      // 文件处理，上传到云存储等等
      let result,fileStream, fileStream2;
      try {

          fileStream = yield this.ctx.getFileStream();

          let uuidstr = uuid.v1();
          let uuidStr2 = uuidstr.replace(/-/g,'')

          let fileName = fileStream.filename;
          let writeStream = fs.createWriteStream('/home/tomcat/upload/' + uuidStr2 + '_' + fileName );
          fileStream.pipe(writeStream);

           const { baseUrl } = this.app.config.upload;

          this.ctx.body = {
            errorCode: 9000,
            errorMessage: '上传文件成功',
            data: {
                filePath: uuidStr2,
                fileName: fileName,
                url: baseUrl + '/upload/' + uuidStr2 + '_' + fileName,
            }
          };
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        yield sendToWormhole(fileStream);
        yield sendToWormhole(writeStream);
          this.ctx.body = {
            errorCode: 5000,
            errorMessage: '上传文件失败',
          };
      }

    }
  }
  return UploadController;
};
