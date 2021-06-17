/* eslint-disable no-plusplus */
/*
 * @Descripttion: 病理诊断
 * @Author: linkenzone
 * @Date: 2020-09-24 17:34:48
 */

import React from 'react';
import { Form, TreeSelect } from 'antd';
import { FormInstance } from 'antd/lib/form';

export const treeData = [
  {
    title: '上皮型肿瘤',
    path: '上皮型肿瘤',
    value: '0-0',
    children: [
      {
        title: '腺癌',
        path: '上皮型肿瘤-腺癌',
        value: '0-0-0',
        children: [
          {
            path: '上皮型肿瘤-腺癌-贴壁型腺癌',
            title: '贴壁型腺癌',
            value: '0-0-0-0',
          },
          {
            path: '上皮型肿瘤-腺癌-腺泡型腺癌',
            title: '腺泡型腺癌',
            value: '0-0-0-1',
          },
          {
            path: '上皮型肿瘤-腺癌-乳头型腺癌',
            title: '乳头型腺癌',
            value: '0-0-0-2',
          },
          {
            path: '上皮型肿瘤-腺癌-微乳头型腺癌',
            title: '微乳头型腺癌',
            value: '0-0-0-3',
          },
          {
            path: '上皮型肿瘤-腺癌-实体型腺癌',
            title: '实体型腺癌',
            value: '0-0-0-4',
          },
          {
            path: '上皮型肿瘤-腺癌-浸润性粘液腺癌',
            title: '浸润性粘液腺癌',
            value: '0-0-0-5',
            children: [
              {
                path: '上皮型肿瘤-腺癌-浸润性粘液腺癌-浸润和非浸润性混合型粘液性腺癌',
                title: '浸润和非浸润性混合型粘液性腺癌',
                value: '0-0-0-5-0',
              },
            ],
          },
          {
            path: '上皮型肿瘤-腺癌-胶质性腺癌',
            title: '胶质性腺癌',
            value: '0-0-0-6',
          },
          {
            path: '上皮型肿瘤-腺癌-胎儿型腺癌',
            title: '胎儿型腺癌',
            value: '0-0-0-7',
          },
          {
            path: '上皮型肿瘤-腺癌-肠型腺癌',
            title: '肠型腺癌',
            value: '0-0-0-8',
          },
          {
            path: '上皮型肿瘤-腺癌-微小浸润性腺癌',
            title: '微小浸润性腺癌',
            value: '0-0-0-9',
            children: [
              {
                path: '上皮型肿瘤-腺癌-微小浸润性腺癌-非粘液性腺癌',
                title: '非粘液性腺癌',
                value: '0-0-0-9-0',
              },
              {
                path: '上皮型肿瘤-腺癌-微小浸润性腺癌-粘液癌',
                title: '粘液癌',
                value: '0-0-0-9-1',
              },
            ],
          },
          {
            path: '上皮型肿瘤-腺癌-侵袭前病变',
            title: '侵袭前病变',
            value: '0-0-0-10',
            children: [
              {
                path: '上皮型肿瘤-腺癌-侵袭前病变-非典型腺瘤样增生',
                title: '非典型腺瘤样增生',
                value: '0-0-0-10-0',
              },
              {
                path: '上皮型肿瘤-腺癌-侵袭前病变-原位腺癌',
                title: '原位腺癌',
                value: '0-0-0-10-1',
                children: [
                  {
                    path: '上皮型肿瘤-腺癌-侵袭前病变-原位腺癌-非粘液性原位腺癌',
                    title: '非粘液性原位腺癌',
                    value: '0-0-0-10-1-0',
                  },
                  {
                    path: '上皮型肿瘤-腺癌-侵袭前病变-原位腺癌-粘液性原位腺癌',
                    title: '粘液性原位腺癌',
                    value: '0-0-0-10-1-1',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '上皮型肿瘤-鳞癌',
        title: '鳞癌',
        value: '0-0-1',
        children: [
          {
            path: '上皮型肿瘤-鳞癌-角化型鳞癌',
            title: '角化型鳞癌',
            value: '0-0-1-0',
          },
          {
            path: '上皮型肿瘤-鳞癌-非角化型鳞癌',
            title: '非角化型鳞癌',
            value: '0-0-1-1',
          },
          {
            path: '上皮型肿瘤-鳞癌-基底鳞状细胞癌',
            title: '基底鳞状细胞癌',
            value: '0-0-1-2',
          },
          {
            path: '上皮型肿瘤-鳞癌-侵袭前病变',
            title: '侵袭前病变',
            value: '0-0-1-3',
            children: [
              {
                path: '上皮型肿瘤-鳞癌-侵袭前病变-鳞状细胞原位癌',
                title: '鳞状细胞原位癌',
                value: '0-0-1-3-0',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '神经内分泌肿瘤',
    title: '神经内分泌肿瘤',
    value: '0-1',
    children: [
      {
        path: '神经内分泌肿瘤-小细胞癌',
        title: '小细胞癌',
        value: '0-1-0',
        children: [
          {
            path: '神经内分泌肿瘤-小细胞癌-结合小细胞癌',
            title: '结合小细胞癌',
            value: '0-1-0-0',
          },
        ],
      },
      {
        title: '大细胞神经内分泌癌',
        path: '神经内分泌肿瘤-大细胞神经内分泌癌',
        value: '0-1-1',
        children: [
          {
            path: '神经内分泌肿瘤-大细胞神经内分泌癌-结合大细胞神经内分泌癌',
            title: '结合大细胞神经内分泌癌',
            value: '0-1-1-0',
          },
        ],
      },
      {
        title: '类癌肿瘤',
        path: '神经内分泌肿瘤-类癌肿瘤',
        value: '0-1-2',
        children: [
          {
            title: '典型类癌肿瘤',
            path: '神经内分泌肿瘤-类癌肿瘤-典型类癌肿瘤',
            value: '0-1-2-0',
          },
          {
            title: '非典型类癌肿瘤',
            path: '神经内分泌肿瘤-类癌肿瘤-非典型类癌肿瘤',
            value: '0-1-2-1',
          },
        ],
      },
      {
        title: '侵袭前的病变',
        path: '神经内分泌肿瘤-侵袭前的病变',
        value: '0-1-3',
        children: [
          {
            title: '弥漫性特发性肺神经内分泌细胞增生',
            path: '神经内分泌肿瘤-侵袭前的病变-弥漫性特发性肺神经内分泌细胞增生',
            value: '0-1-3-0',
          },
        ],
      },
      {
        title: '大细胞癌',
        path: '神经内分泌肿瘤-大细胞癌',
        value: '0-1-4',
      },
      {
        title: '腺鳞癌',
        path: '神经内分泌肿瘤-腺鳞癌',
        value: '0-1-5',
      },
      {
        title: '癌肉瘤样癌',
        path: '神经内分泌肿瘤-癌肉瘤样癌',
        value: '0-1-6',
        children: [
          {
            title: '多形性癌',
            path: '神经内分泌肿瘤-癌肉瘤样癌-多形性癌',
            value: '0-1-6-0',
          },
          {
            title: '梭形细胞癌',
            path: '神经内分泌肿瘤-癌肉瘤样癌-梭形细胞癌',
            value: '0-1-6-1',
          },
          {
            title: '巨细胞癌',
            path: '神经内分泌肿瘤-癌肉瘤样癌-巨细胞癌',
            value: '0-1-6-2',
          },
          {
            title: '癌肉瘤',
            path: '神经内分泌肿瘤-癌肉瘤样癌-癌肉瘤',
            value: '0-1-6-3',
          },
          {
            title: '肺胚细胞瘤',
            path: '神经内分泌肿瘤-癌肉瘤样癌-肺胚细胞瘤',
            value: '0-1-6-4',
          },
        ],
      },
      {
        title: '其他未分类癌',
        path: '神经内分泌肿瘤-其他未分类癌',
        value: '0-1-7',
        children: [
          {
            title: '淋巴上皮样癌',
            path: '神经内分泌肿瘤-其他未分类癌-淋巴上皮样癌',
            value: '0-1-7-0',
          },
          {
            title: 'NUT肿瘤',
            path: '神经内分泌肿瘤-其他未分类癌-NUT肿瘤',
            value: '0-1-7-1',
          },
        ],
      },
      {
        title: '唾液型肿瘤',
        path: '神经内分泌肿瘤-唾液型肿瘤',
        value: '0-1-8',
        children: [
          {
            title: '粘液表皮样癌肿瘤',
            path: '神经内分泌肿瘤-唾液型肿瘤-粘液表皮样癌肿瘤',
            value: '0-1-8-0',
          },
          {
            title: '腺样囊性癌',
            path: '神经内分泌肿瘤-唾液型肿瘤-腺样囊性癌',
            value: '0-1-8-1',
          },
          {
            title: '上皮-肌上皮癌',
            path: '神经内分泌肿瘤-唾液型肿瘤-上皮-肌上皮癌',
            value: '0-1-8-2',
          },
          {
            title: '多形性腺瘤',
            path: '神经内分泌肿瘤-唾液型肿瘤-多形性腺瘤',
            value: '0-1-8-3',
          },
        ],
      },
      {
        title: '乳头状瘤',
        path: '神经内分泌肿瘤-乳头状瘤',
        value: '0-1-9',
        children: [
          {
            title: '鳞状细胞乳头状癌',
            path: '神经内分泌肿瘤-乳头状瘤-鳞状细胞乳头状癌',
            value: '0-1-9-0',
            children: [
              {
                title: '外生型',
                path: '神经内分泌肿瘤-乳头状瘤-鳞状细胞乳头状癌-外生型',
                value: '0-1-9-0-0',
              },
              {
                title: '逆向生长',
                path: '神经内分泌肿瘤-乳头状瘤-鳞状细胞乳头状癌-逆向生长',
                value: '0-1-9-0-1',
              },
            ],
          },
          {
            title: '腺型状瘤',
            path: '神经内分泌肿瘤-乳头状瘤-腺型状瘤',
            value: '0-1-9-1',
          },
          {
            title: '腺鳞混合型乳头状瘤',
            path: '神经内分泌肿瘤-乳头状瘤-腺鳞混合型乳头状瘤',
            value: '0-1-9-2',
          },
        ],
      },
      {
        title: '腺瘤',
        path: '神经内分泌肿瘤-腺瘤',
        value: '0-1-10',
        children: [
          {
            title: '良性硬化性肺细胞瘤',
            path: '神经内分泌肿瘤-腺瘤-良性硬化性肺细胞瘤',
            value: '0-1-10-0',
          },
          {
            title: '泡腺腺瘤',
            path: '神经内分泌肿瘤-腺瘤-泡腺腺瘤',
            value: '0-1-10-1',
          },
          {
            title: '乳头状腺瘤',
            path: '神经内分泌肿瘤-腺瘤-乳头状腺瘤',
            value: '0-1-10-2',
          },
          {
            title: '粘液性囊腺瘤腺瘤',
            path: '神经内分泌肿瘤-腺瘤-粘液性囊腺瘤腺瘤',
            value: '0-1-10-3',
          },
          {
            title: '粘液腺腺瘤',
            path: '神经内分泌肿瘤-腺瘤-粘液腺腺瘤',
            value: '0-1-10-4',
          },
        ],
      },
    ],
  },
  {
    title: '间叶性肿瘤',
    path: '间叶性肿瘤',
    value: '0-2',
    children: [
      {
        title: '肺错构瘤',
        path: '间叶性肿瘤-肺错构瘤',
        value: '0-2-0',
      },
      {
        title: '软骨瘤',
        path: '间叶性肿瘤-软骨瘤',
        value: '0-2-1',
      },
      {
        title: 'PEComatous肿瘤',
        path: '间叶性肿瘤-PEComatous肿瘤',
        value: '0-2-2',
        children: [
          {
            title: '淋巴管平滑肌瘤病',
            path: '间叶性肿瘤-PEComatous肿瘤-淋巴管平滑肌瘤病',
            value: '0-2-2-0',
          },
          {
            title: 'PEComa-良性',
            path: '间叶性肿瘤-PEComatous肿瘤-PEComa-良性',
            value: '0-2-2-1',
            children: [
              {
                title: '透明细胞瘤',
                path: '间叶性肿瘤-PEComatous肿瘤-PEComa-良性-透明细胞瘤',
                value: '0-2-2-1-0',
              },
            ],
          },
          {
            title: 'PEComa-恶性',
            path: '间叶性肿瘤-PEComatous肿瘤-PEComa-恶性',
            value: '0-2-2-2',
          },
        ],
      },
      {
        title: '先天性支气管周肌纤维母细胞肿瘤',
        path: '间叶性肿瘤-先天性支气管周肌纤维母细胞肿瘤',
        value: '0-2-3',
      },
      {
        title: '弥漫性肺淋巴管瘤病',
        path: '间叶性肿瘤-弥漫性肺淋巴管瘤病',
        value: '0-2-4',
      },
      {
        title: '炎症性肌纤维母细胞瘤',
        path: '间叶性肿瘤-炎症性肌纤维母细胞瘤',
        value: '0-2-5',
      },
      {
        title: '上皮样血管内皮瘤',
        path: '间叶性肿瘤-上皮样血管内皮瘤',
        value: '0-2-6',
      },
      {
        title: '胸膜肺母细胞瘤',
        path: '间叶性肿瘤-胸膜肺母细胞瘤',
        value: '0-2-7',
      },
      {
        title: '滑膜肉瘤',
        path: '间叶性肿瘤-滑膜肉瘤',
        value: '0-2-8',
      },
      {
        title: '肺动脉内膜肉瘤',
        path: '间叶性肿瘤-肺动脉内膜肉瘤',
        value: '0-2-9',
      },
      {
        title: '肺黏液肉瘤伴EWSR1-CREB1易位',
        path: '间叶性肿瘤-肺黏液肉瘤伴EWSR1-CREB1易位',
        value: '0-2-10',
      },
      {
        title: '肌上皮肿瘤',
        path: '间叶性肿瘤-肌上皮肿瘤',
        value: '0-2-11',
        children: [
          {
            title: '肌上皮瘤',
            path: '间叶性肿瘤-肌上皮肿瘤-肌上皮瘤',
            value: '0-2-11-0',
          },
          {
            title: '肌上皮癌',
            path: '间叶性肿瘤-肌上皮肿瘤-肌上皮癌',
            value: '0-2-11-1',
          },
        ],
      },
      {
        title: '淋巴细胞组织细胞肿瘤',
        path: '间叶性肿瘤-淋巴细胞组织细胞肿瘤',
        value: '0-2-12',
      },
      {
        title: '结外边缘区黏膜相关淋巴组织淋巴瘤（MALT淋巴瘤）',
        path: '间叶性肿瘤-结外边缘区黏膜相关淋巴组织淋巴瘤（MALT淋巴瘤）',
        value: '0-2-13',
      },
      {
        title: '弥漫性大细胞淋巴瘤',
        path: '间叶性肿瘤-弥漫性大细胞淋巴瘤',
        value: '0-2-14',
      },
      {
        title: '淋巴瘤样肉芽肿',
        path: '间叶性肿瘤-淋巴瘤样肉芽肿',
        value: '0-2-15',
      },
      {
        title: '血管内大B细胞淋巴瘤',
        path: '间叶性肿瘤-血管内大B细胞淋巴瘤',
        value: '0-2-16',
      },
      {
        title: '肺朗格罕细胞组织细胞增生症',
        path: '间叶性肿瘤-肺朗格罕细胞组织细胞增生症',
        value: '0-2-17',
      },
      {
        title: 'Erdheim-Chester病',
        path: '间叶性肿瘤-Erdheim-Chester病',
        value: '0-2-18',
      },
    ],
  },
  {
    title: '异位肿瘤',
    path: '异位肿瘤',
    value: '0-3',
    children: [
      {
        title: '生殖细胞肿瘤',
        path: '异位肿瘤-生殖细胞肿瘤',
        value: '0-3-0',
        children: [
          {
            title: '畸胎瘤-成熟',
            path: '异位肿瘤-生殖细胞肿瘤-畸胎瘤-成熟',
            value: '0-3-0-0',
          },
          {
            title: '畸胎瘤-不成熟',
            path: '异位肿瘤-生殖细胞肿瘤-畸胎瘤-不成熟',
            value: '0-3-0-1',
          },
        ],
      },
      {
        title: '肺内的胸腺瘤',
        path: '异位肿瘤-肺内的胸腺瘤',
        value: '0-3-1',
      },
      {
        title: '黑色素瘤',
        path: '异位肿瘤-黑色素瘤',
        value: '0-3-2',
      },
      {
        title: '脑膜瘤',
        path: '异位肿瘤-脑膜瘤',
        value: '0-3-3',
      },
    ],
  },
  {
    title: '转移性肿瘤',
    path: '转移性肿瘤',
    value: '0-4',
  },
  {
    title: '其他',
    path: '其他',
    value: '0-5',
  },
];

interface PatDiaFormItemProps {
  form: FormInstance<any>;
  setPatDiaOthers: (value: any) => void;
  name: string;
}

const PatDiaFormItem: React.FC<PatDiaFormItemProps> = (props) => {
  const { setPatDiaOthers, form, name } = props;
  const onPatDiaChange = (value: string[]) => {
    if (value.length !== 0) {
      let has_other = false;
      const last_node = value[value.length - 1];
      const item_list = last_node.split('-');
      const same_parent_list = [];

      if (item_list.length > 2) {
        // console.log('item_list', item_list);
        for (let i = 1; i < item_list.length - 1; i++) {
          let same_parent_str = '';
          for (let y = 0; y <= i; y++) {
            same_parent_str += `${item_list[y]}-`;
          }
          // console.log('需要删除的', same_parent_str.slice(0, -1));
          same_parent_list.push(same_parent_str.slice(0, -1));
        }
      }

      const result = [];

      // eslint-disable-next-line guard-for-in
      for (const index in value) {
        let isDel = false;
        if (value[index] === '0-5') {
          console.log('选择了其他');
          has_other = true;
        }
        for (const _index in same_parent_list) {
          // console.log('same_parent_list', same_parent_list[_index]);
          // console.log('value', value[index]);

          if (value[index] === same_parent_list[_index]) {
            console.log('删除 父亲节点', value[index]);
            // value.splice(parseInt(index, 10), 1);
            isDel = true;
            break;
          }
        }
        // console.log('value[index]', value[index]);
        const reg = new RegExp(`^${last_node}-.*$`);
        if (reg.test(value[index])) {
          console.log('删除 子节点', value[index]);
          // value.splice(parseInt(index, 10), 1);
          isDel = true;
        }
        if (!isDel) {
          console.log('result push', value[index]);
          result.push(value[index]);
        }
      }
      // value = result;
      console.log('result', result);
      setPatDiaOthers(has_other);
      form.setFieldsValue({ [name]: { radio: result } });
    } else {
      setPatDiaOthers(false);
    }
  };

  return (
    <Form.Item label="病理诊断" name={[name, 'radio']}>
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        treeNodeLabelProp="path"
        allowClear
        multiple
        treeData={treeData}
        onChange={onPatDiaChange}
      />
    </Form.Item>
  );
};

export default PatDiaFormItem;
