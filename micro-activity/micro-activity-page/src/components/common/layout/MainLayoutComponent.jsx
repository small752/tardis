import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import styles from './MainLayoutComponent.less';

function MainLayoutComponent ({
    children,
    currentMenuKey,
    allMenuList,
    menuItemClick,
    collapsed,
    changeCollapsed,
}) {

    return (
        <Layout className={styles.main_layout}>
          <Sider
            collapsible
            breakpoint="lg"
            width='160'
            collapsedWidth="50"
            onCollapse={(collapsed, type) => changeCollapsed(collapsed, type)}
            style={{overflowY: 'auto'}}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['module_page_mgr']} onClick={menuItemClick} inlineIndent={16}>
              <Menu.Item key="module_page_mgr">
                <Icon type="user" />
                  {!!collapsed && <span className="nav-text">模板页管理</span>}
              </Menu.Item>
              <Menu.Item key="module_mgr">
                <Icon type="video-camera" />
                {!!collapsed && <span className="nav-text">模板管理</span>}
              </Menu.Item>
              <Menu.Item key="instance_mgr">
                <Icon type="picture" />
                {!!collapsed && <span className="nav-text">实例管理</span>}
              </Menu.Item>
              <Menu.Item key="module_purchase_mgr">
                <Icon type="upload" />
                {!!collapsed && <span className="nav-text">模板购买管理</span>}
              </Menu.Item>
              <Menu.Item key="module_instance_mgr">
                <Icon type="user" />
                {!!collapsed && <span className="nav-text">模板实例管理</span>}
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <div style={{ padding: 20, background: '#fff', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
                {children}
              </div>
            </Content>

          </Layout>
        </Layout>
    );
}

export default MainLayoutComponent;
