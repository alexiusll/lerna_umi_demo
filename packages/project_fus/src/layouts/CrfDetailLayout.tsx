import { getPid, getPidAndTreNum } from '@/utils/location';
import {
  ClockCircleOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  FileAddOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { Layout, Button, Menu, PageHeader, Modal, Spin, Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch, history } from 'umi';
import { StateType as GlobalStateType } from '@/models/global';
import { PatientDataType } from '@/pages/detail/CardContent/BaseInfo/data';
import { StateType as PatientStateType } from '@/pages/detail/CardContent/BaseInfo/model';
import style from './index.less';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

interface CrfDetailLayoutProps {
  navNumber: number;
  navLoading: boolean;
  patientInfo?: PatientDataType;
  location: any;
  dispatch: Dispatch;
}

const formItemLayout = {
  labelCol: { xl: { span: 4 }, md: { span: 6 } },
  wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
};

const CrfDetailLayout: React.FC<CrfDetailLayoutProps> = (props) => {
  const { children, patientInfo, navLoading, navNumber, dispatch } = props;

  const [selectedKeys, setSelectedKeys] = useState(['']);
  const [menuOpenKeys, setMenuOpenKeys] = useState(['TreatmentInfo']);
  const [pid, setPid] = useState(-404);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [modalForm] = Form.useForm();

  const add_record_info = () => {
    Modal.confirm({
      content: '确认增加一个治疗记录',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'global/addRecordInfo',
          payload: { pid },
        }).then(() => {
          // dispatch({
          //   type: 'global/fetchNav',
          //   payload: { pid },
          // });
          history.push(`/detail/${pid}/TreatmentInfo/${navNumber + 1}`);
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const del_record_info = () => {
    Modal.confirm({
      content: '确认删除最后一个治疗记录',
      icon: <DeleteOutlined />,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'global/deleteRecordInfo',
          payload: { pid },
        }).then(() => {
          const { treNum: _treNum } = getPidAndTreNum();
          if (_treNum === navNumber) {
            if (navNumber > 1) {
              history.push(`/detail/${pid}/TreatmentInfo/${navNumber - 1}`);
            } else {
              history.push(`/detail/${pid}/baselineInfo`);
            }
          } else {
            // console.log('fetchNav');
            dispatch({
              type: 'global/fetchNav',
              payload: { pid },
            });
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onClickOpenMenu = (openKeys: any) => {
    // console.log('onClickOpenMenu openKeys', openKeys);
    setMenuOpenKeys(openKeys);
  };

  const onClickMenuItem = async ({ keyPath }: any) => {
    // console.log('onClickMenuItem keyPath', keyPath);
    if (keyPath[0] === 'add') {
      // add_record_info();
      setAddModalVisible(true);
    } else if (keyPath[0] === 'delete') {
      del_record_info();
    } else {
      setSelectedKeys(keyPath);
      const re_keyPath = keyPath.reverse();
      let url = '';
      re_keyPath.forEach((element: string) => {
        url += `/${element}`;
      });
      history.push(`/detail/${pid}${url}`);
    }
  };

  const set_menu_selected = () => {
    const { hash } = window.location;
    const path_list = hash.split('/');
    let Keys_list = [];
    if (path_list[4]) {
      Keys_list = [path_list[3], path_list[4]];
      // setMenuOpenKeys([path_list[3]]);
      setSelectedKeys(Keys_list);
    } else {
      Keys_list = [path_list[3]];
      // setMenuOpenKeys([path_list[3]]);
      // setMenuOpenKeys(['TreatmentInfo']);
      setSelectedKeys(Keys_list);
    }
  };

  // 地址改变的时候调用一次
  useEffect(() => {
    const _pid = getPid();
    if (_pid && _pid !== -404) {
      dispatch({
        type: 'patient/fetchPatient',
        payload: { pid: _pid },
      });
    }
    // return () => {
    //   console.log('[] 清除');
    // };
  }, []);

  // 地址改变的时候调用一次
  useEffect(() => {
    const _pid = getPid();
    dispatch({
      type: 'global/fetchNav',
      payload: { pid: _pid },
    });
    setPid(_pid);
    set_menu_selected();
    // return () => {
    //   console.log('[] 清除');
    // };
  }, [props.location]);

  // // 仅在组件渲染的时候调用一次
  // useEffect(() => {
  //   const _pid = getPid();
  //   dispatch({
  //     type: 'global/fetchNav',
  //     payload: { pid: _pid },
  //   });
  //   setPid(_pid);
  //   set_menu_selected();
  //   // return () => {
  //   //   console.log('[] 清除');
  //   // };
  // }, []);

  const tre_nav = () => {
    const list = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < navNumber; i++) {
      list.push(i + 1);
    }
    return list.map((item) => <Menu.Item key={item}>治疗信息{item}</Menu.Item>);
  };

  return (
    <>
      <div
        style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          maxWidth: '1600px',
          paddingBottom: '48px',
          paddingTop: '12px',
        }}
      >
        <PageHeader
          // ghost={false}
          className="site-page-header"
          title={
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ width: '180px' }}>
                <Button type="primary" onClick={() => history.push('/')}>
                  <LeftOutlined />
                  返回
                </Button>
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  whiteSpace: 'normal',
                }}
              >
                <span className={style.custom_text_span}>姓名: {patientInfo?.patientName}</span>
                <span className={style.custom_text_span}>身份证号: {patientInfo?.idNumber}</span>
                <span className={style.custom_text_span}>
                  住院号/就诊号: {patientInfo?.hospitalNumber}
                </span>
                <span className={style.custom_text_span}>
                  电话号码: {patientInfo?.phoneNumber1}
                </span>
              </div>
            </div>
          }
          // subTitle="病人的基线资料"
          // onBack={() => window.history.back()}
          style={{ marginBottom: '12px' }}
        />
        <Layout style={{ margin: '0', backgroundColor: 'white' }}>
          <Sider
            // width={200}
            className="site-layout-background"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
            // style={{ zIndex: 100 }}
          >
            <Spin spinning={navLoading}>
              <Menu
                mode="inline"
                onClick={onClickMenuItem}
                onOpenChange={onClickOpenMenu}
                openKeys={menuOpenKeys}
                selectedKeys={selectedKeys}
                style={{
                  border: '1px solid rgb(235, 237, 240)',
                }}
              >
                <Menu.Item key="baselineInfo" icon={<DatabaseOutlined />}>
                  基线资料
                </Menu.Item>
                <SubMenu key="TreatmentInfo" icon={<DatabaseOutlined />} title="治疗信息">
                  {navNumber > 0 ? tre_nav() : null}
                  <Menu.Item key="add">
                    <span style={{ color: '#39bbdb' }}>
                      新增&nbsp;&nbsp;
                      <FileAddOutlined />
                    </span>
                  </Menu.Item>
                  <Menu.Item key="delete">
                    <span style={{ color: '#faad14' }}>
                      删除&nbsp;&nbsp;
                      <DeleteOutlined />
                    </span>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="FollowUpInfo" icon={<DatabaseOutlined />}>
                  随访信息
                </Menu.Item>
                <Menu.Item key="Remind" icon={<ClockCircleOutlined />}>
                  随访提醒
                </Menu.Item>
              </Menu>
            </Spin>
          </Sider>
          <Content style={{ width: 0 }}>{children}</Content>
        </Layout>
      </div>

      <Modal
        title="新增治疗信息"
        visible={addModalVisible}
        onOk={() => {
          modalForm.submit();
        }}
        onCancel={() => {
          setAddModalVisible(false);
        }}
      >
        <Form
          form={modalForm}
          labelAlign="left"
          onFinish={(value) => {
            console.log('value', value);
            dispatch({
              type: 'global/addRecordInfo',
              payload: { pid, body: value },
            }).then(() => {
              history.push(`/detail/${pid}/TreatmentInfo/${navNumber + 1}`);
              setAddModalVisible(false);
            });
          }}
          {...formItemLayout}
        >
          <Form.Item
            label="几线治疗"
            name="trement"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Select style={{ width: 120 }}>
              <Option value="one">1线</Option>
              <Option value="two">2线</Option>
              <Option value="three">3线</Option>
              <Option value="four">4线</Option>
              <Option value="five">5线</Option>
              <Option value="surgery">手术</Option>
              <Option value="radiotherapy">放疗</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = ({
  loading,
  global,
  patient,
}: {
  loading: { effects: { [key: string]: boolean } };
  global: GlobalStateType;
  patient: PatientStateType;
}) => {
  return {
    navNumber: global.nav,
    navLoading: loading.effects['global/fetchNav'],
    patientInfo: patient.patientInfo,
  };
};

export default connect(mapStateToProps)(CrfDetailLayout);
