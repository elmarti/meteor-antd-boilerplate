import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Connection } from '../../../lib/collections';
import { Spin, Row, Col, Card, Avatar, Button } from 'antd';
class Profile extends React.Component {
    constructor() {
        super();
    }

    getFriendButtons() {
        const { connection } = this.props;
        if(connection.status == "PENDING")
            return <Button disabled>Friend request pending</Button>
        if(connection.status == "CONNECTED")
            return "";
    }

    render() {
        return (
            <Row>
                <Col span={8}>
                    <Card loading={!this.props.profileReady}
                          title={this.props.user ? this.props.user.emails[0].address : "Loading.."}
                          style={{minHeight: "150px", textAlign: "center"}}>
                        <Row>
                        <Avatar size="large" icon="user"/>
                        </Row>
                        <Row>
                        {this.props.ownProfile ?
                            <p>Welcome to your profile.</p> :
                            this.props.connection ?
                                this.getFriendButtons.call(this) :
                                <Button>Add as friend</Button>
                        }
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card loading={!this.props.profileReady} title="Friends" style={{minHeight: "150px"}}>

                    </Card>
                </Col>
                <Col span={8}>
                    <Card loading={!this.props.profileReady} title="Comments" style={{minHeight: "150px"}}>

                    </Card>
                </Col>
            </Row>);
    }
}
export default createContainer(() => {
    const routeName = FlowRouter.current().route.name;
    const userId = FlowRouter.getParam("id");
    let profileReady = false;
    const ownProfile = routeName == "own_profile";
    if (ownProfile)
        profileReady = Meteor.subscribe('ownProfile').ready();
    else
        profileReady = Meteor.subscribe('profile',userId);
    const user = ownProfile ? Meteor.user() : Meteor.users.findOne({
            _id: userId
        });

    const connection = Connection.findOne({
        $and: [{
            "users.0._id": Meteor.userId()
        }, {
            "users.0._id": userId
        }]
    });

    return {
        profileReady,
        user,
        connection,
        ownProfile
    };
}, Profile);