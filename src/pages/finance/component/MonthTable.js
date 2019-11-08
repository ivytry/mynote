import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { actionCreator } from '../store';
require('antd/dist/antd.css');
const { Column, ColumnGroup } = Table;

class MonthTable extends PureComponent {
  render() {
    return (
      <Table dataSource={this.props.MonthTotal} pagination={false}>
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

  componentWillMount(){
    this.props.initMonthTotal()
  }
}

const mapState = (state) => ({
    monthTotal: state.get("finance").monthTotal
})

const mapDispatch = (dispatch) => ({
  initMonthTotal: () => {
    dispatch(actionCreator.getMonthTotal())
  }
})

export default connect(mapState, mapDispatch)(MonthTable)
