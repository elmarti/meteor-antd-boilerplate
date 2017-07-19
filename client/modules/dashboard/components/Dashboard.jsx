import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, Card } from 'antd';
class Dashboard extends React.Component{
    render(){
        return (
            <Row gutter={16}>
                {this.props.isAdmin ? <Col span={6} >
                    <Card title="Edit users" style={{cursor:'pointer'}} >
                        <p>
                            Create, edit and view information about all users
                        </p>
                        <p className="danger">
                            Admin only
                        </p>
                    </Card>

                </Col> : ""}

            </Row>
        )
    }
}

export default createContainer(() => {
    if(!(Meteor.loggingIn() || Meteor.user()))
        FlowRouter.go('/login');
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
    return {
        isAdmin
    };
}, Dashboard);