import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Layout, Breadcrumb } from 'antd';
const {Content} = Layout;
import {Header, Footer} from '../';

class Wrapper extends React.Component{

    render(){
        return (  <Layout className="layout">
            <Header/>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {this.props.content}
                </div>
            </Content>
        <Footer/>
        </Layout>);
    }
}
export default createContainer(()=>{
    if(!(Meteor.loggingIn() || Meteor.user()))
        FlowRouter.go("/login");
    return {

    }
}, Wrapper);