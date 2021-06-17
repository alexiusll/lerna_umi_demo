import React, { FC, useEffect, useState } from 'react';
import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import { connect } from 'dva';
// import router from 'umi/router'
import { history } from 'umi';
import styles from './style.less';
import Cookies from 'js-cookie';

import fus_app_img from '@/assets/fus_app.png';
import crm_app_img from '@/assets/crm_app.png';
import mips_app_img from '@/assets/mips_app.png';

// const { Option } = Select
// const FormItem = Form.Item
const { Paragraph } = Typography;

const list = [
  {
    cover: fus_app_img,
    subDescription: '随访管理系统',
    title: '随访管理系统',
    url: '/fu',
  },
  {
    cover: crm_app_img,
    subDescription: '医学试验系统,收录了许多临床试验项目',
    title: '临床研究管理系统',
    url: '/project',
  },
  {
    cover: mips_app_img,
    subDescription: '医学影像系统',
    title: '医学影像处理系统(敬请期待)',
    url: '/applications',
  },
];

export const ApplicationsList = (props) => {
  // eslint-disable-next-line react/prop-types
  const { tokens } = props;

  const [disableState, setDisableState] = useState([0, 0, 1]);

  // useEffect(() => {
  //   console.log('tokens', tokens)
  // }, [tokens])

  useEffect(() => {
    console.log('token信息', Cookies.get());
    const list = [];
    list[0] = Cookies.get('token_5') ? 0 : 1;
    list[1] = Cookies.get('token_1') || Cookies.get('token_2') || Cookies.get('token_3') ? 0 : 1;
    list[2] = 1;
    setDisableState(list);
  }, []);

  const cardList = (
    <List
      rowKey="id"
      // loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={list}
      renderItem={(item, index) => (
        <List.Item>
          <Card
            onClick={() => {
              console.log('点击了:' + item.title + '  url:' + item.url + ' index:' + index);
              console.log('disableState[index]', disableState[index]);
              if (!disableState[index]) {
                if (item.title === '随访管理系统') {
                  // console.log('tokens', tokens)
                  // if (tokens[2][5]) {
                  //   Cookies.set('token_fus', tokens[2][5], {
                  //     expires: 7,
                  //     path: '/',
                  //     domain: window.location.hostname
                  //   })
                  // }

                  // window.location.href = `${item.url}/#/`

                  window.location.href = FUS_HREF;
                } else {
                  history.push(item.url);
                }
              } else {
                console.log('禁用');
              }
            }}
            className={disableState[index] ? styles.card_disable : styles.card}
            hoverable={!disableState[index]}
            cover={
              <img
                alt={item.title}
                src={item.cover}
                style={{ opacity: disableState[index] ? 0.6 : 1 }}
              />
            }
          >
            {/* <Card.Meta
              style={{ textAlign: 'center' }}
              title={<a>{item.title}</a>}
              // description={
              //   <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
              //     {item.subDescription}
              //   </Paragraph>
              // }
            /> */}
            {/* <div className={styles.cardItemContent}>
              <span>2小时前</span>
            </div> */}
          </Card>
        </List.Item>
      )}
    />
  );
  return (
    <div className={styles.coverCardList}>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    tokens: state.login.tokens,
  };
}

export default connect(mapStateToProps)(ApplicationsList);
