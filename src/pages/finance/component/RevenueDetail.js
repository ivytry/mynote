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
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
    ];
  }

  getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
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
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    });

    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };

  render() {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
          ...this.getColumnSearchProps('name'),
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: '20%',
          ...this.getColumnSearchProps('age'),
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          ...this.getColumnSearchProps('address'),
        },
      ];
      return <Table columns={columns} dataSource={this.data} />;
    }
}

const mapState = (state) => {
  return {
    finance: state.get("finance").finance.revenue,
    editing: state.get("finance").editing,
    loading: state.get("finance").loading,
    searchText: state.get("finance").searchText
  }
}

const mapDispatch = (dispatch) => {
	return {
		initialData: (m) => {
			dispatch(actionCreator.getDayThings(m))
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
    }
	}
}

export default connect(mapState, mapDispatch)(Revenue)
