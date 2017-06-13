module.exports = app => {
  app.post('/modules/upload/img', 'upload.img');
  app.post('/modules/upload/file', 'upload.file');
  app.post('/modules/modulePage/queryList', 'moduleMgr.modulePageController.queryList');
  app.post('/modules/modulePage/queryPageComList', 'moduleMgr.modulePageController.queryPageComList');

  app.post('/modules/module/queryList', 'moduleMgr.moduleController.queryList');
  app.post('/modules/module/queryModuleById', 'moduleMgr.moduleController.queryModuleById');
  app.post('/modules/module/saveModule', 'moduleMgr.moduleController.saveModule');
  app.post('/modules/module/saveModulePage', 'moduleMgr.moduleController.saveModulePage');

  app.post('/modules/instance/queryList', 'moduleMgr.instanceController.queryList');

  app.post('/modules/instance/queryInstanceById', 'moduleMgr.instanceController.queryInstanceById');
  app.post('/modules/instance/saveModuleInstance', 'moduleMgr.instanceController.saveModuleInstance');

};
