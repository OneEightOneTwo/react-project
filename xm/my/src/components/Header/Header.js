import React from 'react'
// import { NavBar, Icon } from 'antd-mobile';
import './Header.css'
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "头部"
        }
    }
    render() {
        return (
            <header>
                <h1 style={{color:"#58bc58",paddingLeft:20}}>XX后台管理系统</h1>

            </header>
        )
    }
}

export default Header