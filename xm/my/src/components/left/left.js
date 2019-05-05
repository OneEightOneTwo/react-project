import React from 'react'
import 'antd/dist/antd.css';
// import {link} from 'react-router-dom';
import {Table, Input, Button, Popconfirm, Form,} from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
  
class EditableCell extends React.Component {
    state = {
      editing: false,
    }


    toggleEdit = () => {
      const editing = !this.state.editing;
      this.setState({ editing }, () => {
        if (editing) {
          this.input.focus();
        }
      });
    }
  
    save = (e) => {
      const { record, handleSave } = this.props;
      this.form.validateFields((error, values) => {
        if (error && error[e.currentTarget.id]) {
          return;
        }
        this.toggleEdit();
        handleSave({ ...record, ...values });
      });
    }
  
    render() {
      const { editing } = this.state;
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
        <td {...restProps}>
          {editable ? (
            <EditableContext.Consumer>
              {(form) => {
                this.form = form;
                return (
                  editing ? (
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(dataIndex, {
                        rules: [{
                          required: true,
                          message: `${title} is required.`,
                        }],
                        initialValue: record[dataIndex],
                      })(
                        <Input
                          ref={node => (this.input = node)}
                          onPressEnter={this.save}
                          onBlur={this.save}
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
  
  class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.state={

      }
      this.columns = [{
        title: 'goods',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      }, {
        title: 'num',
        dataIndex: 'age',
      }, {
        title: 'picture',
        dataIndex: 'address',
      }, {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => (
          this.state.dataSource.length >= 1
            ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            ) : null
        ),
      }];
  
      this.state = {
        dataSource: [{
          key: '0',
          name: 'Edward King 0',
          age: '99',
          address: ' ../../assets/0.jpg',
        }, {
          key: '1',
          name: 'Edward King 1',
          age: '99',
          address: '../../assets/1.jpg',
        }],
        count: 2,
      };
      
    }
  
    handleDelete = (key) => {
      const dataSource = [...this.state.dataSource];
      this.setState({ dataSource: dataSource.filter(item => item.key !== key ) });
    }

    handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 99,
        address: `../../assets/${count}.jpg`,
      };
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
      });
    }
    btnFn(){
      window.location.href="#/found"     
    }
    btnFn1(){
      window.location.href="#/xg"     
    }
    handleSave = (row) => {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({ dataSource: newData });
    }
  
    render() {
      const { dataSource } = this.state;
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
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave,
          }),
        };
      });
      return (
        <div>
          <Button onClick={this.handleAdd} type="primary" style={{ margin: 16 }}>
            添加商品 
          </Button>
          <Button onClick={this.btnFn.bind(this)} type="primary" style={{ margin: 16}}>
            查找商品 
          </Button>
          <Button onClick={this.btnFn1.bind(this)} type="primary" style={{ margin: 16 }}>
          修改商品 
        </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </div>
        
      );
    }
  }
  
  export default EditableTable
  