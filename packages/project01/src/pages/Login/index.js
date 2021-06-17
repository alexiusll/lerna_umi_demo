import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Layout, Form, Icon, Input, Button, message, Footer } from 'antd';
// import router from 'umi/router'
// import CookieUtil from '@/utils/cookie'
import { history } from 'umi';
import RayPlus from '@/assets/rayplus.png';
import Cookies from 'js-cookie';
import styles from './style.css';

const { Content } = Layout;

class Login extends React.Component {
  state = {
    current: 'project',
  };

  formRef = React.createRef();

  static propTypes = {
    form: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (Cookies.get('token')) {
      history.push('/applications');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        // 判断选择的系统进行登录
        const { current } = this.state;
        values.type = current;
        if (current === 'project') {
          dispatch({
            type: 'login/login_project',
            payload: { ...values, system_ids: [1, 2] },
          }).then(ret => {
            if (ret) {
              message.success('登录成功！');
              history.push('/applications');
            }
          });
        } else if (current === 'auth') {
          dispatch({
            type: 'login/login',
            payload: { ...values },
          }).then(ret => {
            if (ret) {
              message.success('权限系统登录成功！');
              history.push('/auth');
            }
          });
        }
      }
    });
  };

  handleChangeLogin = key => {
    const { setFieldsValue } = this.props.form;

    setFieldsValue({
      account: '',
      password: '',
    });
    this.setState({ current: key });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { current } = this.state;
    const submitLoading = this.props.loading.effects['login/login'];

    return (
      <div className={styles.login_bg}>
        <div className={styles.switchButton}>
          {current === 'project' ? (
            <Button type="link" onClick={() => this.handleChangeLogin('auth')}>
              管理员登录
              <Icon type="caret-right" />
            </Button>
          ) : (
            <Button type="link" onClick={() => this.handleChangeLogin('project')}>
              普通用户登录
              <Icon type="caret-right" />
            </Button>
          )}
        </div>
        <Content className={styles.bodyContent}>
          <div className={styles.form_title}>
            <img className={styles.login_img} src={RayPlus} alt="RayPlus" />
          </div>
          <Form onSubmit={this.handleSubmit} className={styles.login_form} ref={this.formRef}>
            <Form.Item>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: current === 'project' ? '请输入用户名' : '请输入管理员账户',
                  },
                ],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder={current === 'project' ? '用户名' : '管理员账户'}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={submitLoading}
              className={styles.login_form_button}
            >
              登录
            </Button>
          </Form>
        </Content>

        <div className={styles.footer}>
          <span>技术支持电话：18071146158</span>
          <span>如电话繁忙，请通过邮箱进行咨询：Rayplus@ray-sg.com</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(Form.create()(Login));
