import React from 'react';

import {FlowRouter} from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { AccountForm, Login, Register } from './';
FlowRouter.route("/login", {
    name: 'login',
    action(){
        mount(AccountForm , {
            content:<Login/>
        });
    }
});

FlowRouter.route("/register", {
    name: 'register',
    action(){
        mount(AccountForm , {
            content:<Register/>
        });
    }
});