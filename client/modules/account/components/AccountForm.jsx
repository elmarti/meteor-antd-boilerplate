import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import {Layout, Card} from 'antd';
const {Content} = Layout;


class AccountForm extends React.Component {
    constructor() {
        super();
        this.state = {
            newUser: false
        };
    }

    render() {
        return (
            <Layout>
                <Content>
                    <Card>
                        {this.props.content}
                    </Card>
                </Content>
            </Layout>
        );
    }
}
export default createContainer(() => {
    const loggedIn =  Meteor.user();
    if (loggedIn)
        FlowRouter.go("/");
    return {};
}, AccountForm);