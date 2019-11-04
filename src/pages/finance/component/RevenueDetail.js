import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { Button, Table, Input, Popconfirm, Form, TimePicker, Divider } from 'antd';
require('antd/dist/antd.css');

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends PureComponent {

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.props.editing;
    this.props.setData(this.props.finance, !this.props.editing)
    if (editing) {
      this.input.focus();
    }
  }

  handleClickOutside = (e) => {
    const { editing } = this.props;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.props
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class Revenue extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '树',
        children:[{
          title: '项目',
          dataIndex:'title',
          key:'title',
          editable: true
        },{
          title: '金额',
          dataIndex:'zivMoney',
          key:'zivMoney',
          editable: true
        },{
          title: '备注',
          dataIndex:'zivRemarks',
          key:'zivRemarks',
          editable: true
        },{
          title: '日期',
          dataIndex:'zivDate',
          key:'zivDate',
          editable: true
        }]
      },
      {
        title: '懒',
        children:[{
          title: '项目',
          dataIndex:'title',
          key:'title',
          editable: true
        },{
          title: '金额',
          dataIndex:'ivyMoney',
          key:'ivyMoney',
          editable: true
        },{
          title: '备注',
          dataIndex:'ivyRemarks',
          key:'ivyRemarks',
          editable: true
        },{
          title: '日期',
          dataIndex:'ivyDate',
          key:'ivyDate',
          editable: true
        }]
      },
    ];
  }

  handleSave = (row) => {
    const newData = [...this.props.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
      	console.log(error)
        return;
      }
      const newData = [...this.props.finance];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.props.setData(newData, '');
      } else {
        newData.push(row);
        this.props.setData(newData, '');
      }
    });
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editable: col.editable,
          handleSave: this.handleSave
        }),
      };
    });
    
    return (
      <div>
        <Button icon="edit" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}></Button>
        <Table
          components={components}
          bordered
          pagination={false}
          dataSource={this.props.finance}
          loading={this.props.loading}
          columns={columns}
          rowClassName="editable-row"
        />
      </div>
    );
  }

  componentDidMount() {
    var d = new Date()
    this.props.initialData(d.toLocaleDateString())
  }
}

const mapState = (state) => {
  return {
    finance: state.get("finance").finance.revenue,
    editing: state.get("finance").editing,
    loading: state.get("finance").loading
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
