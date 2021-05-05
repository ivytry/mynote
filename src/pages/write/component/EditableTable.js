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
  getInput = () => {
    if(this.props.inputType === 'stime'){
      return <TimePicker format='HH:mm' style={{'width':'80px'}} />
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
              {
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {
                      getFieldDecorator(dataIndex, {
                        initialValue: record[dataIndex]
                      })(this.getInput())
                    }
                  </FormItem>
                ) : (
                  restProps.children[2] === null ? record[dataIndex].format("HH:mm") : restProps.children
                )
              }
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
        title: '开始时间',
        dataIndex: 'stime',
        width: '8%',
        editable: true,
      },
      {
        title: '结束时间',
        dataIndex: 'etime',
        width: '8%',
        editable: true,
      },
      {
        title: '事件',
        dataIndex: 'type',
        width: '10%',
        editable: true
      },
      {
        title: '内容',
        dataIndex: 'things',
        width: '',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: '13%',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              <span>
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
              </span>
              <Divider type="vertical" />
              <span>
                {
                  this.props.daynote.length > 1
                  ? (
                    <Popconfirm title="确定要删除吗?" onConfirm={() => this.props.handleDelete(this.props.daynote, record.key)}>
                      <a href="#">删除</a>
                    </Popconfirm>
                  ) : null
                }
              </span>
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
      let type = 'text';
      if(col.dataIndex === 'stime' || col.dataIndex === 'etime'){
        type = 'stime'
      }
      if(col.dataIndex === 'type'){
        type = 'type'
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: type,
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

function pakeDaynote(state){
  var daynote = state.get("write").daynote;
  daynote.map((item, index) => {
    item.stime = moment((item.stime ? item.stime : moment()), format)
    item.etime = moment((item.etime ? item.etime : moment()), format)
  })
  const last = daynote[daynote.length-1];
  if(!(last.type === "" && last.things === "")){
    daynote.push({
      "key": daynote.length+1,
        "type": "",
        "stime": "",
        "etime": "",
        "things": "",
        "remark": ""
    })
  }
  return daynote
}

const mapState = (state) => {
  return {
    daynote: pakeDaynote(state),
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
