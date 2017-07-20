import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, Card } from 'antd';
export default class AdminDashboard extends React.Component{
    goTo(path){
        FlowRouter.go(path)
    }
    render(){
        return (
            <Row gutter={16}>
                <Col span={6} >
                    <Card title="Edit users" style={{cursor:'pointer'}} onClick={this.goTo.bind(this, "/users")}>
                        <p>
                            Create, edit and view information about all users
                        </p>
                        <p className="danger">
                            Admin only
                        </p>
                    </Card>
                </Col>
            </Row>
        )
    }
}