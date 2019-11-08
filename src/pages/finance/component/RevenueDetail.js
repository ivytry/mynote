import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { Button, Icon, Table, Input, Popconfirm, Form, TimePicker, Divider } from 'antd';
import Highlighter from 'react-highlight-words';
require('antd/dist/antd.css');

class Revenue extends PureComponent {
  constructor(props) {
    super(props);
    this.data = [
      {
        key: '1',
        item: '现金红包',
        name: 'ivy',
        name1: '王爸爸',
        money: '1000',
        date:'2019-11-05'
      },
      {
        key: '2',
        item: '红包',
        name: 'ziv',
        name1: '王妈妈',
        money: '2000',
        date:'2019-11-01'
      },
    ];
  }

  getColumnSearchProps = (dataIndex, dataTitle) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`搜索 ${dataTitle}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.props.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.props.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            搜索
          </Button>
          <Button onClick={() => this.props.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            重置
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.props.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    });

  render() {
      const columns = [
        {
          title: '项目',
          dataIndex: 'item',
          key: 'item',
          ...this.getColumnSearchProps('item', '项目'),
        },
        {
          title: '金额',
          dataIndex: 'money',
          key: 'money',
          ...this.getColumnSearchProps('money', '金额'),
        },
        {
          title: '收款人',
          dataIndex: 'name',
          key: 'name',
          ...this.getColumnSearchProps('name', '收款人'),
        },
        {
          title: '付款人',
          dataIndex: 'name1',
          key: 'name1',
          ...this.getColumnSearchProps('name1', '付款人'),
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          ...this.getColumnSearchProps('date', '日期'),
        },
      ];
      return <Table columns={columns} dataSource={this.data} />;
    }
}

const mapState = (state) => {
  return {
    searchText: state.get("finance").searchText
  }
}

const mapDispatch = (dispatch) => {
	return {
		initialData: (m) => {
			dispatch(actionCreator.getRevenueDetail(m))
		},
    setData: (d, k) => {
      dispatch(actionCreator.handleSetData(d,k))
    },
    handleDelete: (d, k) => {
      d.map((item, index) => {
        if(item.key === k){
          d.splice(index,1)
          return
        }
      })
      dispatch(actionCreator.handleSetData(d,k))
    },
    handleSearch: (selectedKeys, confirm) => {
      confirm();
      dispatch(actionCreator.handleSearchData(selectedKeys[0]));
    },
    handleReset: clearFilters => {
      clearFilters();
      dispatch(actionCreator.handleSearchData(''));
    }
	}
}

export default connect(mapState, mapDispatch)(Revenue)
