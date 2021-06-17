/*
 * @Author: linkenzone
 * @Date: 2021-05-29 14:50:05
 * @Descripttion: Do not edit
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Upload, message } from 'antd';
import CookieUtil from '@/utils/cookie';
// import { post_prefix } from '@/utils/request'
import { judgeIsSubmit } from '@/utils/util';

export default class UploadFile extends React.Component {
  static propTypes = {
    cycle_status: PropTypes.array,
    cycle_number: PropTypes.number,
    accept: PropTypes.string,
    action: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    handleStatusChange: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  handleFileChange = (info) => {
    const { handleStatusChange } = this.props;

    handleStatusChange(info.file.status, info.file.name);
  };

  beforeUpload = (file) => {
    const { cycle_status, cycle_number } = this.props;

    if (judgeIsSubmit(cycle_status, cycle_number)) {
      message.error('该访视已提交，暂不能上传文件!');
      return;
    }
    if (!CookieUtil.get('token')) {
      message.error('登录状态过期，请重新登录!');
      return false;
    }

    const isLt20M = file.size / 1024 / 1024 < 10;

    if (!isLt20M) {
      message.error(`文件大小须在10mb以内！${file.name}无法上传。`);
    }
    return isLt20M;
  };

  render() {
    const { accept = '*', action, multiple = false, children } = this.props;

    return (
      <Upload
        accept={accept}
        action={API_AUTH_URL + action}
        method="POST"
        beforeUpload={this.beforeUpload}
        headers={{ Authorization: `Bearer ${CookieUtil.get('token')}` }}
        listType="text"
        multiple={multiple}
        name="file"
        showUploadList={false}
        onChange={this.handleFileChange}
      >
        {children}
      </Upload>
    );
  }
}
