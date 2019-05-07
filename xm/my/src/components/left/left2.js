import React from 'react'
import 'antd/dist/antd.css';
import {Table, Input, Button, Icon,} from 'antd';
import Highlighter from 'react-highlight-words';
  
const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: '../../assets/0.jpg',
  }, {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: '../../assets/1.jpg',
  }, {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: '../../assets/2.jpg',
  }, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: '../../assets/3.jpg',
  }];
  
  class App extends React.Component {
    state = {
      searchText: '',
    };
  
    getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => { this.searchInput = node; }}
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
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    })
  
    handleSearch = (selectedKeys, confirm) => {
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    }
  
    handleReset = (clearFilters) => {
      clearFilters();
      this.setState({ searchText: '' });
    }
    btnFn(){
      window.location.href="#/home"
      
    }
    btnFn1(){
      window.location.href="#/xg"
      
    }
    render() {
      const columns = [{
        title: 'goods',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      }, {
        title: 'price',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
        ...this.getColumnSearchProps('age'),
      }, {
        title: 'picture',
        dataIndex: 'address',
        key: 'address',
        ...this.getColumnSearchProps('address'),
      }];
      return(
        <div>
        <Button onClick={this.btnFn.bind(this)} type="primary" style={{ margin: 16 }}>
          添加商品 
        </Button>
        <Button onClick={this.handleAdd} type="primary" style={{ margin: 16 }}>
          查找商品 
        </Button>
        <Button onClick={this.btnFn1.bind(this)} type="primary" style={{ margin: 16 }}>
          修改商品 
        </Button>
        <Table columns={columns} dataSource={data} />
      </div>
   
      ); 

    }
  }
  
 export default App 
  
  