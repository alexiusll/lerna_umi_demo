import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
// import router from 'umi/router'
import { history } from 'umi';
import { Button, Modal, ConfigProvider, Tooltip, Popover, Icon, message, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import ChangePasswordModal from '@/components/ChangePasswordModal';

// import UploadFile from '@/components/UploadFile'
import CookieUtil from '@/utils/cookie';
// import { post_prefix } from '@/utils/request'
import RayPlus from '@/assets/rayplus.png';
import styles from './index.css';

class PageHeader extends React.Component {
  state = {
    visible: false,
    file_status: 0,
  };

  static propTypes = {
    location: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired,
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '确认退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 清空cookie
        CookieUtil.unsetAll();
        //CookieUtil.unset('ALTER_can_export')
        //删除储存的tokens
        dispatch({ type: 'login/clear_tokens' });
        history.push('/login');
      },
    });
    this.setState({ visible: false });
  };

  handleStatusChange = (status, name) => {
    if (status === 'uploading') {
      this.setState({ file_status: 1 });
    } else if (status === 'done') {
      message.success(`${name} 上传成功！`);
      this.setState({ file_status: 0, visible: false });
      const { dispatch } = this.props;

      // forceUpdate强制刷新 更新至查看签名状态
      dispatch({
        type: 'global/fetchSignature',
      }).then(() => this.forceUpdate());
    } else if (status === 'error') {
      message.success(`${name} 上传失败！`);
      this.setState({ file_status: 0, visible: false });
    }
  };

  handleLookSignature = () => {
    this.setState({ visible: false });
    const user_signature = CookieUtil.get('user_signature');

    Modal.info({
      title: '签名图片',
      width: 'auto',
      centered: true,
      content: (
        <div>
          <img
            className={styles.user_sign}
            src={`${API_AUTH_URL}/static/tempFiles${user_signature.substring(1)}`}
            alt="用户签名"
          ></img>
        </div>
      ),
      icon: <Icon type="file-image" />,
      maskClosable: true,
      okText: '确定',
    });
  };

  handleOpenPopover = () => {
    this.setState({ visible: !this.state.visible });
  };

  handlePasswordCancel = () => {
    this.setState({ password_visible: false });
  };

  render() {
    const { location, children, loading } = this.props;
    const { pathname } = location;
    const { visible, file_status, password_visible } = this.state;
    const submitLoading = loading.effects['user/postUser'];

    let title,
      ifSign = false;

    // 动态确定当前页面标题
    if (/^\/project\/?$/.test(pathname)) {
      ifSign = true;
      title = '临床试验项目';
      document.title = '临床试验项目';
    } else if (/auth\/system/.test(pathname)) {
      ifSign = false;
      title = '权限管理系统';
      document.title = '权限管理系统';
    }

    // 获取用户签名 和 用户信息
    // const user_signature = CookieUtil.get('user_signature')
    const userInfo = JSON.parse(CookieUtil.get('userInfo'));
    const { name = '' } = userInfo;

    const user_content = (
      <>
        <Spin spinning={file_status === 1} tip={'签名上传中...'}>
          {/* <div className={styles.user_button} style={{ display: ifSign ? 'block' : 'none' }}>
            {user_signature && user_signature != 'null' ? (
              <Button type="primary" size="small" icon="file-image" onClick={this.handleLookSignature}>
                查看签名
              </Button>
            ) : (
              <UploadFile
                accept="image/jpeg,image/png"
                action="/signature"
                handleStatusChange={this.handleStatusChange}
              >
                <Tooltip title="支持jpg/png格式的图片">
                  <Button type="primary" size="small" icon="cloud-upload">
                    上传签名
                  </Button>
                </Tooltip>
              </UploadFile>
            )}
          </div> */}
          <div className={styles.user_button}>
            <Button
              type="primary"
              size="small"
              icon="poweroff"
              onClick={() => {
                this.setState({ password_visible: true });
              }}
            >
              修改密码
            </Button>
          </div>
          <div className={styles.user_button}>
            <Button type="danger" size="small" icon="poweroff" onClick={this.handleLogout}>
              退出登录
            </Button>
          </div>
        </Spin>
      </>
    );

    return (
      <>
        <div className={styles.navigator_content}>
          <div className={styles.navigator_bar}>
            <div>
              <img className={styles.login_img} src={RayPlus} alt="RayPlus" />
              <span className={styles.title}>{title}</span>
            </div>
            <div>
              <span className={styles.user_title}>您好，{name}</span>
              <Popover placement="bottom" content={user_content} visible={visible}>
                <Button shape="circle" icon="user" onClick={this.handleOpenPopover} />
              </Popover>
            </div>
          </div>
        </div>
        <ConfigProvider locale={zhCN}>
          <div className="body_content">{children}</div>
        </ConfigProvider>

        <ChangePasswordModal
          record={{ id: userInfo.id }}
          visible={password_visible}
          handleCancel={this.handlePasswordCancel}
          submitLoading={submitLoading}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
  };
}

export default connect(mapStateToProps)(PageHeader);
