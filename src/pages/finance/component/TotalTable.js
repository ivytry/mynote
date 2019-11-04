import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
require('antd/dist/antd.css');
const { Column, ColumnGroup } = Table;

class TotalTable extends PureComponent {
  render() {
    const finance = [{
      key: '1',
      title: '总收入',
      total: 35000,
      tree: 25000,
      lan: 10000,
      tags: ['nice', 'developer'],
    }, {
      key: '2',
      title: '总支出',
      total: 15000,
      tree: 5000,
      lan: 10000
    }, {
      key: '3',
      title: '总结余',
      total: 20000,
      tree: 20000,
      lan: 0,
      tags: ['nice', 'developer'],
    }, ];

    return (
      <Table dataSource={finance} pagination={false}>
        <ColumnGroup title="总">
          <Column
            title=""
            dataIndex="title"
            key="title" 
          />
          <Column
            title=""
            dataIndex="total"
            key="total" 
          />
        </ColumnGroup>
        <ColumnGroup title="树">
          <Column
            title=""
            dataIndex="title"
            key="title" 
          />
          <Column
            title=""
            dataIndex="tree"
            key="tree" 
          />
        </ColumnGroup>
        <ColumnGroup title="懒">
          <Column
            title=""
            dataIndex="title"
            key="title" 
          />
          <Column
            title=""
            dataIndex="lan"
            key="lan" 
          />
        </ColumnGroup>
      </Table>
    );
  }
}

export default connect(null, null)(TotalTable)
