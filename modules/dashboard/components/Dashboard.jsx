import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { createContainer } from 'meteor/react-meteor-data';
import { Admin, User } from '../';
export default class Dashboard extends React.Component{
    render(){
        if(this.props.isAdmin)
            return <Admin/>;
        else return <User/>;

    }
}
