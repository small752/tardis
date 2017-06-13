import React from 'react';
import {Icon,Button,Input,Table,Popover,Tag,Popconfirm,} from 'antd';
import styles from './ModuleComponent.less';
const Search = Input.Search;

function ModuleComponent({
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
    onUpdate,
    onConfig,
    onSearch,
    onCreateIns,
}) {

    let columns = [
        {
            key: 'handle',
            title: '操作',
            dataIndex: 'handle',
            width: 150,
            render(text, record, index) {
                return (
                    <div className={styles.module_page_name}>
                        <a href='javascript:void(0)' className={styles.handle_btn_a} onClick={()=>onUpdate(record.id)}>编辑</a>
                        <a href='javascript:void(0)' className={styles.handle_btn_a} onClick={()=>onConfig(record.id)}>配置</a>
                        <a href='javascript:void(0)' className={styles.handle_btn_a} onClick={()=>onCreateIns(record.id)}>新增实例</a>
                    </div>
                )
            }
        },
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

             <div className={styles.left_bar}>
                 <Button type="primary" >批量删除</Button>
             </div>
              <div className={styles.rigth_bar}>
                  <Search
                    placeholder="简单检索的关键字"
                    style={{ width: 200 }}
                    onSearch={value => onSearch(value)}
                  />
                  <Button className={styles.plus_btn} type="primary" shape="circle" icon="plus" size='large' onClick={onCreate}/>
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

export default ModuleComponent;
