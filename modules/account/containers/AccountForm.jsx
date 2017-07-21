import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import  AccountForm  from '../components/AccountForm';
import { Layout, Card, Row } from 'antd';
const { Content } = Layout;

export default createContainer(() => {
    const loggedIn =  Meteor.user();
    if (loggedIn)
        FlowRouter.go("/");
    return {};
}, AccountForm);