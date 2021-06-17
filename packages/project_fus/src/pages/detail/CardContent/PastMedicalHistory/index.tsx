/* eslint-disable react/jsx-boolean-value */

/*
 * @Descripttion: 既往史表单内容
 * @Author: linkenzone
 * @Date: 2020-09-14 17:22:42
 */
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Spin,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { getMultipleChoiceGet, getMultipleChoicePost } from '@/utils/util';
import { StateType } from './model';
import { PastHistoryDataType, DrugHistoryDataType, HormoneHistoryDataType } from './data';
import { ModifyDrugHistory } from './service';

type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface PastHistoryContentProps {
  dispatch: Dispatch;
  pastHistory?: PastHistoryDataType;
  hormoneHistory: HormoneHistoryDataType[];
  drugHistory: DrugHistoryDataType[];
  pastHistoryLoading: boolean;
  drugHistoryLoading: boolean;
  pid: number;
}

const formItemLayout = {
  labelCol: { xl: { span: 4 }, md: { span: 6 } },
  wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
};

const formItemLayoutOffset = {
  labelCol: { xl: { span: 4, offset: 4 }, md: { span: 6 } },
  wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
};

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

const formItemLayoutNoLable = {
  wrapperCol: {
    xl: { span: 18, offset: 4 },
    md: { span: 18, offset: 6 },
    sm: { span: 18, offset: 0 },
    xs: { span: 18, offset: 0 },
  },
};

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 4 }, md: { span: 6, offset: 6 } },
};

