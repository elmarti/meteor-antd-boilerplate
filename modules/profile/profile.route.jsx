import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Profile } from './';
import { Wrapper } from '../layout';
FlowRouter.route("/profile", {
   name:"own_profile",
    action(){
       mount(Wrapper, {
           content: <Profile/>
       });
    }
});
FlowRouter.route("/profile/:id", {
    name:"profile",
    action(){
        mount(Wrapper, {
            content: <Profile/>
        });
    }
});