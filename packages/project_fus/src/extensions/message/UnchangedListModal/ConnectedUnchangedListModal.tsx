/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: linkenzone
 * @Date: 2021-05-17 19:20:19
 * @Descripttion: Do not edit
 */
import { Badge, Button, List, Modal, Spin } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import type { Dispatch } from 'dva';
import { connect } from 'dva';
import { history } from 'umi';

import { addDateToCookies, IsNotifications } from '../utils/date';

import type { StateType } from '@/models/extensions/notifications';
import { ClockCircleOutlined } from '@ant-design/icons';

type MessageModalProps = {
  ButtonVisible?: boolean;
  ButtonStyle?: React.CSSProperties;
  researchCenters?: any;
  isPopUp?: boolean;

  UnchangedList?: { patients: any[]; total: number };
  isModalVisible: boolean;
  fetchUnchangedListLoading: boolean;
  dispatch: Dispatch;
};

const MessageModal: React.FC<MessageModalProps> = (props) => {
  const {
    ButtonVisible,
    ButtonStyle,
    researchCenters,
    isPopUp,

    isModalVisible,
    dispatch,
    UnchangedList,
    fetchUnchangedListLoading,
  } = props;

  useEffect(() => {
    console.log('researchCenters', researchCenters);
  }, [researchCenters]);

  useEffect(() => {
    console.log('isModalVisible change', isModalVisible);
    if (isModalVisible === true) {
      // dispatch({
      //   type: 'notifications/fetchUnchangedList',
      //   payload: {},
      // });
    }
  }, [isModalVisible]);

  const setIsModalVisible = (_isModalVisible: boolean) => {
    dispatch({
      type: 'notifications/changeModalVisible',
      payload: _isModalVisible,
    });
  };

  useEffect(() => {
    if (!UnchangedList) return;
    // 检查是否有 待完善病人
    if (UnchangedList?.total > 0) {
      // 检查当日是否已经提醒过
      if (IsNotifications() || !isPopUp) return;
      addDateToCookies();
      setIsModalVisible(true);
    }
  }, [UnchangedList]);

  useEffect(() => {
    // 请求
    dispatch({
      type: 'notifications/fetchUnchangedList',
      payload: {},
    });
    return () => {
      // 退出时 清除状态
      setIsModalVisible(false);
    };
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (id: number) => {
    history.push(`/detail/${id}/baselineInfo`);
  };

  return (
    <>
      {ButtonVisible ? (
        <Badge count={UnchangedList?.total} overflowCount={999} offset={[-24, 4]}>
          <Button onClick={showModal} type="primary" style={ButtonStyle}>
            <ClockCircleOutlined />
            待完善病人
          </Button>
        </Badge>
      ) : null}

      <Modal
        title="待完善的病人信息"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Spin spinning={fetchUnchangedListLoading}>
          <List
            itemLayout="horizontal"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
              style: { textAlign: 'center' },
            }}
            dataSource={UnchangedList?.patients}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  description={
                    <>
                      <div>编号:{item.patNumber}</div>
                      {researchCenters ? (
                        <div>中心:{researchCenters[item.research_center_id - 1].name}</div>
                      ) : null}
                      <div>住院号/就诊号:{item.hospitalNumber}</div>
                      <div>身份证号:{item.idNumber}</div>
                    </>
                  }
                  title={
                    <a
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    >
                      {item.patientName}
                    </a>
                  }
                />
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                  >
                    编辑
                  </Button>
                </div>
              </List.Item>
            )}
          ></List>
        </Spin>
      </Modal>
    </>
  );
};

MessageModal.defaultProps = {
  ButtonVisible: false,
  isPopUp: false,
};

const mapStateToProps = ({
  notifications,
  loading,
}: {
  notifications: StateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    UnchangedList: notifications.UnchangedList,
    isModalVisible: notifications.isUnchangedListModalVisible,
    fetchUnchangedListLoading: loading.effects['notifications/fetchUnchangedList'],
  };
};

const ConnectedMessageModal = connect(mapStateToProps)(MessageModal);

export default ConnectedMessageModal;
