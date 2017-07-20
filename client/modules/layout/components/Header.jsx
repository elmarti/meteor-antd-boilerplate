import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {Layout, Menu, Row, Col } from 'antd';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

export default class extends React.Component{
    click({key}){
        switch(key){
            case "logout":
                Meteor.logout();
                break;
            case "preferences":
                FlowRouter.go("/preferences");
                break;
        }
    }
    render(){
        return (<Header>
            <div className="logo" />
            <Menu
                onClick={this.click.bind(this)}
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px', float:'right'}}
            >
                <SubMenu key="sub1" title="Account">
                    <Menu.Item key="preferences">Preferences</Menu.Item>
                    <Menu.Item key="logout">Logout</Menu.Item>
                </SubMenu>
            </Menu>
        </Header>);
    }
}