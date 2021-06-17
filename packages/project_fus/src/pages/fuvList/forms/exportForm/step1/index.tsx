/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 16:40:26
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Switch, Select, Divider, Button, Alert } from 'antd';
import { Dispatch, connect } from 'umi';
import { StateType as FuvStateType } from '../../../model';
import { StateType } from '../model';

const { Option } = Select;

interface Step1FormProps {
  all_pids: number[];
  isExportAll: boolean;
  steps: number[];
  formData: StateType['form'];
  dispatch: Dispatch;
}

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

const tailLayout = {
  wrapperCol: { xl: { span: 6, offset: 8 }, md: { span: 6, offset: 10 } },
};

const Step1: React.FC<Step1FormProps> = (props) => {
  const { dispatch, isExportAll, steps, formData, all_pids } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;

  const clearData = () => {
    dispatch({
      type: 'exportData/clear',
    });
  };

  useEffect(() => {
    form.setFieldsValue({ isExportAll });
  }, [isExportAll]);

  const onValidateForm = async () => {
    const values = await validateFields();
    console.log('onValidateForm: values', values);
    // 更新路径
    dispatch({
      type: 'exportData/save',
      payload: { current: steps[1] },
    });
  };

  return (
    <Form form={form} {...ModalFormItemLayout} labelAlign="left">
      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          onClick={onValidateForm}
          disabled={formData.pids.length < 1 && isExportAll === false}
        >
          下一步
        </Button>
      </div>

      <Divider orientation="left">病例选择</Divider>

      <Button
        style={{ marginBottom: 24 }}
        onClick={() => {
          clearData();
        }}
      >
        重置字段
      </Button>

      <Form.Item label="导出全部病例(筛选后)">
        <Switch
          checked={isExportAll}
          onChange={(e) => {
            dispatch({
              type: 'exportData/save',
              payload: { isExportAll: e },
            });
          }}
        />
      </Form.Item>

      <Form.Item label="当前选择的病例数">
        <span>{isExportAll ? all_pids?.length : formData.pids.length}</span>
      </Form.Item>

      {formData.pids.length < 1 && isExportAll === false ? (
        <Alert
          message="未选择样本！请先关闭弹窗，在样本页选择需要导出的样本，或勾选全部导出"
          type="error"
          style={{ marginBottom: '24px' }}
          showIcon
        />
      ) : null}

      {formData.pids.length >= 1 || isExportAll === true ? (
        <Alert
          message="全部字段导出需等待较长时间，建议根据需要选择相应模块和字段进行导出"
          type="info"
          style={{ marginBottom: '24px' }}
          showIcon
        />
      ) : null}
    </Form>
  );
};

const mapStateToProps = ({
  exportData,
  fuvList,
  loading,
}: {
  exportData: StateType;
  fuvList: FuvStateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    all_pids: fuvList.all_pids,
    isExportAll: exportData.isExportAll,
    steps: exportData.steps,
    formData: exportData.form,
  };
};

export default connect(mapStateToProps)(Step1);
