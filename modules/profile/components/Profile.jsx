import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Connection, Comment } from '../../../lib/collections';
import { Spin, Row, Col, Card, Avatar, Button } from 'antd';
import { User } from '../../../lib/collections';
import { Comments } from '../';
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
                        <Comments comments={this.props.comments} profileId={this.props.profileId}/>
                    </Card>
                </Col>
            </Row>);
    }
}
export default createContainer(() => {
    let ownProfile = false;
    let profileId = FlowRouter.getParam("id");
    const profileReady = Meteor.subscribe('profile',profileId).ready();
    if(!profileId){
        ownProfile = true;
        profileId = Meteor.userId();
    }
    const user = User.findOne({
            _id: profileId
        });
    const connection = Connection.findOne({
        $and: [{
            "users.0._id": Meteor.userId()
        }, {
            "users.0._id": profileId
        }]
    });
    const comments = Comment.find({
        receiver:profileId
    }).fetch();

    return {
        profileReady,
        user,
        connection,
        profileId,
        comments : comments ? comments : []
    };
}, Profile);