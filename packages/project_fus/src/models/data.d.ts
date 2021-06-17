/*
 * @Descripttion: 全局使用的数据类型
 * @Author: linkenzone
 * @Date: 2020-09-06 21:24:32
 */

export interface UseInfoDataType {
  account: string;
  department: string;
  email: string;
  id: number;
  id_card: string;
  is_super: 1;
  name: string;
  office: string;
  phone: string;
  research_center_id: number;
  research_center_name: string;
  length: number;
}

/**
 * @description: 存在其他的多选框
 * @Param:
 */
export interface MultipleChoiceDataType {
  other: string | null;
  radio: Array<string>;
}

export interface ResearchCentersDataType {
  id: number;
  name: string;
}

export interface UserAuthsDataType {
  can_export: boolean;
  can_analysis: boolean;
  can_deleteCRF: boolean;
  can_editCenterCRF: boolean;
}
