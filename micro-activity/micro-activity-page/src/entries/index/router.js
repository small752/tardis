import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect, } from 'dva/router';
import MainLayoutPage from '../../pages/common/layout/MainLayoutPage';
import ModulePagePage from '../../pages/index/module-page/ModulePagePage';
import ModulePage from '../../pages/index/module/ModulePage';
import ModulePurchasePage from '../../pages/index/module-purchase/ModulePurchasePage';
import ModuleInstanceMgrPage from '../../pages/index/instance-mgr/ModuleInstanceMgrPage.jsx';
import ModuleInstancePage from '../../pages/index/module-instance/ModuleInstancePage';
import InstanceH5Page from '../../pages/h5/instance/InstanceH5Page';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path='/' component={MainLayoutPage}>
        <IndexRedirect to='module_page_mgr'/>
        <Route path='module_page_mgr' component={ModulePagePage} />
        <Route path='module_mgr' component={ModulePage} />
        <Route path='instance_mgr' component={ModuleInstanceMgrPage} />
        <Route path='module_purchase_mgr' component={ModulePurchasePage} />
      </Route>

      <Route path='/instance' component={ModuleInstancePage} />
      <Route path='/instance_h5' component={InstanceH5Page} />
    </Router>
  );
}
