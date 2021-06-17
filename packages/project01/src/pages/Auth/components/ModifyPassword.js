import React from 'react'
import { connect } from 'dva'
import { Form, Modal, Button, Input, Row, Icon } from 'antd'
import PropTypes from 'prop-types'

class ModifyPassword extends React.Component {
  static propTypes = {
    record: PropTypes.object.isRequired,
    visible: PropTypes.bool,
    submitLoading: PropTypes.bool,
    handleCancel: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    confirmDirty: false
  }

  handlePasswordSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch, handleCancel, record } = this.props

        values.user_id = record.id
        delete values.confirm
        dispatch({
          type: 'user/postUser',
          payload: values
        }).then(() => handleCancel(true))
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('2次输入的密码必须一致!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { visible, handleCancel, submitLoading } = this.props

    return (
      <Modal
        title="修改密码"
        visible={visible}
        destroyOnClose
        maskClosable={false}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 17, offset: 1 }} onSubmit={this.handlePasswordSubmit}>
          <Form.Item label="用户密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请填写用户密码！' }, { validator: this.validateToNextPassword }]
            })(
              <Input.Password
                prefixk={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item label="再次确认">
            {getFieldDecorator('confirm', {
              rules: [{ required: true, message: '请再次填写用户密码！' }, { validator: this.compareToFirstPassword }]
            })(
              <Input.Password
                prefixk={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                onBlur={this.handleConfirmBlur}
                placeholder="请再次输入密码"
              />
            )}
          </Form.Item>
          <Row type="flex" justify="center">
            <Button htmlType="submit" type="primary" loading={submitLoading}>
              保存
            </Button>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default connect()(Form.create()(ModifyPassword))
