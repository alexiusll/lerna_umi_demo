/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form, Button, Select, DatePicker, Alert, Spin, Input, Switch } from 'antd';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import { RedoOutlined } from '@ant-design/icons';
import { StateType } from './model';

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 3 }, md: { span: 6, offset: 3 } },
};

// const { Option } = Select;

interface EfficacyEvaluationContentProps {
  dispatch: Dispatch;
  evaluation?: any;
  treatmentRecordInfo?: any;
  evaluationLoading: boolean;
  pid: number;
  treNum: number;
}

const EfficacyEvaluationContent: React.FC<EfficacyEvaluationContentProps> = (props) => {
  const { pid, treNum, dispatch, evaluation, evaluationLoading, treatmentRecordInfo } = props;
  const [form] = Form.useForm();
  const [trement, setTrement] = useState(undefined);
  // 是否自动填写
  const [isAutoCompute, setIsAutoCompute] = useState(false);
  const [isGetON, setIsGetOn] = useState(undefined);

  useEffect(() => {
    // console.log(pid, treNum)
    if (pid !== -404) {
      dispatch({
        type: 'evaluation/fetchTherapyRecord',
        payload: { pid, treNum },
      });
    }
  }, [pid, treNum]);

  useEffect(() => {
    if (pid !== -404 && trement !== undefined) {
      dispatch({
        type: 'evaluation/fetchEvaluation',
        payload: { pid, treNum, trement },
      });
    }
    // 销毁的时候
    return () => {};
  }, [pid, treNum, trement]);

  useEffect(() => {
    if (evaluation) {
      form.setFieldsValue({
        ...evaluation,
        beEffEvaDate: evaluation.beEffEvaDate ? moment(evaluation.beEffEvaDate) : null,
        proDate: evaluation.proDate ? moment(evaluation.proDate) : null,
      });
      setIsGetOn(evaluation.beEffEva);
      setIsAutoCompute(evaluation.is_auto_compute === 1);
    } else {
      form.resetFields();
    }
    if (treatmentRecordInfo) {
      console.log('trement', treatmentRecordInfo.parent.trement);
      setTrement(treatmentRecordInfo.parent.trement);
    }
  }, [evaluation, treatmentRecordInfo]);

  const onFinish = (values: any) => {
    if (evaluation) {
      values.id = evaluation.id;
    }

    // PFS_DFS不传空值
    if (values.PFS_DFS === null || values.PFS_DFS === '') {
      delete values.PFS_DFS;
    }
    values.is_auto_compute = isAutoCompute ? 1 : 0;
    values.beEffEvaDate = values.beEffEvaDate ? values.beEffEvaDate.format('YYYY-MM-DD') : null;
    values.proDate = values.proDate ? values.proDate.format('YYYY-MM-DD') : null;
    // console.log(values)
    dispatch({
      type: 'evaluation/modifyEvaluation',
      payload: {
        pid,
        treNum,
        trement,
        body: values,
      },
    }).then(() => {
      // message.success('success save!');
      dispatch({
        type: 'evaluation/fetchTherapyRecord',
        payload: { pid, treNum },
      });
      if (trement !== undefined && trement !== null) {
        dispatch({
          type: 'evaluation/fetchEvaluation',
          payload: { pid, treNum, trement },
        });
      }
    });
  };

  const best_effect_evalution = [
    { label: 'PD-进展', value: '1' },
    { label: 'SD-稳定', value: '2' },
    { label: 'PR-部分缓解', value: '3' },
    { label: 'CR-完全缓解', value: '4' },
    { label: '术后未发现新病灶', value: '5' },
  ];

  return (
    <Spin spinning={evaluationLoading}>
      <Form
        name="effect_evalution"
        form={form}
        {...layout}
        onFinish={(values: any) => {
          onFinish(values);
        }}
        // initialValues={this.initialValues}
      >
        <Form.Item label="最佳疗效评估日期" name="beEffEvaDate">
          <DatePicker />
        </Form.Item>
        <Form.Item label="最佳疗效评估" name="beEffEva">
          <Select
            allowClear
            // onClear={() => {
            //   form.setFieldsValue({ beEffEva: null });
            // }}
            placeholder="请选择"
            style={{ width: 200 }}
            options={best_effect_evalution}
            onChange={(e: any) => {
              console.log('e', e);
              if (e === undefined) {
                form.setFieldsValue({ beEffEva: null });
                return;
              }
              setIsGetOn(e);
              if (e === '1') {
                const proDate = form.getFieldValue('proDate');
                console.log('proDate', proDate);
                if (proDate && isAutoCompute) {
                  console.log('计算PFS/DFS');
                  form.submit();
                }
              }
            }}
          />
        </Form.Item>
        <Form.Item label="提示">
          <Alert
            message="在疗效最佳及PD时，强烈建议添加影像学报告"
            type="warning"
            showIcon
            style={{ width: 360 }}
          />
        </Form.Item>
        <Form.Item label="进展日期" name="proDate">
          <DatePicker
            onChange={(e: any) => {
              console.log('e', e);
              if (e !== null && e !== undefined) {
                const beEffEva = form.getFieldValue('beEffEva');
                console.log('beEffEva', beEffEva);
                if (beEffEva === '1' && isAutoCompute) {
                  console.log('计算PFS/DFS');
                  form.submit();
                }
              }
            }}
          />
        </Form.Item>
        <Form.Item label="PFS/DFS" style={{ lineHeight: '32px' }}>
          <div style={{ marginBottom: '8px' }}>
            是否手动填写(默认为自动填写):{' '}
            <Switch
              checked={isAutoCompute === false}
              onChange={(e) => {
                console.log('e:', e);
                setIsAutoCompute(!e);
                // 选了自动填写
                if (!e) {
                  console.log('自动 计算PFS/DFS');
                  form.submit();
                }
              }}
            />
          </div>

          {!isAutoCompute ? (
            <div>
              <Form.Item label="PFS/DFS" name="PFS_DFS" noStyle>
                <Input style={{ display: 'inline-block', width: '300px' }} />
              </Form.Item>
              <Button
                style={{
                  marginLeft: '8px',
                  borderRadius: '10%',
                  display: 'inline-block',
                  height: '32px',
                }}
                size="small"
                // shape="circle"
                onClick={() => {
                  // form.setFieldsValue({ PFS_DFS: null });
                  let id = null;
                  if (evaluation) {
                    id = evaluation.id;
                  }
                  dispatch({
                    type: 'evaluation/modifyEvaluation',
                    payload: {
                      pid,
                      treNum,
                      trement,
                      body: { PFS_DFS: '', id: id || undefined },
                    },
                  }).then(() => {
                    dispatch({
                      type: 'evaluation/fetchTherapyRecord',
                      payload: { pid, treNum },
                    });
                    if (trement !== undefined && trement !== null) {
                      dispatch({
                        type: 'evaluation/fetchEvaluation',
                        payload: { pid, treNum, trement },
                      });
                    }
                  });
                }}
              >
                <RedoOutlined />
                重置
              </Button>
            </div>
          ) : (
            <div>
              <Input
                value={evaluation.PFS_DFS}
                style={{ display: 'inline-block', width: '300px', background: '#f1f1f1' }}
                readOnly
              />
            </div>
          )}
        </Form.Item>
        <Form.Item label="进展描述" name="proDes">
          <Input style={{ width: '300px' }} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  evaluation,
  loading,
}: {
  evaluation: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    evaluation: evaluation.evaluation,
    treatmentRecordInfo: evaluation.treatmentRecordInfo,
    evaluationLoading: loading.effects['evaluation/fetchEvaluation'],
  };
};

export default connect(mapStateToProps)(EfficacyEvaluationContent);
