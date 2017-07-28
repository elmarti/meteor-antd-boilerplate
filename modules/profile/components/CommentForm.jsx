import React from 'react';
import { Form, Icon, Input, Button, Spin, notification } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CommentForm extends React.Component {
    constructor(){
        super();
        this.state = {
            loading:false
        };
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading:true
                });
                Meteor.call("profile/addComment", this.props.profileId, values.comment, err => {
                    this.setState({
                        loading:false
                    });
                    if(err)
                        notification.error(err);
                });
            }
        });
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const commentError = isFieldTouched('comment') && getFieldError('comment');
        return (
            <Spin spinning={this.state.loading}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem
                        validateStatus={commentError ? 'error' : ''}
                        help={commentError || ''}
                    >
                        {getFieldDecorator('comment', {
                            rules: [{ required: true, message: 'Please enter a comment' }],
                        })(
                            <Input autosize={{ minRows: 2, maxRows: 6 }}  type="textarea" placeholder="Comment" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            Submit
                        </Button>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default Form.create()(CommentForm);

