import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Row, Col, Card } from 'antd';
export default class  extends React.Component{
    goTo(path){
        FlowRouter.go(path)
    }
    render(){
        return (
            <Row gutter={16}>
                <Col span={6} >
                    <Card title="TODO" style={{cursor:'pointer'}} >
                        <p>
                            Not done yet, therefore TODO
                        </p>
                    </Card>
                </Col>
            </Row>
        )
    }
}
