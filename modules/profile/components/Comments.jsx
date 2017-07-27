import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Spin, Card, Avatar } from 'antd';
import { CommentForm } from '../';

export default class Comments extends React.Component {

    render(){
        return (
                <Row>
                    {this.props.friends.map(friend  =>(<Row>
                        <Avatar/>
                    </Row>))}
                    <CommentForm/>
                </Row>
        );
    }
}