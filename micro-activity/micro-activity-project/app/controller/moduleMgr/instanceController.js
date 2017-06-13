'use strict';

module.exports = app => {
  class InstanceController extends app.Controller {

      /*查询模板列表*/
    * queryList() {

          const ctx = this.ctx;

          const pageIndex = ctx.request.body.pageIndex || 0;
          const pageSize = ctx.request.body.pageSize || 10;
          const searchKey = ctx.request.body.searchKey || '';
          const params = {
              pageIndex,pageSize,searchKey,
          };
          const ret = yield ctx.service.moduleMgr.instanceService.queryList(params);
          this.ctx.body = ret;
    }

  /*保存模板基本信息*/
  * saveModuleInstance() {
          const ctx = this.ctx;

          let {instanceId,moduleId,instancePageList} = ctx.request.body;
          const params = {
              instanceId,moduleId,instancePageList,
          };
          const ret = yield ctx.service.moduleMgr.instanceService.saveModuleInstance(params);
          this.ctx.body = ret;
    }

    /*根据编号查询模板*/
    * queryInstanceById() {

          const ctx = this.ctx;

          let {id} = ctx.request.body;
          const params = {
              id
          };
          const ret = yield ctx.service.moduleMgr.instanceService.queryInstanceById(params);
          this.ctx.body = ret;
    }

  }
  return InstanceController;
};
