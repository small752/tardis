'use strict';

module.exports = app => {
  class ModulePageController extends app.Controller {
    * queryList() {

          const ctx = this.ctx;

          const pageIndex = ctx.request.body.pageIndex || 0;
          const pageSize = ctx.request.body.pageSize || 10;
          const searchKey = ctx.request.body.searchKey || '';
          const params = {
              pageIndex,pageSize,searchKey,
          };
          const ret = yield ctx.service.moduleMgr.modulePageService.queryList(params);
          this.ctx.body = ret;
    }

      * queryPageComList() {
          const ctx = this.ctx;
          const ret = yield ctx.service.moduleMgr.modulePageService.queryPageComList();
          this.ctx.body = ret;
    }
  }
  return ModulePageController;
};
