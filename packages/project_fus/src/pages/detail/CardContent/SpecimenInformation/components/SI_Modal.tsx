/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-03-28 17:26:39
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Modal, InputNumber, message } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
import { connect } from 'umi';

import moment from 'moment';

const ModalFormItemLayout = {
  labelCol: { xl: { span: 8 }, md: { span: 10 } },
  wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
};

interface SiModalProps {
  AddData: (values: any) => Promise<unknown>;
  onCancel: () => void;
  refresh: () => void;
  visible: boolean;
  record: any;
}

const { Option } = Select;

const SiModal: React.FC<SiModalProps> = (props) => {
  const { AddData, visible, record, onCancel, refresh } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();

  const [type, setType] = useState<string | null>(null);

  // 是否为新增
  const [isAdd, setIsAdd] = useState(true);

  // 初始化
  useEffect(() => {
    if (!visible) return;

    console.log('record', record);
    // 判断 record的id是否存在

    if (record && record.id !== undefined && record.id !== null) {
      setIsAdd(false);

      let _type;

      // 如果为字符串，将它转换
      if (record.type && typeof record.type === 'string') {
        _type = JSON.parse(record.type);
      } else {
        _type = record.type;
      }

      if (_type) {
        _type = { other: _type.other, radio: _type.radio[0] };
        setType(_type.radio);
      } else {
        _type = null;
        setType(null);
      }

      form.setFieldsValue({
        ...record,
        samplingTime: record.samplingTime ? moment(record.samplingTime) : undefined,
        type: _type,
      });
    } else {
      setType(null);
      setIsAdd(true);
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onModalFinish = (values: any) => {
    values.samplingTime = values.samplingTime ? values.samplingTime.format('YYYY-MM-DD') : null;

    values.type = {
      other: values.type.other ? values.type.other : null,
      radio: [values.type.radio],
    };

    if (!isAdd) values.id = record.id;

    console.log('onModalFinish:values', values);

    setConfirmLoading(true);

    AddData(values).then((res: any) => {
      console.log(res);
      setConfirmLoading(false);

      if (res) {
        message.success('保存标本信息成功');
        onCancel();
        refresh();
      } else {
        message.success('保存标本信息失败');
      }
    });
  };

  return (
    <Modal
      title="标本信息"
      width={800}
      visible={visible}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        onCancel();
      }}
      confirmLoading={confirmLoading}
    >
      <Form onFinish={onModalFinish} form={form} {...ModalFormItemLayout} labelAlign="left">
        <Form.Item name="number" label="样本编号">
          <InputNumber placeholder="请输入样本编号" style={{ width: '200px' }} />
        </Form.Item>

        <Form.Item name={['type', 'radio']} label="样本类型">
          <Select
            style={{ width: 320 }}
            onChange={(e: string) => {
              setType(e);
            }}
            placeholder="请选择样本类型"
          >
            <Option value="血标本">血标本</Option>
            <Option value="组织标本(包括新鲜冰冰组织，蜡块，切片)">
              组织标本(包括新鲜冰冰组织，蜡块，切片)
            </Option>
            <Option value="胸腔积液">胸腔积液</Option>
            <Option value="腹腔积液">腹腔积液</Option>
            <Option value="脑脊液">脑脊液</Option>
            <Option value="其他">其他</Option>
          </Select>
        </Form.Item>

        {type === '组织标本(包括新鲜冰冰组织，蜡块，切片)' || type === '其他' ? (
          <Form.Item
            name={['type', 'other']}
            wrapperCol={{ xl: { span: 16, offset: 8 }, md: { span: 14, offset: 10 } }}
          >
            <Input placeholder={`请输入${type === '其他' ? '其他' : '具体的标本部位'}`} />
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item name="amount" label="样本数量">
          <InputNumber placeholder="请输入样本数量" style={{ width: '200px' }} />
        </Form.Item>

        <Form.Item label="取样时间" name="samplingTime">
          <DatePicker format="YYYY-MM-DD" placeholder="请选择日期" />
        </Form.Item>

        <Form.Item label="样本储存位置" name="storeSite">
          <Input placeholder="请输入样本储存位置" />
        </Form.Item>

        <Form.Item label="备注" name="note">
          <Input.TextArea placeholder="请输入备注" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(SiModal);
