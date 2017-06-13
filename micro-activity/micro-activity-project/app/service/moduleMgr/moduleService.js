module.exports = app => {
  class ModuleService extends app.Service {

    * queryList(params) {
        let {pageIndex,pageSize,searchKey} = params;
        try {
            const count_data = yield app.mysql.query('select count(1) as count from ma_module where status = 2 ');

            const results = yield this.app.mysql.select('ma_module', { // 搜索 post 表
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

      * saveModule(params) {
        let {id,name,intro,preview_img,expire_time,status,type} = params;
        try {
            const result = yield app.mysql.beginTransactionScope(function* (conn) {
                if(id != undefined && id != '') {
                    yield conn.update('ma_module', {
                      id,name,intro,preview_img,expire_time,status,type,modify_time: app.mysql.literals.now,
                  });
                } else {
                    yield conn.insert('ma_module', {
                      name,intro,preview_img,expire_time,status,type,create_time: app.mysql.literals.now,
                  });
                }

            }, this.ctx);

            return {
                errorCode: 9000,
                errorMessage: '请求成功',
            };
        } catch (err) {
          this.ctx.logger.error(err);
          return {
              errorCode: 5000,
              errorMessage: '保存模板出错啦',
              errorInfo: err,
          };
        }
    }

      * queryModuleById(params) {
        let {id} = params;
        try {

            const results = yield this.app.mysql.select('ma_module', {
              where: { id }, // WHERE 条件
              orders: [['id','desc'], ['status','desc']], // 排序方式
              limit: 1, // 返回数据量
              offset: 0, // 数据偏移量
            });

            if(results && results.length >0 ) {
                let moduleData = results[0];
                let page_instances = moduleData.page_instances;
                let page_instances_results = [];
                if(page_instances && page_instances.length > 0) {
                    let page_instances_arr = page_instances.split(',');

                    page_instances_results = yield this.app.mysql.select('ma_module_page_instance', {
                      where: { id: page_instances_arr, status: '2' }, // WHERE 条件
                      orders: [['id','desc'], ['status','desc']], // 排序方式
                    });
                }
                return {
                    errorCode: 9000,
                    errorMessage: '请求成功',
                    data: results[0],
                    results: page_instances_results,
                };
            } else {
                return {
                    errorCode: 5000,
                    errorMessage: '模板不存在或者已经被删除',
                };
            }
        } catch (err) {
          this.ctx.logger.error(err);
          return {
              errorCode: 5000,
              errorMessage: '查询模板页列表出错啦',
              errorInfo: err,
          };
        }
    }

       * saveModulePage(params) {
        let {moduleId, pageIns, } = params;
        try {
            const result = yield app.mysql.beginTransactionScope(function* (conn) {

                const module_list = yield app.mysql.select('ma_module', {
                  where: { id: moduleId, }, // WHERE 条件
                  limit: 1, // 返回数据量
                  offset: 0, // 数据偏移量
                });

                if(module_list.length == 0) {
                    return {
                        errorCode: 5000,
                        errorMessage: '模板不存在或已经删除',
                    };
                }

                let module_item = module_list[0];
                let page_ins_old = module_item.page_instances;
                if(page_ins_old && page_ins_old.length > 0) {
                    let page_ins_old_arr = page_ins_old.split(',');
                    for(let i = 0; i < page_ins_old_arr.length; i++) {
                        yield conn.update('ma_module_page_instance', {
                              id: page_ins_old_arr[i],
                              status: '0',
                         });
                    }
                }

                let pageInsArr = JSON.parse(pageIns);
                let pageInsIds = [];
                for(let i = 0; i < pageInsArr.length; i++) {
                    let pageInsItem = pageInsArr[i];
                    let pageInsId = yield conn.insert('ma_module_page_instance', {
                        name: pageInsItem.name,
                        page_id: pageInsItem.page_id,
                        component: pageInsItem.component,
                        type: pageInsItem.type,
                        preview_img: pageInsItem.preview_img,
                        config: JSON.stringify(pageInsItem.config),
                        status: '2',
                        create_time: app.mysql.literals.now,
                  });

                  pageInsIds.push(pageInsId.insertId);
                }

                 yield conn.update('ma_module', {
                      id: moduleId,
                      page_instances: pageInsIds.join(','),
                      modify_time: app.mysql.literals.now,
                 });

            }, this.ctx);

            return {
                errorCode: 9000,
                errorMessage: '请求成功',
            };
        } catch (err) {
          this.ctx.logger.error(err);
          return {
              errorCode: 5000,
              errorMessage: '保存模板出错啦',
              errorInfo: err,
          };
        }
    }

  }
  return ModuleService;
};
