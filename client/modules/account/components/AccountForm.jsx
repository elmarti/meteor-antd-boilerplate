import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Layout, Card, Row } from 'antd';
const { Content } = Layout;


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
                    <Card className="form-login-register">
                        <Row style={{textAlign:'center', paddingBottom:'20px'}}>
                            <img src="http://via.placeholder.com/100x100"/>
                        </Row>
                        <Row>
                            {this.props.content}
                        </Row>
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