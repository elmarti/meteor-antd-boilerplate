import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Form, Icon, Input, Button, Checkbox, notification} from 'antd';
const FormItem = Form.Item;
class Register extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err)
                return notification.error(err);
            Meteor.call("accounts/create", values, error => {
                if (error)
                    return notification.error(error);
                Meteor.loginWithPassword(values.email, values.password, loginError => {
                   if (loginError)
                       notification.error(loginError);
                });
            });
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please enter your email'}],
                    })(
                        <Input prefix={<Icon type="copy" style={{fontSize: 13}}/>} placeholder="Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please enter your password'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a style={{float: "right"}} href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                        Register
                    </Button>
                    Or <a href="/login">login now!</a>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(Register);