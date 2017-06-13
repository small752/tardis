import React from 'react';
import {Icon,Button,Input,Table,Popover,Tag,} from 'antd';
import styles from './ModulePageComponent.less';
const Search = Input.Search;

function ModulePageComponent({
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

    onCreate,
    onSearch,
}) {

    let columns = [
        {
            key: 'name',
            title: '名称',
            dataIndex: 'name',
            render(text, record, index) {
                let popContent = (
                    <img src={record.preview_img} width='200px' />
                );
                return (
                    <div className={styles.module_page_name}>
                        <Popover content={popContent} title={null} trigger="hover" placement='right'>
                            <div  className={styles.module_page_name_text}>{text}</div>
                        </Popover>
                    </div>
                )
            },
        },
        {
            key: 'component',
            title: '组件名称',
            dataIndex: 'component',
            width: 200,
        },
        {
            key: 'type',
            title: '类型',
            dataIndex: 'type',
            width: 100,
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
                  pagination={pagination}
                  bordered
                />
          </div>
        </div>
    );
}

export default ModulePageComponent;
