import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Admin, User } from '../';
export default () =>{
    if(Roles.userIsInRole(Meteor.userId(), 'admin', Roles.GLOBAL_GROUP))
        return <Admin/>;
    else return <User/>;

};