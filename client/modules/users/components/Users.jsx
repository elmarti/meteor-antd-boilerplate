import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
class Users extends React.Component{
    render(){
        return(<div></div>);
    }
}

export default createContainer(()=>{
    const usersReady = Meteor.subscribe("users/list").ready();
    return {
        usersReady,
        users: usersReady ? Meteor.users.find().fetch() : []
    };
}, Users);