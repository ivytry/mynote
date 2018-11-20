import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { Table, Input, Popconfirm, Form, TimePicker, Divider } from 'antd';
import moment from 'moment';
require('antd/dist/antd.css');

const format = 'HH:mm';
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
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
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
    const {
      editing,
      dataIndex,
      title,
      record,
      index,
      ...restProps
    } = this.props;

    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editing ? (
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

class EditableTable extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '总',
        width: '8%',
        children:[{},{}]
      },
      {
        title: '树',
        width: '10%',
        children:[{},{}]
      },
      {
        title: '懒',
        width: '10%',
        children:[{},{}]
      },
    ];
  }

  isEditing = (record) => {
    return record.key === this.props.editingKey;
  };

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
          editing: this.isEditing(record),
          handleSave: this.handleSave
        }),
      };
    });
    return (
      <Table
        components={components}
        bordered
        dataSource={this.props.finance}
        loading={this.props.loading}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }

  componentDidMount() {
    var d = new Date()
    this.props.initialData(d.toLocaleDateString())
  }
}

const mapState = (state) => {
  return {
    finance: state.get("finance").finance,
    editingKey: state.get("finance").editingKey,
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

export default connect(mapState, mapDispatch)(EditableTable)
