import React from 'react';
import { Layout, Form, Icon, Input, Button, Checkbox, notification } from 'antd';
const FormItem = Form.Item;
const { Content } = Layout;
class LoginForm extends React.Component {
    constructor(){
        super();
        this.state = {
          submitLoading:false
        };
    }
    handleSubmit = (e) => {
        this.setState({
            submitLoading:true
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                this.setState({
                    submitLoading:false
                });
                return notification.error(err);
            }
            Meteor.loginWithPassword(values.email, values.password, loginError => {
                this.setState({
                    submitLoading:false
                });
                if (loginError)
                    notification.error(loginError);
            });
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please enter your email' }],
                    })(
                        <Input prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please enter your password' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a style={{float:"right"}} href="/forgotpassword">Forgot password</a>
                    <Button loading={this.state.submitLoading} type="primary" htmlType="submit" style={{width:"100%"}}>
                        Log in
                    </Button>
                    Or <a href="/register" >register now!</a>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(LoginForm);