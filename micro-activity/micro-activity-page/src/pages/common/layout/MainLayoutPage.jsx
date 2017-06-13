import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import MainLayoutComponent from '../../../components/common/layout/MainLayoutComponent';

function MainLayoutPage({dispatch, children, location, layoutModel}) {

    let {currentMenuKey, allMenuList, collapsed, } = layoutModel;
    let {pathname} = location;

    function menuItemClick({key, keyPath}) {
        dispatch(routerRedux.push({
            pathname: key,
        }));
    }

    function changeCollapsed(collapsed, type) {
        dispatch({
            type: 'layoutModel/updateState',
            payload: {
                collapsed: !collapsed,
            }
        });
    }

    let mainLayoutProps = {
        children,
        pathname,
        allMenuList,
        menuItemClick,
        collapsed,changeCollapsed,
    };

    return (
        <MainLayoutComponent {...mainLayoutProps} />
    );
}

function mapStateToProps({layoutModel}) {
  return {layoutModel};
}

export default connect(mapStateToProps)(MainLayoutPage);
