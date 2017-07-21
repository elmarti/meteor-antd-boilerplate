import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import Dashboard from '../components/Dashboard';


export default createContainer(() => {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP);
    return {
        isAdmin
    };
}, Dashboard);