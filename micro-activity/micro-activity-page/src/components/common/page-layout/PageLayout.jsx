import React from 'react';
import {Icon,Button,Input,Table} from 'antd';
import styles from './PageLayout.less';

const Search = Input.Search;

function PageLayout({
    loading,
    total,
    pageIndex,
    pageSize,
    dataSource,
    selectedRowKeys,
    selectChange,
    pageChange,
    columns,
    rowKey,
    expandedRowRender,
    pageSizeChange,
    onCreate,
    onSearch,
}) {

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
        <div className={styles.common_page_layout_cont}>
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
                  expandedRowRender={expandedRowRender}
                />
          </div>
        </div>
    );
}

export default PageLayout;
