/*
 * @Author: linkenzone
 * @Date: 2021-05-27 16:35:45
 * @Descripttion: 文件上传的模块
 */

import React, { useEffect, useState } from 'react';
import { Upload, message, Button, Progress } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

import request from 'umi-request';

import style from './style.less';

const { Dragger } = Upload;

type UploadFilesComponentProps = {
  bodyStyle?: React.CSSProperties;
};

const UploadFilesComponent: React.FC<UploadFilesComponentProps> = (props) => {
  // 待上传的文件列表
  const [fileList, setFileList] = useState<any[]>([]);
  // 上传状态
  const [uploading, setUploading] = useState<boolean>(false);
  // 上传成功的文件数目
  const [progressPercent, setProgressPercent] = useState(Number);

  const { bodyStyle } = props;

  const modifyFileStatus = (file: any, status: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList;
    newFileList[index].status = status;
    setFileList(newFileList);
  };

  const handleClear = () => {
    console.log('fileList', fileList);
    setFileList([]);
  };

  const handleUpload = async () => {
    console.log('fileList', fileList);

    // const formData = new FormData();
    // fileList.forEach((file) => {
    //   formData.append('files[]', file);
    // });

    setProgressPercent(0);
    setUploading(true);

    let count = 0;

    const requests = Object.values(fileList).map((file) => {
      const formData = new FormData();
      formData.append('files[]', file);

      modifyFileStatus(file, 'uploading');

      return (
        request(`http://27.17.30.150:20083/instances/`, {
          method: 'POST',
          data: formData,
          credentials: 'omit',
          getResponse: true,
        })
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          .then(({ data, response }) => {
            console.log('data', data);
            console.log('response', response);
            if (response.status === 200) {
              count += 1;

              modifyFileStatus(file, 'success');

              setProgressPercent((count / fileList.length) * 100);
            }
          })
          .catch((error) => {
            console.log(error);

            const index = fileList.indexOf(file);
            const newFileList = fileList;
            newFileList[index].status = 'error';
            setFileList(newFileList);

            message.error('一个文件上传失败');
          })
      );
    });

    await Promise.all(requests);

    if (count === fileList.length) {
      message.success('上传成功');
      handleClear();
    } else {
      message.error('部分文件上传失败');
    }

    setUploading(false);
    // setFileList([]);
  };

  const beforeUpload = (file: any, _fileList: any) => {
    setFileList([...fileList, ..._fileList]);
    return false;
  };

  const Dragger_props = {
    name: 'file',
    multiple: true,
    fileList,
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div style={bodyStyle}>
      <Upload
        beforeUpload={beforeUpload}
        fileList={fileList}
        showUploadList={false}
        multiple={true}
        style={{ width: '100%', display: 'block' }}
        className={style.custom_upload_body}
      >
        <Button
          type="primary"
          icon={<UploadOutlined />}
          style={{ width: '100%', fontSize: '18px', height: '36px' }}
        >
          Select files to upload ...
        </Button>
      </Upload>

      <div>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 8, width: '100%', fontSize: '18px', height: '36px' }}
        >
          {uploading ? 'Uploading' : 'Start the upload'}
        </Button>
      </div>

      <div>
        <Button
          type="primary"
          onClick={handleClear}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 8, width: '100%', fontSize: '18px', height: '36px' }}
        >
          Clear the pending uploads
        </Button>
      </div>

      <Progress
        percent={progressPercent}
        showInfo={false}
        strokeWidth={24}
        style={{ marginBottom: '8px', marginTop: '24px' }}
      />

      <Dragger listType="picture" {...Dragger_props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </Dragger>
    </div>
  );
};

export default UploadFilesComponent;
