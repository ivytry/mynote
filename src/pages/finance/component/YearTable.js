import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { actionCreator } from '../store';
require('antd/dist/antd.css');
const { Column, ColumnGroup } = Table;

class TotalTable extends PureComponent {
  render() {
    return (
      <Table dataSource={this.props.allTotal} pagination={false}>
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
    this.props.initialAllTotal()
  }
}

const mapState = (state) => ({
    allTotal: state.get("finance").allTotal
})

const mapDispatch = (dispatch) => ({
  initialAllTotal: () => {
    dispatch(actionCreator.getAllTotal())
  }
})

export default connect(mapState, mapDispatch)(TotalTable)
