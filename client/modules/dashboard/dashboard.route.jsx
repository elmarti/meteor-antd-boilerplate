import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Wrapper } from '../layout';
import { Dashboard } from './';
FlowRouter.route("/", {
    name:"dashboard",
    action(){
        mount(Wrapper,{
            content:<Dashboard/>
        })
    }
})