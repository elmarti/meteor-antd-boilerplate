import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Layout, Icon } from 'antd';
const {Content} = Layout;
import {Header, Footer} from '../';

class Wrapper extends React.Component{

    render(){
        return (  <Layout className="layout">
            <Header/>
            <Content style={{ padding: '0 50px' }}>
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

    };
}, Wrapper);