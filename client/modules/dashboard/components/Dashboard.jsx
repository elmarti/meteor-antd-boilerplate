import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import { Admin, User } from '../';
class Dashboard extends React.Component{
    render(){
        if(this.props.isAdmin)
            return <Admin/>;
        else return <User/>;

    }
}


export default createContainer(() => {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
    return {
        isAdmin
    };
}, Dashboard);