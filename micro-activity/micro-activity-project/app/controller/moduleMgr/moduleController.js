'use strict';

module.exports = app => {
  class ModuleController extends app.Controller {

    /*查询模板列表*/
    * queryList() {

          const ctx = this.ctx;

          const pageIndex = ctx.request.body.pageIndex || 0;
          const pageSize = ctx.request.body.pageSize || 10;
          const searchKey = ctx.request.body.searchKey || '';
          const params = {
              pageIndex,pageSize,searchKey,
          };
          const ret = yield ctx.service.moduleMgr.moduleService.queryList(params);
          this.ctx.body = ret;
    }

  /*保存模板基本信息*/
  * saveModule() {

          const ctx = this.ctx;

          let {id,name,intro,preview_img,expire_time,status,type} = ctx.request.body;
          const params = {
              id,name,intro,preview_img,expire_time,status,type
          };
          const ret = yield ctx.service.moduleMgr.moduleService.saveModule(params);
          this.ctx.body = ret;
    }

    /*根据编号查询模板*/
    * queryModuleById() {

          const ctx = this.ctx;

          let {id} = ctx.request.body;
          const params = {
              id
          };
          const ret = yield ctx.service.moduleMgr.moduleService.queryModuleById(params);
          this.ctx.body = ret;
    }

      /*模板页配置保存*/
      * saveModulePage() {

          const ctx = this.ctx;

          let {moduleId, pageIns, } = ctx.request.body;
          const params = {
              moduleId, pageIns,
          };
          const ret = yield ctx.service.moduleMgr.moduleService.saveModulePage(params);
          this.ctx.body = ret;
    }
  }
  return ModuleController;
};
