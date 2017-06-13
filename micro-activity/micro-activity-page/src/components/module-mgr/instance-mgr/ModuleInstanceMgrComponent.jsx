import React from 'react';
import {Icon,Button,Input,Table,Popover,Tag,Popconfirm,} from 'antd';
import styles from './ModuleInstanceMgrComponent.less';
import QRCode from 'qrcode.react';

const Search = Input.Search;

function ModuleInstanceMgrComponent({
    loading,
    total,
    pageIndex,
    pageSize,
    query,
    dataSource,
    selectedRowKeys,
    selectChange,
    pageChange,
    pageSizeChange,

    onUpdate,
    onSearch,
}) {

    let columns = [
        {
            key: 'handle',
            title: '操作',
            dataIndex: 'handle',
            width: 60,
            render(text, record, index) {
                return (
                    <div className={styles.module_page_name}>
                        <a href='javascript:void(0)' className={styles.handle_btn_a} onClick={()=>onUpdate(record.id)}>编辑</a>
                    </div>
                )
            }
        },
        {
            key: 'qrcode',
            title: '预览',
            dataIndex: 'qrcode',
            width: 60,
            render(text, record, index) {
                let content = (
                    <div>
                        <QRCode key="instance_h5"
                              value={'http://192.168.1.22:8989/#/instance_h5?instanceId=' + record.id}
                              size={142}
                              level="M"
                          />
                    </div>
                );
                return (
                    <div className={styles.module_page_name}>
                        <Popover placement='right'  title={null} content={content}>
                            <a href='javascript:void(0)' className={styles.handle_btn_qrcode} ><Icon type="qrcode" /></a>
                        </Popover>
                    </div>
                )
            }
        },
        {
            key: 'name',
            title: '编号',
            dataIndex: 'id',
        },
        {
            key: 'status',
            title: '状态',
            dataIndex: 'status',
            width: 100,
            render(text) {
                return text == '0' ? <Tag color="#999">无效</Tag> :
                        text == '1' ? <Tag color="#DEB887">下架</Tag> :
                        text == '2' ? <Tag color="#108ee9">上架</Tag> :
                                     <Tag color="#999">未知状态</Tag>;
            }
        },
        {
            key: 'create_time',
            title: '创建时间',
            dataIndex: 'create_time',
            width: 200,
        },

    ];

    let rowKey = 'id';

    let rowSelection = {
        selectedRowKeys,
        onChange: selectChange,
    };

    let pagination = {
        current: (pageIndex + 1),
        total,
        pageSize,
        onChange: pageChange,
        showSizeChanger: true,
        showTotal: defaultShowToal,
        onShowSizeChange: pageSizeChange,
    };

    function defaultShowToal(total, range) {
        return <div>共 {total} 条</div>
    }

    return (
        <div className={styles.module_page_cont}>
          <div className={styles.header_layout}>

             <div className={styles.left_bar}>
                 <Button type="primary" >批量删除</Button>
             </div>
              <div className={styles.rigth_bar}>
                  <Search
                    placeholder="简单检索的关键字"
                    style={{ width: 200 }}
                    onSearch={value => onSearch(value)}
                  />
              </div>
          </div>

          <div className={styles.page_content}>
              <Table
                  loading={loading}
                  rowKey={rowKey}
                  columns={columns}
                  dataSource={dataSource}
                  rowSelection={rowSelection}
                  pagination={pagination}
                  bordered
                />
          </div>

        </div>
    );
}

export default ModuleInstanceMgrComponent;
