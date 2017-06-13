module.exports = app => {
  class InstanceService extends app.Service {

      * queryList(params) {
        let {pageIndex,pageSize,searchKey} = params;
        try {
            const count_data = yield app.mysql.query('select count(1) as count from ma_instance where status = "2" ');

            const results = yield this.app.mysql.select('ma_instance', { // 搜索 post 表
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
              errorMessage: '查询模板实例列表出错啦',
              errorInfo: err,
          };
        }
    }

      * saveModuleInstance(params) {
        let {instanceId,moduleId,instancePageList} = params;
        try {
            const result = yield app.mysql.beginTransactionScope(function* (conn) {

                //存储新的 实例的页 配置项
                let pageInsArr = JSON.parse(instancePageList);
                let pageInsIds = [];
                for(let i = 0; i < pageInsArr.length; i++) {
                    let pageInsItem = pageInsArr[i];
                    let pageInsId = yield conn.insert('ma_instance_page', {
                        page_id: pageInsItem.page_id,
                        name: pageInsItem.name,
                        component: pageInsItem.component,
                        type: pageInsItem.type,
                        config: JSON.stringify(pageInsItem.config),
                        status: '2',
                        create_time: app.mysql.literals.now,
                  });

                  pageInsIds.push(pageInsId.insertId);
                }

                if(instanceId != undefined && instanceId != '') {
                    //修改 实例

                    const instance_list = yield app.mysql.select('ma_instance', {
                      where: { id: instanceId, }, // WHERE 条件
                      limit: 1, // 返回数据量
                      offset: 0, // 数据偏移量
                    });

                    if(instance_list.length == 0) {
                        return {
                            errorCode: 5000,
                            errorMessage: '模板实例不存在或已经删除',
                        };
                    }

                    let instance_item = instance_list[0];
                    let page_ins_old = instance_item.ins_pages;
                    if(page_ins_old && page_ins_old.length > 0) {
                        let page_ins_old_arr = page_ins_old.split(',');
                        for(let i = 0; i < page_ins_old_arr.length; i++) {
                            yield conn.delete('ma_instance_page', {
                                  id: page_ins_old_arr[i],
                             });
                        }
                    }

                    yield conn.update('ma_instance', {
                      id: instanceId,ins_pages: pageInsIds.join(','),modify_time: app.mysql.literals.now,
                    });
                } else {
                    //新增实例
                    yield conn.insert('ma_instance', {
                      module_id: moduleId,ins_pages: pageInsIds.join(','),views: 0,status: '2',create_time: app.mysql.literals.now,
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

      * queryInstanceById(params) {
        let {id} = params;
        try {

            const results = yield this.app.mysql.select('ma_instance', {
              where: { id }, // WHERE 条件
              orders: [['id','desc'], ['status','desc']], // 排序方式
              limit: 1, // 返回数据量
              offset: 0, // 数据偏移量
            });

            if(results && results.length >0 ) {
                let moduleData = results[0];
                let page_instances = moduleData.ins_pages;
                let page_instances_results = [];
                if(page_instances && page_instances.length > 0) {
                    let page_instances_arr = page_instances.split(',');

                    page_instances_results = yield this.app.mysql.select('ma_instance_page', {
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
                    errorMessage: '模板实例不存在或者已经被删除',
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


  }
  return InstanceService;
};
