/*
 * @Descripttion: 项目的首页
 * @Author: linkenzone
 * @Date: 2020-09-10 20:12:23
 * table使用了 pro-table
 * https://procomponents.ant.design/components/table
 */

import React, { useEffect, useState } from 'react';
import { connect, Dispatch, history } from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import {
  Button,
  Space,
  Tooltip,
  Select,
  Input,
  Pagination,
  Popconfirm,
  Form,
  Row,
  Col,
  Modal,
} from 'antd';
import {
  ExportOutlined,
  FilterOutlined,
  LeftOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import RemindModal from '@/components/RemindModal';
import { DelDuplicateNodes } from '@/components/patDiaTree/util';
import { StateType as GlobalStateType } from '@/models/global';
import { ResearchCentersDataType, UseInfoDataType, UserAuthsDataType } from '@/models/data';
import Cookies from 'js-cookie';
import { FuvListItemDataType } from './data';
import { StateType } from './model';
import style from './style.less';
import SearchForm from './forms/searchForm';
import ExportForm from './forms/exportForm';
import AddSampleModal from './Modals/addSample';
import { ConnectedUnchangedListModal } from '@/extensions/message';

type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

const { Search } = Input;
const { Option } = Select;

interface FuvListProps {
  FuvList: FuvListItemDataType[];
  userAuths: UserAuthsDataType;
  FuvListTotal: number;
  FuvListLoading: boolean;
  SampleExportLoading: boolean;
  FuvAllPids: [];
  researchCenters: ResearchCentersDataType[];
  dispatch: Dispatch;
}

const FuvListPage: React.FC<FuvListProps> = (props) => {
  const {
    userAuths,
    FuvList,
    FuvListTotal,
    FuvListLoading,
    researchCenters,
    SampleExportLoading,
    // FuvAllPids,
    dispatch,
  } = props;

  const [addSampleModalVisable, setAddSampleModalVisable] = useState(false);

  const [userInfo, setUserInfo] = useState<UseInfoDataType>();

  // const [curSelectedIds, setCurSelectedIds] = useState<any[]>([]);

  const [curSearchValue, setCurSearchValue] = useState<{ name: string; value?: string | null }>({
    name: 'patientName',
    value: null,
  });

  const [lastfilterValues, setLastFilterValues] = useState<any>({});

  // page
  const [pageInfo, setPageInfo] = useState({ current: 1, pageSize: 20 });

  // modal 相关
  const [searchModalForm] = Form.useForm();
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  // 导出相关
  const [exportModalVisible, setExportModalVisible] = useState(false);

  // #region 页面相关函数

  /**
   * @description: 刷新页面，不含参数，page为1，size为20
   * @Param:
   */

  const refreshSampleList = () => {
    dispatch({
      type: 'fuvList/fetchFuvList',
      payload: { params: { page: 1, limit: 20 } },
    });
  };

  /**
   * @description: 刷新页面，含当前页面和页面大小
   * @Param:
   */

  const refreshSampleListByPage = (current: number, pageSize: number) => {
    dispatch({
      type: 'fuvList/fetchFuvList',
      payload: { params: { page: current, limit: pageSize } },
    });
  };

  /**
   * @description: 刷新页面，含当前页面和，页面大小和搜索参数
   * @Param:
   */

  const refreshSampleListBySearch = (current: number, pageSize: number, values: any) => {
    dispatch({
      type: 'fuvList/fetchFuvList',
      payload: { params: { page: current, limit: pageSize }, body: values },
    });
  };

  const PageSizeHandler = (current: number, size: number) => {
    setPageInfo({ current, pageSize: size });
    refreshSampleListBySearch(current, size, {
      [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
      ...lastfilterValues,
    });
  };

  const PaginationHandler = (page: number, pageSize?: number | undefined) => {
    setPageInfo({ current: page, pageSize: pageSize || 20 });
    refreshSampleListBySearch(page, pageSize || 20, {
      [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
      ...lastfilterValues,
    });
  };

  const handleSearchChange = (value: any) => {
    console.log(`setCurSearchType : ${value}`);
    setCurSearchValue({ name: value });
  };

  const on_Search_change = (value: any) => {
    console.log(`on_Search_change : ${value}`);
    setCurSearchValue({ ...curSearchValue, value: value || null });
    // 会回到第一页
    setPageInfo({ ...pageInfo, current: 1 });
    refreshSampleListBySearch(1, pageInfo.pageSize, {
      [curSearchValue.name]: value || undefined,
      ...lastfilterValues,
    });
  };

  // #endregion

  // 仅在组件渲染的时候调用一次 userAuths
  useEffect(() => {
    const use_info = Cookies.get('userInfo');
    console.log('use_info', use_info);
    let _use_info;
    if (use_info) {
      _use_info = JSON.parse(use_info);
      setUserInfo(_use_info);
    }
    dispatch({
      type: 'global/fetchResearchCentersList',
      payload: {},
    });
    if (_use_info) {
      dispatch({
        type: 'global/fetchUserAuths',
        payload: { body: { user_id: _use_info.id, project_id: 5 } },
      });
    }
    refreshSampleList();

    // 清空pids
    dispatch({
      type: 'exportData/saveFormData',
      payload: { pids: [] },
    });
  }, []);

  useEffect(() => {
    console.log('userAuths', userAuths);
  }, [userAuths]);

  const rowSelection_change = (selectedRowKeys: any, selectedRows: any) => {
    const ids = [];
    for (const item of selectedRows) {
      ids.push(item.id);
    }

    console.log('ids', ids);

    dispatch({
      type: 'exportData/saveFormData',
      payload: { pids: ids },
    });
  };

  // #region 表头的设置
  const columns: ProColumns<FuvListItemDataType>[] = [
    {
      title: '编号',
      // width: 100,
      align: 'center',
      dataIndex: 'patNumber',
      responsive: ['sm'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '中心',
      align: 'center',
      // shouldCellUpdate: (record, prevRecord) => {
      //   return record !== prevRecord;
      // },
      dataIndex: 'research_center_id',
      responsive: ['sm'] as Breakpoint[],
      render: (text: any) => {
        let _text = '';
        if (researchCenters) {
          for (const item of researchCenters) {
            if (item.id === text) {
              _text = item.name;
            }
          }
        }
        return (
          <Tooltip placement="top" title={_text}>
            <span className={style.custom_table_ellipsis}>{_text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '住院号/就诊号',
      // width: 120,
      align: 'center',
      dataIndex: 'hospitalNumber',
      responsive: ['sm'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '姓名',
      width: 100,
      align: 'center',
      dataIndex: 'patientName',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '身份证号',
      // width: 80,
      align: 'center',
      dataIndex: 'idNumber',
      responsive: ['md'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '联系方式',
      // width: 80,
      // ellipsis: true,
      align: 'center',
      dataIndex: 'phoneNumber',
      responsive: ['md'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '性别',
      width: 60,
      // ellipsis: true,
      align: 'center',
      dataIndex: 'gender',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      valueEnum: {
        1: { text: '男' },
        0: { text: '女' },
      },
    },
    {
      title: '年龄',
      width: 60,
      // ellipsis: true,
      align: 'center',
      responsive: ['md'] as Breakpoint[],
      dataIndex: 'age',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
    },
    {
      title: '病理诊断',
      // width: 80,
      // ellipsis: true,
      align: 'center',
      dataIndex: 'patDia',
      responsive: ['lg'] as Breakpoint[],
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
      render: (text, record) => {
        // console.log('执行...', record.patDia);
        let _text = '-';
        if (record.patDia) {
          _text = DelDuplicateNodes(record.patDia.radio ? record.patDia.radio.toString() : '');
          if (record.patDia.other) {
            if (_text === '-' || _text === '') {
              _text = `其他-${record.patDia.other}`;
            } else {
              _text += `,其他-${record.patDia.other}`;
            }
          }
        }

        return (
          <Tooltip placement="top" title={_text}>
            <span className={style.custom_table_ellipsis}>{_text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '生存状态',
      width: 80,
      // ellipsis: true,
      align: 'center',
      responsive: ['md'] as Breakpoint[],
      dataIndex: 'livSta',
      shouldCellUpdate: (record, prevRecord) => {
        return record !== prevRecord;
      },
    },
    {
      title: '操作',
      align: 'center',
      valueType: 'option',
      width: 140,
      // shouldCellUpdate: (record, prevRecord) => {
      //   return record !== prevRecord;
      // },
      render: (text, record) => (
        <Space size="small">
          <a
            className="custom_toolbar_buttom"
            key="show"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              history.push(`/detail/${record.id}/baselineInfo`);
            }}
          >
            查看
          </a>
          {userAuths.can_deleteCRF ? (
            <Popconfirm
              key="delete"
              title="确认要删除这一条记录?"
              placement="topRight"
              onConfirm={() => {
                dispatch({
                  type: 'fuvList/deleteFuv',
                  payload: { body: { ids: [record.id] } },
                }).then(() => {
                  refreshSampleListBySearch(pageInfo.current, pageInfo.pageSize, {
                    [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
                    ...lastfilterValues,
                  });
                });
              }}
              okText="是"
              cancelText="否"
            >
              <a className="custom_toolbar_buttom_danger">删除</a>
            </Popconfirm>
          ) : (
            <a className="custom_toolbar_buttom_danger_disable">删除</a>
          )}
        </Space>
      ),
    },
  ];
  // #endregion

  /**
   * @description: 搜索表单提交
   * @Param:
   */

  const onSearchModalFinish = (values: any) => {
    setPageInfo({ ...pageInfo, current: 1 });
    // 两层去掉null 和 空对象
    for (const key in values) {
      if (values[key] === null || JSON.stringify(values[key]) === '{}') {
        delete values[key];
      } else if (Object.prototype.toString.call(values[key]) === '[object Object]') {
        for (const _key in values[key]) {
          if (values[key][_key] === null) {
            delete values[key][_key];
          }
        }
      }
    }
    if (values.genes) {
      if (values.genes.length === 0) {
        values.genes = undefined;
      }
    }
    if (values.traSite) {
      if (values.traSite.length === 0) {
        values.traSite = undefined;
      }
    }

    if (values.patDia) {
      // 去掉patDia的 other部分
      if (values.patDia.radio === 0) {
        values.patDia = undefined;
      } else {
        values.patDia = values.patDia.radio;
      }
    }
    // 删除 undefined
    for (const key in values) {
      if (values[key] === undefined) {
        delete values[key];
      }
    }

    // 处理trement
    if (values.therapy_method) {
      if (
        values.therapy_method.treSolu === 'surgery' ||
        values.therapy_method.treSolu === 'radiotherapy'
      ) {
        values.therapy_method.trement = values.therapy_method.treSolu;
        delete values.therapy_method.treSolu;
      }
    }
    console.log('value', values);

    setLastFilterValues(values);
    refreshSampleListBySearch(1, pageInfo.pageSize, {
      ...values,
      [curSearchValue.name]: curSearchValue.value ? curSearchValue.value : undefined,
    });
    // dispatch({
    //   type: 'fuvList/fetchFuvList',
    //   payload: { params: { page: 1, limit: pageInfo.pageSize }, body: values },
    // });
    setSearchModalVisible(false);
  };

  /**
   * @description: 搜索表单打开
   * @Param:
   */

  const onSearchModalOpen = () => {
    setSearchModalVisible(true);
  };

  // const getSearchName = () => {
  //   const searchItemList: string[] = [];
  //   Object.keys(curSearchValue).forEach((key) => {
  //     console.log('key', key);
  //     searchItemList.push(key);
  //   });
  //   return searchItemList.toString();
  // };

  return (
    <>
      <div
        style={{ maxWidth: '1600px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '1rem' }}
      >
        <div
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid #f0f0f0',
          }}
        >
          <Button type="primary" style={{ marginLeft: 0 }}>
            <a href={RBAC_URL}>
              <LeftOutlined /> 返回
            </a>
          </Button>
          <div style={{ display: 'inline-block', marginLeft: '1rem' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>随访系统</span>
          </div>
        </div>
        <ProTable
          loading={FuvListLoading}
          columns={columns}
          search={false}
          pagination={false}
          dataSource={FuvList}
          // scroll={{ x: 1080 }}
          tableLayout="fixed"
          className={style.custom_modal_table}
          bordered
          rowKey="id"
          options={{
            reload: () => {
              console.log('执行刷新');
              refreshSampleListByPage(pageInfo.current, pageInfo.pageSize);
              setLastFilterValues({});
              setCurSearchValue({ ...curSearchValue, value: null });
              searchModalForm.resetFields();
            },
            fullScreen: true,
            density: true,
            setting: true,
          }}
          rowSelection={{ onChange: rowSelection_change, columnWidth: 40 }}
          tableAlertRender={({ selectedRowKeys, selectedRows }) => {
            return `当前共选中 ${selectedRowKeys.length} 项 `;
          }}
          tableAlertOptionRender={(table_props: any) => {
            const { onCleanSelected } = table_props;
            return (
              <Space size="large" style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {/* {userAuths.can_export ? (
                  <a
                    onClick={() => {
                      // export_sample(false);
                      // setIsExportAll(false);
                      setExportModalVisible(true);
                    }}
                  >
                    导出数据
                  </a>
                ) : null} */}

                <a onClick={onCleanSelected}>取消选择</a>
              </Space>
            );
          }}
          toolBarRender={() => [
            <span key="total" className="invisible-sm">
              共{FuvListTotal}个样本
            </span>,
            <Button
              key="add_sample"
              type="primary"
              onClick={() => {
                setAddSampleModalVisable(true);
              }}
            >
              <PlusOutlined />
              添加
            </Button>,
          ]}
          headerTitle={
            <div>
              <span
                style={{
                  display: 'block',
                  paddingLeft: '1rem',
                  fontWeight: 'bold',
                  height: '64px',
                  lineHeight: '64px',
                }}
              >
                样本列表
              </span>
            </div>
          }
          tableExtraRender={(_, data) => (
            <Row gutter={[16, 16]} style={{ marginBottom: '1rem' }}>
              <Col lg={18} xs={24}>
                <div
                  style={{ paddingTop: '1rem', paddingLeft: '1rem', border: '1px solid #f0f0f0' }}
                >
                  <Select
                    value={curSearchValue.name}
                    style={{ width: 120, marginRight: '1rem', marginBottom: '1rem' }}
                    onChange={handleSearchChange}
                  >
                    <Option value="patientName">姓名</Option>
                    <Option value="idNumber">身份证号</Option>
                    <Option value="hospitalNumber">住院号</Option>
                    <Option value="patNumber">编号</Option>
                  </Select>
                  <Search
                    placeholder="输入搜索内容"
                    enterButton={<SearchOutlined />}
                    size="middle"
                    style={{ width: 200, marginRight: '1rem', marginBottom: '1rem' }}
                    onSearch={on_Search_change}
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      // setIsExportAll(true);
                      setExportModalVisible(true);
                    }}
                    // loading={SampleExportLoading}
                    style={{ marginRight: '1rem', marginBottom: '1rem' }}
                    disabled={!userAuths.can_export}
                  >
                    <ExportOutlined /> 导出
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      onSearchModalOpen();
                    }}
                    style={{ marginRight: '1rem', marginBottom: '1rem' }}
                    disabled={!userAuths.can_analysis}
                  >
                    <FilterOutlined /> 统计分析
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => {
                      refreshSampleListByPage(pageInfo.current, pageInfo.pageSize);
                      setLastFilterValues({});
                      setCurSearchValue({ ...curSearchValue, value: null });
                      searchModalForm.resetFields();
                    }}
                    style={{ marginRight: '1rem', marginBottom: '1rem' }}
                    disabled={!userAuths.can_analysis}
                  >
                    <RedoOutlined /> 重置筛选
                  </Button>

                  {/* <Button
                    type="primary"
                    onClick={() => {}}
                    style={{ marginRight: '1rem', marginBottom: '1rem' }}
                  >
                    <FileOutlined /> 调查问卷
                  </Button> */}
                  <span style={{ color: '#39bbdb', fontWeight: 'normal', display: 'inline-block' }}>
                    {curSearchValue.value !== null && Object.keys(lastfilterValues).length === 0
                      ? ' 当前筛选:  搜索'
                      : null}
                    {curSearchValue.value === null && Object.keys(lastfilterValues).length !== 0
                      ? '当前筛选:  统计分析'
                      : null}
                    {curSearchValue.value !== null && Object.keys(lastfilterValues).length !== 0
                      ? '当前筛选:  搜索 + 统计分析'
                      : null}
                  </span>
                </div>
              </Col>
              <Col lg={6} xs={24}>
                <div
                  style={{
                    paddingTop: '1rem',
                    paddingLeft: '1rem',
                    border: '1px solid #f0f0f0',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <RemindModal />
                  <ConnectedUnchangedListModal
                    ButtonVisible={true}
                    researchCenters={researchCenters}
                    ButtonStyle={{ marginRight: '24px', marginBottom: '1rem' }}
                  ></ConnectedUnchangedListModal>
                </div>
              </Col>
            </Row>
          )}
          tableRender={(_, dom) => <div style={{ border: '1px solid #f0f0f0' }}>{dom}</div>}
        />

        <Pagination
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 24,
            textAlign: 'center',
            maxWidth: '100%',
          }}
          current={pageInfo.current}
          pageSize={pageInfo.pageSize}
          total={FuvListTotal}
          showSizeChanger
          onChange={PaginationHandler}
          onShowSizeChange={PageSizeHandler}
          responsive
          showTotal={(total) => `共有 ${total} 个样本`}
        />
      </div>

      <Modal
        title={null}
        visible={SampleExportLoading}
        footer={null}
        closable={false}
        // bodyStyle={{ backgroundColor: '#dbf8ff' }}
        // maskStyle={{ backgroundColor: '#fff0' }}
        className={style.custom_modal}
      >
        <div
          style={{
            height: '180px',
            textAlign: 'center',
            color: '#64e0ff',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          <span style={{ display: 'block', paddingTop: '7%' }}>
            <LoadingOutlined style={{ fontSize: 36 }} spin />
          </span>
          <span style={{ display: 'block', paddingTop: '4%' }}>正在导出...</span>
        </div>
      </Modal>

      <SearchForm
        modalVisible={searchModalVisible}
        modalForm={searchModalForm}
        onModalClose={() => {
          setSearchModalVisible(false);
        }}
        onModalFinish={onSearchModalFinish}
      />

      <AddSampleModal
        addSampleModalVisable={addSampleModalVisable}
        setAddSampleModalVisable={setAddSampleModalVisable}
        refreshSampleList={() => {
          refreshSampleList();
          setCurSearchValue({ ...curSearchValue, value: null });
          setLastFilterValues({});
        }}
      />

      <ExportForm
        modalVisible={exportModalVisible}
        onModalClose={() => {
          setExportModalVisible(false);
        }}
      />
    </>
  );
};

const mapStateToProps = ({
  fuvList,
  global,
  loading,
}: {
  fuvList: StateType;
  global: GlobalStateType;
  loading: { effects: Record<string, boolean> };
}) => {
  return {
    userAuths: global.userAuths,
    FuvList: fuvList.fuvList,
    FuvListTotal: fuvList.total,
    FuvAllPids: fuvList.all_pids,
    researchCenters: global.researchCenters,
    FuvListLoading: loading.effects['fuvList/fetchFuvList'],
    SampleExportLoading: loading.effects['fuvList/exportFuv'],
  };
};

export default connect(mapStateToProps)(FuvListPage);
