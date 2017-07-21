import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Wrapper } from '../layout';
import { Users } from './';
FlowRouter.route("/users", {
    name:"users",
    action(){
        mount(Wrapper,{
            content:<Users/>
        })
    }
})