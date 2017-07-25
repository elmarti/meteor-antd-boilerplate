import React from 'react';
import { Form, Input, Button, Row, Col, Icon, notification } from 'antd';
import { Accounts } from 'meteor/accounts-base';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Accounts.changePassword(values.oldPassword, values.newPassword, error => {
                   if(error)
                       return notification.error(error);
                   notification.success({
                       message:"Password updated"
                   });
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col sm={12}>
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <FormItem>
                            {getFieldDecorator('oldPassword', {
                                rules: [{ required: true, message: 'Please enter your old password' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Old Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('newPassword', {
                                rules: [{ required: true, message: 'Please enter your new password' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="New Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Update password
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default Form.create()(NormalLoginForm);
