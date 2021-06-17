/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-16 19:50:03
 */

import { Button, Form, Input, Radio, Spin, InputNumber, Row, Col, Divider, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import FileTable from '@/components/FileTable';
import { RedoOutlined } from '@ant-design/icons';
import { StateType } from '../model';
import { LungFunctionDataType } from '../data';
import style from '../style.less';
import form_style from './form.less';
import moment from 'moment';

interface LungFunctionContentProps {
  dispatch: Dispatch;
  lungFunction?: LungFunctionDataType;
  lungFunctionLoading: boolean;
  pid: number;
  treNum: number;
}

const formItemLayout = {
  labelCol: { xl: { span: 6 }, md: { span: 6 } },
  wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
};

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 0 }, md: { span: 6, offset: 0 } },
};

const LungFunctionContent: React.FC<LungFunctionContentProps> = (props) => {
  const { pid, treNum, dispatch, lungFunction, lungFunctionLoading } = props;
  const [form] = Form.useForm();

  const IsNormalRadios = (radioProps: any) => {
    const name = radioProps;
    const [state1, setState1] = useState<null | number>(null); // 0 -1
    const [state2, setState2] = useState<null | number>(null); // 1 2 3 4 5

    useEffect(() => {
      if (lungFunction) {
        // console.log('lungFunction[radioProps]', lungFunction[radioProps]);
        if (lungFunction[radioProps] !== null && lungFunction[radioProps] !== undefined) {
          setState1(lungFunction[radioProps] === 0 ? 0 : -1);
          // 不为0或者-1的时候 ， 设置State2的参数
          setState2(
            lungFunction[radioProps] === 0 || lungFunction[radioProps] === -1
              ? null
              : lungFunction[radioProps],
          );
        } else {
          setState1(null);
          setState2(null);
        }
      } else {
        setState1(null);
        setState2(null);
      }
    }, [lungFunction]);

    const onChange1 = (e: any) => {
      // console.log('onChange1', e.target.value);
      setState1(e.target.value);
      // 选择了正常，恢复state2的状态
      if (e.target.value === 0) setState2(null);
      // setState2(e.target.value === 1 ? 1 : null);
      form.setFieldsValue({ [name]: e.target.value });
    };

    const onChange2 = (e: any) => {
      // console.log('onChange2', e.target.value);
      setState2(e.target.value);
      form.setFieldsValue({ [name]: e.target.value });
    };

    return (
      <div style={{ marginTop: '12px' }}>
        <Form.Item style={{ marginBottom: 0 }} noStyle>
          <Radio.Group onChange={onChange1} value={state1}>
            <Radio value={0}>正常</Radio>
            <Radio value={-1}>异常</Radio>
            <Button
              style={{ marginRight: '8px', borderRadius: '50%' }}
              size="small"
              shape="circle"
              onClick={() => {
                form.setFieldsValue({ [name]: null });
                setState1(null);
                setState2(null);
              }}
            >
              <RedoOutlined />
            </Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item noStyle>
          <Radio.Group
            onChange={onChange2}
            value={state2}
            style={{ display: state1 ? 'block' : 'none', marginTop: 10 }}
          >
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
            <Radio value={4}>4</Radio>
            <Radio value={5}>5</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
    );
  };

  useEffect(() => {
    dispatch({
      type: 'otherExam/fetchLungFunction',
      payload: { pid, treNum },
    });
    // 销毁的时候
    return () => {};
  }, []);

  useEffect(() => {
    console.log('lungFunction', lungFunction);
    if (lungFunction) {
      // 判断表单是否存在
      if (lungFunction.id !== -404) {
        form.setFieldsValue({
          ...lungFunction,
          samplingTime: lungFunction.samplingTime ? moment(lungFunction.samplingTime) : null,
        });
      } else {
        form.resetFields();
        dispatch({
          type: 'otherExam/modifyLungFunction',
          payload: { pid, treNum, body: {} },
        });
      }
    } else {
      form.resetFields();
    }
  }, [lungFunction]);

  const Form_item = (name: string, lable: string) => {
    return (
      <div
        style={{
          backgroundColor: 'white',
          margin: '0px 0px 12px 0px',
          padding: '6px 12px 16px 12px',
          border: '1px solid #dfe6e9',
        }}
      >
        <Divider orientation="left" className={style.custom_ellipsis}>
          {lable}
        </Divider>
        <Form.Item noStyle>
          <Row gutter={[8, 8]}>
            <Col xl={2} md={6} sm={24} xs={24}>
              <span
                style={{
                  marginRight: '8px',
                  lineHeight: '32px',
                }}
              >
                预计值:
              </span>
            </Col>

            <Col xl={4} md={6} sm={24} xs={24}>
              <Form.Item name={`${name}_exp`} noStyle>
                <InputNumber
                  style={{ marginRight: '8px', width: '100%' }}
                  onChange={(value) => {
                    if (typeof value === 'number') {
                      const best = form.getFieldValue(`${name}_best`);
                      if (value !== 0 && best != null) {
                        form.setFieldsValue({
                          [`${name}_ratio`]: parseFloat(((best / value) * 100).toFixed(2)),
                        });
                      } else {
                        form.setFieldsValue({ [`${name}_ratio`]: null });
                      }
                    } else {
                      form.setFieldsValue({ [`${name}_ratio`]: null });
                    }
                  }}
                />
              </Form.Item>
            </Col>

            <Col xl={2} md={6} sm={24} xs={24}>
              <span
                style={{
                  marginRight: '8px',
                  lineHeight: '32px',
                }}
              >
                最佳值:
              </span>
            </Col>

            <Col xl={4} md={6} sm={24} xs={24}>
              <Form.Item name={`${name}_best`} noStyle>
                <InputNumber
                  style={{ marginRight: '8px', width: '100%' }}
                  onChange={(value) => {
                    if (typeof value === 'number') {
                      const exp = form.getFieldValue(`${name}_exp`);
                      if (exp !== 0) {
                        form.setFieldsValue({
                          [`${name}_ratio`]: parseFloat(((value / exp) * 100).toFixed(2)),
                        });
                      } else {
                        form.setFieldsValue({ [`${name}_ratio`]: null });
                      }
                    } else {
                      form.setFieldsValue({ [`${name}_ratio`]: null });
                    }
                  }}
                />
              </Form.Item>
            </Col>

            <Col xl={4} md={6} sm={24} xs={24}>
              <span
                style={{
                  marginRight: '8px',
                  lineHeight: '32px',
                }}
              >
                最佳值/预计值(%):
              </span>
            </Col>

            <Col xl={4} md={6} sm={24} xs={24}>
              <Form.Item name={`${name}_ratio`} noStyle>
                <InputNumber
                  formatter={(value) => `${value}%`}
                  // parser={value => (value ? parseFloat(value.replace('%', '')) : 0)}
                  style={{ width: '100%' }}
                  readOnly
                />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ paddingBottom: '8px' }}>
            <Col xl={3} md={5} sm={24} xs={24}>
              <span style={{ marginRight: '8px' }}>临床意义判断:</span>
            </Col>
            <Col xl={21} md={19} sm={24} xs={24}>
              <Form.Item name={`${name}Mea`} noStyle>
                <Radio.Group>
                  <Radio value={0}>正常</Radio>
                  <Radio value={-1}>异常</Radio>
                  <Radio value={1}>异常-1</Radio>
                  <Radio value={2}>异常-2</Radio>
                  <Radio value={3}>异常-3</Radio>
                  <Radio value={4}>异常-4</Radio>
                  <Radio value={5}>异常-5</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xl={2} md={4} sm={24} xs={24}>
              <span style={{ marginRight: '8px', lineHeight: '32px' }}>备注:</span>
            </Col>
            <Col xl={18} md={20} sm={24} xs={24}>
              <Form.Item name={`${name}Note`} noStyle>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </div>
    );
  };

  const Form_item_pc = (name: string, lable: string, code: string) => {
    return (
      <tr style={{ height: '1rem', border: '1px solid #dfe6e9' }} key={name}>
        <td style={{ width: '12.5%' }} className={form_style.grid}>
          {lable}
        </td>
        <td style={{ width: '12.5%' }} className={form_style.grid}>
          {code}
        </td>
        <td style={{ width: '12.5%' }} className={form_style.grid}>
          <Form.Item name={`${name}_exp`} noStyle>
            <InputNumber
              style={{ marginRight: '8px', width: '90%' }}
              onChange={(value) => {
                if (typeof value === 'number') {
                  const best = form.getFieldValue(`${name}_best`);
                  if (value !== 0 && best != null) {
                    form.setFieldsValue({
                      [`${name}_ratio`]: parseFloat(((best / value) * 100).toFixed(2)),
                    });
                  } else {
                    form.setFieldsValue({ [`${name}_ratio`]: null });
                  }
                } else {
                  form.setFieldsValue({ [`${name}_ratio`]: null });
                }
              }}
            />
          </Form.Item>
        </td>
        <td style={{ width: '12.5%' }} className={form_style.grid}>
          <Form.Item name={`${name}_best`} noStyle>
            <InputNumber
              style={{ marginRight: '8px', width: '90%' }}
              onChange={(value) => {
                if (typeof value === 'number') {
                  const exp = form.getFieldValue(`${name}_exp`);
                  if (exp !== 0) {
                    form.setFieldsValue({
                      [`${name}_ratio`]: parseFloat(((value / exp) * 100).toFixed(2)),
                    });
                  } else {
                    form.setFieldsValue({ [`${name}_ratio`]: null });
                  }
                } else {
                  form.setFieldsValue({ [`${name}_ratio`]: null });
                }
              }}
            />
          </Form.Item>
        </td>
        <td style={{ width: '12.5%' }} className={form_style.grid}>
          <Form.Item name={`${name}_ratio`} noStyle>
            <InputNumber
              formatter={(value) => `${value}%`}
              // parser={value => (value ? parseFloat(value.replace('%', '')) : 0)}
              style={{ width: '90%' }}
              readOnly
            />
          </Form.Item>
        </td>
        <td style={{ width: '25.5%', verticalAlign: 'top' }} className={form_style.grid}>
          {IsNormalRadios(`${name}Mea`)}
        </td>
        <td style={{ width: '12.5%' }} className={form_style.grid}>
          <Form.Item name={`${name}Note`} noStyle>
            <Input.TextArea style={{ width: '96%' }} />
          </Form.Item>
        </td>
      </tr>
    );
  };

  const onFinish = (values: any) => {
    console.log('lungFunction', lungFunction);
    console.log('values', values);
    if (lungFunction) {
      values.id = lungFunction.id;
    }
    values.samplingTime = values.samplingTime ? values.samplingTime.format('YYYY-MM-DD') : null;
    dispatch({
      type: 'otherExam/modifyLungFunction',
      payload: { pid, treNum, body: values },
    });
  };

  return (
    <Spin spinning={lungFunctionLoading}>
      <div style={{ backgroundColor: 'white', padding: '0px 0px 6px 0px' }}>
        <Form form={form} labelAlign="left" onFinish={onFinish} {...formItemLayout}>
          <Form.Item label="检查时间" name="samplingTime">
            <DatePicker />
          </Form.Item>

          <Col sm={0}>
            {Form_item('FVC', '用力肺活量 FVC(L)')}
            {Form_item('FEV1_FVC', '用力呼气一秒率 FEV1/FVC(%)')}
            {Form_item('MEF', '用力呼气中期流速 MEF(L/S)')}
            {Form_item('MEF25', '25%用力呼气流速 MEF25(L/S)')}
            {Form_item('MEF50', '50%用力呼气流速 MEF50(L/S)')}
            {Form_item('MEF75', '75%用力呼气流速 MEF75(L/S)')}
            {Form_item('TLC_sb', '肺总量 TLC’sb(L)')}
            {Form_item('RV', '残气容积 RV’(L)')}
            {Form_item('RV_TLC', '残气容积/肺总量比 RV’/TLC’(%)')}
            {Form_item('VC', '肺活量 VC(L)')}
            {Form_item('DLCO_ex', '无需屏气弥散 DLCO-ex (mL/mmHg/Mi)')}
            {Form_item('DLCO_sb', '肺一氧化碳弥散量 DLCO-sb (mL/mmHg/Mi)')}
            {Form_item('KCO', '比弥散量 KCO')}
          </Col>

          <Col xs={0} sm={24}>
            <table
              style={{
                width: '100%',
                height: '100%',
                textAlign: 'center',
                border: '1px solid #dfe6e9',
              }}
            >
              <tbody>
                <tr style={{ height: '3rem', backgroundColor: '#BCE7F2' }}>
                  <th style={{ width: '12.5%' }}>代码</th>
                  <th style={{ width: '12.5%' }}>项目</th>
                  <th style={{ width: '12.5%' }}>预计值</th>
                  <th style={{ width: '12.5%' }}>最佳值</th>
                  <th style={{ width: '12.5%' }}>最佳值/预计值(%)</th>
                  <th style={{ width: '25.5%' }}>临床意义判断</th>
                  <th style={{ width: '12.5%' }}>备注</th>
                </tr>
                {Form_item_pc('FVC', '用力肺活量', 'FVC(L)')}
                {Form_item_pc('FEV1_FVC', '用力呼气一秒率', 'FEV1/FVC(%)')}
                {Form_item_pc('MEF', '用力呼气中期流速', 'MEF(L/S)')}
                {Form_item_pc('MEF25', '25%用力呼气流速', 'MEF25(L/S)')}
                {Form_item_pc('MEF50', '50%用力呼气流速', 'MEF50(L/S)')}
                {Form_item_pc('MEF75', '75%用力呼气流速', 'MEF75(L/S)')}
                {Form_item_pc('TLC_sb', '肺总量 ', 'TLC’sb(L)')}
                {Form_item_pc('RV', '残气容积', 'RV’(L)')}
                {Form_item_pc('RV_TLC', '残气容积/肺总量比', 'RV’/TLC’(%)')}
                {Form_item_pc('VC', '肺活量', 'VC(L)')}
                {Form_item_pc('DLCO_ex', '无需屏气弥散', 'DLCO-ex (mL/mmHg/Mi)')}
                {Form_item_pc('DLCO_sb', '肺一氧化碳弥散量', 'DLCO-sb (mL/mmHg/Mi)')}
                {Form_item_pc('KCO', '比弥散量', 'KCO')}
              </tbody>
            </table>
          </Col>

          <Form.Item {...tailLayout} style={{ marginTop: '12px', marginBottom: '12px' }}>
            <FileTable
              folder="lung"
              id={lungFunction?.id}
              pid={pid}
              buttonStyle={{ marginLeft: '0px' }}
            />
          </Form.Item>

          <Form.Item {...tailLayout} style={{ marginTop: '0px' }}>
            <Button type="primary" htmlType="submit" style={{ marginLeft: '0px' }}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

const mapStateToProps = ({
  otherExam,
  loading,
}: {
  otherExam: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    lungFunction: otherExam.lungFunction,
    lungFunctionLoading: loading.effects['otherExam/fetchLungFunction'],
  };
};

export default connect(mapStateToProps)(LungFunctionContent);