const PastHistoryContent: React.FC<PastHistoryContentProps> = (props) => {
  const {
    pastHistory,
    pastHistoryLoading,
    hormoneHistory,
    drugHistory,
    pid,
    dispatch,
    drugHistoryLoading,
  } = props;

  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  // 基础疾病史 其他
  const [basDisHisOther, setBasDisHisOther] = useState(false);
  // 基础疾病史 其他
  const [infDisHisOther, setInfDisHisOther] = useState(false);
  // 肿瘤史 是/否
  const [tumor, setTumor] = useState(false);
  // 肿瘤史其他
  const [tumHisOther, setTumHisOther] = useState(false);
  // 肿瘤家族史 是/否
  const [tumorFam, setTumorFam] = useState(false);
  // 肿瘤家族史 其他
  const [tumFamHisOther, setTumFamHisOther] = useState(false);
  // 吸烟 是/否
  const [smoke, setSmoke] = useState(false);
  // 戒烟 是/否
  const [stopSmoke, setStopSmoke] = useState(false);
  // 饮酒 是/否
  const [drink, setDrink] = useState(false);
  // 戒酒 是/否
  const [stopDrink, setstopDrink] = useState(false);
  // 是否长期使用激素治疗
  const [hormone, setHormone] = useState(false);
  // 是否长期使用其他药物
  const [drug, setDrug] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>({});
  const [currentRecordType, setCurrentRecordType] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'pastHistory/fetchPastHistory',
      payload: { pid },
    });

    dispatch({
      type: 'pastHistory/fetchDrugHistory',
      payload: { pid, body: { type: 1 } },
    });

    dispatch({
      type: 'pastHistory/fetchDrugHistory',
      payload: { pid, body: { type: 0 } },
    });
    // 销毁的时候
    return () => {};
  }, []);

  useEffect(() => {
    // console.log('useEffect pastHistory', pastHistory);
    if (pastHistory) {
      pastHistory.basDisHis = getMultipleChoiceGet({
        multipleChoice: pastHistory.basDisHis,
        setOther: setBasDisHisOther,
      });

      pastHistory.infDisHis = getMultipleChoiceGet({
        multipleChoice: pastHistory.infDisHis,
        setOther: setInfDisHisOther,
      });

      pastHistory.tumHis = getMultipleChoiceGet({
        multipleChoice: pastHistory.tumHis,
        setOther: setTumHisOther,
      });

      pastHistory.tumFamHis = getMultipleChoiceGet({
        multipleChoice: pastHistory.tumFamHis,
        setOther: setTumFamHisOther,
      });

      setTumor(pastHistory.tumor);
      setTumorFam(pastHistory.tumorFam);

      setSmoke(pastHistory.smoke);
      setStopSmoke(pastHistory.smokingHis?.stopSmoke);
      setDrink(pastHistory.drink);
      setstopDrink(pastHistory.drinkingHis?.stopDrink);

      setHormone(pastHistory.hormone);
      setDrug(pastHistory.drug);
      form.setFieldsValue({ ...pastHistory });
    } else {
      form.resetFields();
      setBasDisHisOther(false);
      setInfDisHisOther(false);
      setTumor(false);
      setTumorFam(false);
      setSmoke(false);
      setStopSmoke(false);
      setDrink(false);
      setstopDrink(false);
      setHormone(false);
      setDrug(false);
    }
  }, [pastHistory]);

  const onFinish = (values: any) => {
    // console.log('处理前 values', values);
    // list需要转换为字符串
    values.basDisHis = getMultipleChoicePost({
      multipleChoice: values.basDisHis,
      other: basDisHisOther,
    });

    values.infDisHis = getMultipleChoicePost({
      multipleChoice: values.infDisHis,
      other: infDisHisOther,
    });

    values.tumHis = getMultipleChoicePost({
      multipleChoice: values.tumHis,
      other: tumHisOther,
    });

    values.tumFamHis = getMultipleChoicePost({
      multipleChoice: values.tumFamHis,
      other: tumFamHisOther,
    });

    // 是否为新增
    if (pastHistory) {
      values.id = pastHistory.id ? pastHistory.id : undefined;
    }
    console.log('values', values);
    dispatch({
      type: 'pastHistory/modifyPastHistory',
      payload: { pid, body: values },
    });
  };

  /**
   * @description: 模态框 点击ok
   * @Param:
   */
  const ModalHandleOk = () => {
    modalForm.submit();
  };

  /**
   * @description: 模态框 点击取消
   * @Param:
   */
  const ModalHandleCancel = () => {
    setModalVisible(false);
  };

  /**
   * @description: 模态框 表达提交
   * @Param:
   */
  const onModalFinish = async (values: any) => {
    setConfirmLoading(true);
    // 判断是否为新增
    if (currentRecord.id !== null) {
      values.id = currentRecord.id;
    }
    values.type = currentRecordType;
    console.log('values', values);
    const res = await ModifyDrugHistory({ pid, body: values });
    if (res) {
      setModalVisible(false);
      setConfirmLoading(false);
      message.success('保存既往史成功！');
      dispatch({
        type: 'pastHistory/fetchDrugHistory',
        payload: { pid, body: { type: currentRecordType } },
      });
    } else {
      setConfirmLoading(false);
      message.error('保存既往史失败！');
    }
  };

  const hormone_table_columns = [
    {
      title: '药物名称',
      dataIndex: 'drug_name',
      ellipsis: true,
    },
    {
      title: '日使用剂量',
      dataIndex: 'drug_dose',
      responsive: ['md'] as Breakpoint[],
    },
    {
      title: '累积使用时间（月）',
      dataIndex: 'use_time',
      responsive: ['lg'] as Breakpoint[],
    },
    {
      title: '操作',
      width: 140,
      render: (text: any, record: any) => (
        <Space size="small">
          <a
            className="custom_toolbar_buttom"
            onClick={() => {
              setModalVisible(true);
              setCurrentRecord(record);
              setCurrentRecordType(1);
              modalForm.setFieldsValue({
                ...record,
              });
            }}
          >
            查看
          </a>
          <Popconfirm
            title="确认要删除这一条记录?"
            onConfirm={() => {
              dispatch({
                type: 'pastHistory/deleteDrugHistory',
                payload: { pid, body: { type: 1, ids: [record.id] } },
              }).then(() => {
                dispatch({
                  type: 'pastHistory/fetchDrugHistory',
                  payload: { pid, body: { type: 1 } },
                });
              });
            }}
            okText="是"
            cancelText="否"
          >
            <a className="custom_toolbar_buttom_danger">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const drug_table_columns = [
    {
      title: '药物名称',
      dataIndex: 'drug_name',
      ellipsis: true,
    },
    {
      title: '日使用剂量',
      dataIndex: 'drug_dose',
      responsive: ['md'] as Breakpoint[],
    },
    {
      title: '累积使用时间（月）',
      dataIndex: 'use_time',
      responsive: ['lg'] as Breakpoint[],
    },
    {
      title: '操作',
      width: 140,
      render: (text: any, record: any) => (
        <Space size="small">
          <a
            className="custom_toolbar_buttom"
            onClick={() => {
              setModalVisible(true);
              setCurrentRecord(record);
              setCurrentRecordType(0);
              modalForm.setFieldsValue({
                ...record,
              });
            }}
          >
            查看
          </a>
          <Popconfirm
            title="确认要删除这一条记录?"
            onConfirm={() => {
              dispatch({
                type: 'pastHistory/deleteDrugHistory',
                payload: { pid, body: { type: 0, ids: [record.id] } },
              }).then(() => {
                dispatch({
                  type: 'pastHistory/fetchDrugHistory',
                  payload: { pid, body: { type: 0 } },
                });
              });
            }}
            okText="是"
            cancelText="否"
          >
            <a className="custom_toolbar_buttom_danger">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Spin spinning={pastHistoryLoading}>
        <Form form={form} labelAlign="left" onFinish={onFinish} {...formItemLayout}>
          <Form.Item name={['basDisHis', 'radio']} label="基础疾病史">
            <Checkbox.Group>
              <Checkbox value="无" style={{ lineHeight: '32px' }}>
                无
              </Checkbox>
              <Checkbox value="高血压" style={{ lineHeight: '32px' }}>
                高血压
              </Checkbox>
              <Checkbox value="冠心病" style={{ lineHeight: '32px' }}>
                冠心病
              </Checkbox>
              <Checkbox value="糖尿病" style={{ lineHeight: '32px' }}>
                糖尿病
              </Checkbox>
              <Checkbox value="慢性阻塞性肺病" style={{ lineHeight: '32px' }}>
                慢性阻塞性肺病
              </Checkbox>
              <Checkbox value="支气管哮喘" style={{ lineHeight: '32px' }}>
                支气管哮喘
              </Checkbox>
              <Checkbox value="肺结核" style={{ lineHeight: '32px' }}>
                肺结核
              </Checkbox>
              <Checkbox value="间质性肺病" style={{ lineHeight: '32px' }}>
                间质性肺病
              </Checkbox>
              <Checkbox value="高血脂" style={{ lineHeight: '32px' }}>
                高血脂
              </Checkbox>
              <Checkbox value="肝炎" style={{ lineHeight: '32px' }}>
                肝炎
              </Checkbox>
              <Checkbox value="风湿性免疫性疾病" style={{ lineHeight: '32px' }}>
                风湿性免疫性疾病
              </Checkbox>
              <Checkbox value="肾脏病" style={{ lineHeight: '32px' }}>
                肾脏病
              </Checkbox>
              <Checkbox
                value="其他"
                style={{ lineHeight: '32px' }}
                onChange={(e) => {
                  setBasDisHisOther(e.target.checked);
                }}
              >
                其他
                {basDisHisOther ? (
                  <Form.Item name={['basDisHis', 'other']} noStyle>
                    <Input
                      style={{ display: 'inline-block', marginLeft: 10, width: 240 }}
                      placeholder="输入其他"
                    />
                  </Form.Item>
                ) : (
                  false
                )}
              </Checkbox>
              <Checkbox value="不详" style={{ lineHeight: '32px' }}>
                不详
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name={['infDisHis', 'radio']} label="传染病史">
            <Checkbox.Group>
              <Checkbox value="无" style={{ lineHeight: '32px' }}>
                无
              </Checkbox>
              <Checkbox value="肺结核" style={{ lineHeight: '32px' }}>
                肺结核
              </Checkbox>
              <Checkbox value="艾滋" style={{ lineHeight: '32px' }}>
                艾滋
              </Checkbox>
              <Checkbox value="梅毒" style={{ lineHeight: '32px' }}>
                梅毒
              </Checkbox>
              <Checkbox
                value="其他"
                style={{ lineHeight: '32px' }}
                onChange={(e) => {
                  setInfDisHisOther(e.target.checked);
                }}
              >
                其他
                {infDisHisOther ? (
                  <Form.Item name={['infDisHis', 'other']} noStyle>
                    <Input
                      style={{ display: 'inline-block', marginLeft: 10, width: 240 }}
                      placeholder="输入其他"
                    />
                  </Form.Item>
                ) : null}
              </Checkbox>
              <Checkbox value="不详" style={{ lineHeight: '32px' }}>
                不详
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="肿瘤史" name="tumor">
            <Radio.Group
              onChange={(e) => {
                setTumor(e.target.value);
              }}
            >
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>

          {tumor ? (
            <Form.Item name={['tumHis', 'radio']} {...formItemLayoutNoLable}>
              <Checkbox.Group>
                <Checkbox value="无" style={{ lineHeight: '32px' }}>
                  无
                </Checkbox>
                {/* <Checkbox value="大肠癌" style={{ lineHeight: '32px' }}>
                  大肠癌
                </Checkbox> */}
                <Checkbox value="鼻咽癌及头颈部肿瘤" style={{ lineHeight: '32px' }}>
                  鼻咽癌及头颈部肿瘤
                </Checkbox>
                <Checkbox value="乳腺癌" style={{ lineHeight: '32px' }}>
                  乳腺癌
                </Checkbox>
                <Checkbox value="胃癌" style={{ lineHeight: '32px' }}>
                  胃癌
                </Checkbox>
                <Checkbox value="肺癌" style={{ lineHeight: '32px' }}>
                  肺癌
                </Checkbox>
                <Checkbox value="食管癌" style={{ lineHeight: '32px' }}>
                  食管癌
                </Checkbox>
                <Checkbox value="结直肠癌" style={{ lineHeight: '32px' }}>
                  结直肠癌
                </Checkbox>
                <Checkbox value="小肠癌" style={{ lineHeight: '32px' }}>
                  小肠癌
                </Checkbox>
                <Checkbox value="肝癌" style={{ lineHeight: '32px' }}>
                  肝癌
                </Checkbox>
                <Checkbox value="胰腺癌" style={{ lineHeight: '32px' }}>
                  胰腺癌
                </Checkbox>
                <Checkbox value="妇科肿瘤" style={{ lineHeight: '32px' }}>
                  妇科肿瘤
                </Checkbox>
                <Checkbox value="泌尿系统瘤" style={{ lineHeight: '32px' }}>
                  泌尿系统瘤
                </Checkbox>
                <Checkbox value="血液淋巴系统瘤" style={{ lineHeight: '32px' }}>
                  血液淋巴系统瘤
                </Checkbox>
                <Checkbox value="神经系统瘤" style={{ lineHeight: '32px' }}>
                  神经系统瘤
                </Checkbox>
                <Checkbox value="软组织肉瘤" style={{ lineHeight: '32px' }}>
                  软组织肉瘤
                </Checkbox>
                <Checkbox
                  value="其他"
                  style={{ lineHeight: '32px' }}
                  onChange={(e) => {
                    setTumHisOther(e.target.checked);
                  }}
                >
                  其他
                  {tumHisOther ? (
                    <Form.Item name={['tumHis', 'other']} noStyle>
                      <Input
                        style={{ display: 'inline-block', marginLeft: 10, width: 240 }}
                        placeholder="输入其他"
                      />
                    </Form.Item>
                  ) : null}
                </Checkbox>
                <Checkbox value="不详" style={{ lineHeight: '32px' }}>
                  不详
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
          ) : null}

          <Form.Item label="肿瘤家族史" name="tumorFam">
            <Radio.Group
              onChange={(e) => {
                setTumorFam(e.target.value);
              }}
            >
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>

          {tumorFam ? (
            <Form.Item name={['tumFamHis', 'radio']} {...formItemLayoutNoLable}>
              <Checkbox.Group>
                <Checkbox value="无" style={{ lineHeight: '32px' }}>
                  无
                </Checkbox>
                {/* <Checkbox value="大肠癌" style={{ lineHeight: '32px' }}>
                  大肠癌
                </Checkbox> */}
                <Checkbox value="鼻咽癌及头颈部肿瘤" style={{ lineHeight: '32px' }}>
                  鼻咽癌及头颈部肿瘤
                </Checkbox>
                <Checkbox value="乳腺癌" style={{ lineHeight: '32px' }}>
                  乳腺癌
                </Checkbox>
                <Checkbox value="胃癌" style={{ lineHeight: '32px' }}>
                  胃癌
                </Checkbox>
                <Checkbox value="肺癌" style={{ lineHeight: '32px' }}>
                  肺癌
                </Checkbox>
                <Checkbox value="食管癌" style={{ lineHeight: '32px' }}>
                  食管癌
                </Checkbox>
                <Checkbox value="结直肠癌" style={{ lineHeight: '32px' }}>
                  结直肠癌
                </Checkbox>
                <Checkbox value="小肠癌" style={{ lineHeight: '32px' }}>
                  小肠癌
                </Checkbox>
                <Checkbox value="肝癌" style={{ lineHeight: '32px' }}>
                  肝癌
                </Checkbox>
                <Checkbox value="胰腺癌" style={{ lineHeight: '32px' }}>
                  胰腺癌
                </Checkbox>
                <Checkbox value="妇科肿瘤" style={{ lineHeight: '32px' }}>
                  妇科肿瘤
                </Checkbox>
                <Checkbox value="泌尿系统瘤" style={{ lineHeight: '32px' }}>
                  泌尿系统瘤
                </Checkbox>
                <Checkbox value="血液淋巴系统瘤" style={{ lineHeight: '32px' }}>
                  血液淋巴系统瘤
                </Checkbox>
                <Checkbox value="神经系统瘤" style={{ lineHeight: '32px' }}>
                  神经系统瘤
                </Checkbox>
                <Checkbox value="软组织肉瘤" style={{ lineHeight: '32px' }}>
                  软组织肉瘤
                </Checkbox>
                <Checkbox
                  value="其他"
                  style={{ lineHeight: '32px' }}
                  onChange={(e) => {
                    setTumFamHisOther(e.target.checked);
                  }}
                >
                  其他
                  {tumFamHisOther ? (
                    <Form.Item name={['tumFamHis', 'other']} noStyle>
                      <Input
                        style={{ display: 'inline-block', marginLeft: 10, width: 240 }}
                        placeholder="输入其他"
                      />
                    </Form.Item>
                  ) : null}
                </Checkbox>
                <Checkbox value="不详" style={{ lineHeight: '32px' }}>
                  不详
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
          ) : null}

          {/* <Divider orientation="left">吸烟史</Divider> */}

          <Form.Item label="是否吸烟" name="smoke">
            <Radio.Group
              onChange={(e) => {
                setSmoke(e.target.value);
              }}
            >
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>

          {smoke ? (
            <>
              <Form.Item label="累积吸烟时间（年）" name={['smokingHis', 'smokeYearAvg']}>
                <InputNumber style={{ width: 200 }} />
              </Form.Item>
              <Form.Item label="日平均吸烟量（支）" name={['smokingHis', 'smokeDayAvg']}>
                <InputNumber style={{ width: 200 }} />
              </Form.Item>
              <Form.Item label="是否戒烟" name={['smokingHis', 'stopSmoke']}>
                <Radio.Group
                  onChange={(e) => {
                    setStopSmoke(e.target.value);
                  }}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              {stopSmoke ? (
                <Form.Item label="戒烟时间" name={['smokingHis', 'stopSmokeHis']}>
                  <Input style={{ width: 200 }} />
                </Form.Item>
              ) : null}
            </>
          ) : null}

          {/* <Divider orientation="left">饮酒史</Divider> */}

          <Form.Item label="饮酒史" name="drink">
            <Radio.Group
              onChange={(e) => {
                setDrink(e.target.value);
              }}
            >
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>

          {drink ? (
            <>
              <Form.Item label="累积饮酒时间（年）" name={['drinkingHis', 'drinkYearAvg']}>
                <InputNumber style={{ width: 200 }} />
              </Form.Item>
              <Form.Item label="日平均饮酒量（mL）" name={['drinkingHis', 'drinkDayAvg']}>
                <InputNumber style={{ width: 200 }} />
              </Form.Item>
              <Form.Item label="是否戒酒" name={['drinkingHis', 'stopDrink']}>
                <Radio.Group
                  onChange={(e) => {
                    setstopDrink(e.target.value);
                  }}
                >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </Radio.Group>
              </Form.Item>
              {stopDrink ? (
                <Form.Item label="戒酒时间" name={['drinkingHis', 'stopDringHis']}>
                  <Input style={{ width: 200 }} />
                </Form.Item>
              ) : null}
            </>
          ) : null}

          {/* <Divider orientation="left">激素使用史</Divider> */}

          <Form.Item label="长期使用激素治疗" name="hormone">
            <Radio.Group
              onChange={(e) => {
                setHormone(e.target.value);
              }}
            >
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>

          {hormone ? (
            <Form.Item name="hormoneUseHis" noStyle>
              <Table
                dataSource={hormoneHistory}
                columns={hormone_table_columns}
                loading={drugHistoryLoading}
                title={() => (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ display: 'block' }}>激素使用史</span>
                    <Button
                      type="primary"
                      onClick={() => {
                        setModalVisible(true);
                        setCurrentRecord({ id: null });
                        setCurrentRecordType(1);
                        modalForm.resetFields();
                      }}
                    >
                      新增
                    </Button>
                  </div>
                )}
                bordered
                rowKey="id"
                pagination={{ position: ['bottomCenter'], pageSize: 10 }}
              />
            </Form.Item>
          ) : null}

          {/* <Divider orientation="left">药物使用史</Divider> */}

          <Form.Item label="长期使用其他药物" name="drug">
            <Radio.Group
              onChange={(e) => {
                setDrug(e.target.value);
              }}
            >
              <Radio value={true}>有</Radio>
              <Radio value={false}>无</Radio>
            </Radio.Group>
          </Form.Item>

          {drug ? (
            <Form.Item name="drugUseHis" noStyle>
              <Table
                dataSource={drugHistory}
                columns={drug_table_columns}
                loading={drugHistoryLoading}
                title={() => (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ display: 'block' }}>药物使用史</span>
                    <Button
                      type="primary"
                      onClick={() => {
                        setModalVisible(true);
                        setCurrentRecordType(0);
                        setCurrentRecord({ id: null });
                        modalForm.resetFields();
                      }}
                    >
                      新增
                    </Button>
                  </div>
                )}
                bordered
                rowKey="id"
                pagination={{ position: ['bottomCenter'], pageSize: 10 }}
              />
            </Form.Item>
          ) : null}

          <Form.Item {...tailLayout} style={{ marginTop: '20px' }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Spin>

      <Modal
        title="研究用药"
        visible={modalVisible}
        onOk={() => ModalHandleOk()}
        onCancel={() => ModalHandleCancel()}
        // width={800}
        confirmLoading={confirmLoading}
        forceRender
      >
        <Form onFinish={onModalFinish} form={modalForm} {...ModalFormItemLayout} labelAlign="left">
          <Form.Item name="drug_name" label="药物名称">
            <Input placeholder="请输入药物名称" />
          </Form.Item>
          <Form.Item name="drug_dose" label="日使用剂量">
            <Input placeholder="请输入日使用剂量" />
          </Form.Item>
          <Form.Item
            name="use_time"
            label="累积使用时间（月）"
            // rules={[{ message: '不能输入小数', type: 'integer' }]}
          >
            <InputNumber
              // onChange={value => {
              //   if (!value) {
              //     const _set_value = { use_time: 0 };
              //     modalForm.setFieldsValue({ ..._set_value });
              //   }
              // }}
              // precision={0}
              placeholder="请输入累积使用时间（月）"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = ({
  pastHistory,
  loading,
}: {
  pastHistory: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    pastHistory: pastHistory.pastHistory,
    hormoneHistory: pastHistory.hormoneHistory,
    drugHistory: pastHistory.drugHistort,
    pastHistoryLoading: loading.effects['pastHistory/fetchPastHistory'],
    drugHistoryLoading: loading.effects['pastHistory/fetchDrugHistory'],
  };
};

export default connect(mapStateToProps)(PastHistoryContent);
