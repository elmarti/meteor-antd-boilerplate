import React from 'react';

import {FlowRouter} from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { AccountForm, Login, Register, Preferences, ForgotPassword, ResetPassword } from './';
import { Wrapper } from '../layout';
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
FlowRouter.route("/preferences", {
   name: 'preferences',
    action(){
       mount(Wrapper, {
          content:<Preferences/>
       });
    }
});
FlowRouter.route("/forgotpassword", {
    name: 'forgotpassword',
    action(){
        mount(AccountForm,{
            content:<ForgotPassword/>
        })
    }
});
FlowRouter.route("/reset-password/:token", {
    name: 'reset-password',
    action(){
        mount(AccountForm,{
            content:<ResetPassword/>
        })
    }
});