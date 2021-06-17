import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { Button, Spin, Card, Popconfirm } from 'antd';
import { ClockCircleOutlined, StopOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import styles from './style.less';

interface RemindModalProps {
  dispatch: Dispatch;
  remindInfo: any;
  remindInfoLoading: boolean;
}

const RemindModal: React.FC<RemindModalProps> = (props) => {
  const { dispatch, remindInfo, remindInfoLoading } = props;

  const [data, setData] = useState(remindInfo);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      dispatch({
        type: 'global/fetchRemindInfo',
      });
    }
  }, [visible]);

  useEffect(() => {
    console.log('remindInfo', remindInfo);
    if (remindInfo) {
      setData(remindInfo);
    }
  }, [remindInfo]);

  const showModal = () => {
    setVisible(true);
  };

  const CardGrid = (gridProps: { gridData: any }) => {
    const { gridData } = gridProps;

    const closeRemind = (id: any, nextFollowupTime: any) => {
      dispatch({
        type: 'global/closeRemind',
        payload: { id, nextFollowupTime },
      });
    };

    return (
      <Card.Grid style={{ width: '100%', textAlign: 'left' }}>
        <p>住院号：{gridData.hospitalNumber}</p>
        <p>身份证号：{gridData.idNumber}</p>
        <p>姓名：{gridData.patientName}</p>
        <p>电话号码：{gridData.phoneNumber1}</p>
        <p>下次随访时间：{gridData.nextFollowupTime?.split(' ')[0]}</p>
        <Popconfirm
          title="确认关闭这个随访提醒吗？"
          onConfirm={() => {
            closeRemind(gridData.id, gridData.nextFollowupTime?.split(' ')[0]);
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button type="default" className={styles.closeBtn} danger>
            <StopOutlined />
            关闭随访提醒
          </Button>
        </Popconfirm>
      </Card.Grid>
    );
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginRight: '1rem', marginBottom: '1rem' }}
      >
        <ClockCircleOutlined /> 随访提醒
      </Button>
      <Modal
        title="随访提醒"
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <Spin spinning={remindInfoLoading}>
          <Card title="待随访病人" bodyStyle={{ padding: 0 }}>
            {data?.map((item: any) => {
              return <CardGrid gridData={item} />;
            })}
          </Card>
        </Spin>
      </Modal>
    </>
  );
};

const mapStateToProps = ({
  global,
  loading,
}: {
  global: any;
  loading: { effects: { [key: string]: boolean } };
}) => {
  // console.log('global', global);
  return {
    remindInfo: global.remindInfo,
    remindInfoLoading: loading.effects['global/fetchRemindInfo'],
  };
};

export default connect(mapStateToProps)(RemindModal);
