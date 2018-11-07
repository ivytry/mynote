import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from '../store';
import { Table, Input, InputNumber, Popconfirm, Form, TimePicker, Dropdown } from 'antd';
import moment from 'moment';
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
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    if(this.props.inputType === 'time'){
      return <TimePicker format='HH:mm' />
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;

    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入 ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '时间',
        dataIndex: 'time',
        width: '15%',
        editable: true,
      },
      {
        title: '事件',
        dataIndex: 'type',
        width: '10%',
        editable: true,
      },
      {
        title: '内容',
        dataIndex: 'things',
        width: '46%',
        editable: true,
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: '18%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        保存
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="确定要取消吗?"
                    onConfirm={() => this.props.setData(this.props.daynote, '')}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.props.setData(this.props.daynote, record.key)}>编辑</a>
              )}
            </div>
          );
        },
      },
    ];
  }

  isEditing = (record) => {
    return record.key === this.props.editingKey;
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
      	console.log(error)
        return;
      }
      const newData = [...this.props.daynote];
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
          inputType: col.dataIndex === 'time' ? 'time' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Table
        components={components}
        bordered
        dataSource={this.props.daynote}
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
    daynote: state.get("write").daynote,
    editingKey: state.get("write").editingKey,
    loading: state.get("write").loading
  }
}

const mapDispatch = (dispatch) => {
	return {
		initialData: (m) => {
			dispatch(actionCreator.getDayThings(m))
		},
    setData: (d, k) => {
      dispatch(actionCreator.handleSetData(d,k))
    }
	}
}

export default connect(mapState, mapDispatch)(EditableTable)
