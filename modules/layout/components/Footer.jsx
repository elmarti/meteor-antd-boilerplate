import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;
export default class extends React.Component{

    render(){
        return (            <Footer style={{ textAlign: 'center' }}>
            AntD Meteor Boilerplate
        </Footer>);
    }
}