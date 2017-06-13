import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import InstanceH5Component from '../../../components/instance/InstanceH5Component';

function InstanceH5Page({dispatch, instanceH5Model}) {

    let {loading,instanceId,instancePageList,currentIndex,configData,musicState,} = instanceH5Model;

    function changeMusicState(musicState) {
        dispatch({
            type: 'instanceH5Model/updateState',
            payload: {
                musicState,
            }
        });
    }

    let comProps = {
        loading,instanceId,instancePageList,currentIndex,configData,musicState,changeMusicState,
    };

    return (
        <InstanceH5Component {...comProps} />
    );
}

function mapStateToProps({instanceH5Model}) {
  return {instanceH5Model};
}

export default connect(mapStateToProps)(InstanceH5Page);
