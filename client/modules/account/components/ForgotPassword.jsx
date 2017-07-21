import React from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
const FormItem = Form.Item;
class ForgotPassword extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err)
                return notification.error(err);
            Meteor.loginWithPassword(values.email, values.password, loginError => {
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
                    <Button type="primary" htmlType="submit" style={{width:"100%"}}>
                        Send reset email
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(ForgotPassword);