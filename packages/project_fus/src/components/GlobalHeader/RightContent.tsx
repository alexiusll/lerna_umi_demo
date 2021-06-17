/*
 * @Author: linkenzone
 * @Date: 2020-10-20 14:15:52
 * @Descripttion: Do not edit
 */
// 通用的Header右侧菜单

import React, { useEffect, useState } from 'react';
import { Avatar, Menu, Dropdown, Modal } from 'antd';
import { connect } from 'umi';
import { UserOutlined, HighlightOutlined, LogoutOutlined } from '@ant-design/icons';
import type { UseInfoDataType } from '@/models/data';
import Cookies from 'js-cookie';
import { unsetAllCookies } from '@/utils/cookie';
import styles from './index.less';

interface GlobalHeaderRightProps {
  onClickSign: () => void;
}

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = (props) => {
  const { onClickSign } = props;
  const [userInfo, setUserInfo] = useState<UseInfoDataType>();
  const className = styles.right;

  // 仅在组件渲染的时候调用一次
  useEffect(() => {
    const use_info = Cookies.get('userInfo');
    // console.log('use_info', use_info);
    if (use_info) {
      setUserInfo(JSON.parse(use_info));
    }
  }, []);

  const onClickOut = () => {
    Modal.confirm({
      title: '确认退出登录？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 清空cookie
        unsetAllCookies();
        window.location.href = `${window.location.origin}/#/login`;
      },
    });
  };

  const menu = (
    <Menu style={{ width: 108, textAlign: 'center' }}>
      {/* <Menu.Item
        style={{ fontWeight: 700, fontSize: '14px', fontFamily: 'initial' }}
        onClick={() => onClickSign()}
      >
        <HighlightOutlined />
        用户签名
      </Menu.Item> */}

      <Menu.Divider />

      <Menu.Item
        danger
        style={{ fontWeight: 700, fontSize: '14px', fontFamily: 'initial' }}
        onClick={() => onClickOut()}
      >
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={className}>
      <h2
        style={{
          fontSize: '16px',
          lineHeight: '48px',
          color: '#39bbdb',
          marginRight: '1rem',
          height: '48px',
        }}
        className="invisible-sm"
      >
        您好,{userInfo?.name}
      </h2>
      <Dropdown overlay={menu} placement="bottomCenter">
        <a style={{ height: '48px' }}>
          <Avatar icon={<UserOutlined />} />
        </a>
      </Dropdown>
    </div>
  );
};

export default connect()(GlobalHeaderRight);
