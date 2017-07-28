import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Spin, Card, Avatar } from 'antd';
import { CommentForm } from '../';

export default class Comments extends React.Component {

    render(){
        console.log(this.props);
        return (
                <Row>
                    {this.props.comments.map(comment  =>(<Row>
                        <Avatar/>
                    </Row>))}
                    <CommentForm profileId={this.props.profileId}/>
                </Row>
        );
    }
}