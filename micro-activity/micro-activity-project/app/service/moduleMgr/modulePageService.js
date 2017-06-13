module.exports = app => {
  class ModulePageService extends app.Service {

    * queryList(params) {
        let {pageIndex,pageSize,searchKey} = params;
        try {
            const count_data = yield app.mysql.query('select count(1) as count from ma_module_page where status = "2" ');

            const results = yield this.app.mysql.select('ma_module_page', { // 搜索 post 表
              where: { status: '2' }, // WHERE 条件
              orders: [['id','desc'], ['status','desc']], // 排序方式
              limit: pageSize, // 返回数据量
              offset: pageIndex * pageSize, // 数据偏移量
            });

            return {
                errorCode: 9000,
                errorMessage: '请求成功',
                data: {
                    pageIndex,pageSize,
                    total: count_data[0].count,
                },
                results,
            };
        } catch (err) {
          this.ctx.logger.error(err);
          return {
              errorCode: 5000,
              errorMessage: '查询模板页列表出错啦',
              errorInfo: err,
          };
        }
    }

      * queryPageComList(params) {

        try {

            const results = yield this.app.mysql.select('ma_module_page', { // 搜索 post 表
                where: { status: '2' }, // WHERE 条件
              orders: [['type', 'asc'],['id','desc']], // 排序方式
            });

            return {
                errorCode: 9000,
                errorMessage: '请求成功',
                results,
            };
        } catch (err) {
          this.ctx.logger.error(err);
          return {
              errorCode: 5000,
              errorMessage: '查询模板页列表出错啦',
              errorInfo: err,
          };
        }
    }

  }
  return ModulePageService;
};
