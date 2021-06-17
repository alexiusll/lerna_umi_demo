/*
 * @Descripttion: 既往史数据格式
 * @Author: linkenzone
 * @Date: 2020-09-15 14:35:04
 */

import { MultipleChoiceDataType } from '@/models/data';

export interface DrinkingHisDataType {
  drinkDayAvg: number;
  drinkYearAvg: number;
  stopDringHis: number;
  stopDrink: boolean;
}

export interface SmokingHisDataType {
  smokeDayAvg: number;
  smokeYearAvg: number;
  stopSmoke: boolean;
  stopSmokeHis: number;
}

export interface HormoneUseHisDataType {
  drugDose: string;
  drugName: string;
  duration: string;
  id: number;
  key: number;
}

export interface DrugUseHisDataType {
  drugDose: string;
  drugName: string;
  duration: string;
  id: number;
  key: number;
}

export interface PastHistoryDataType {
  basDisHis: MultipleChoiceDataType;
  drink: boolean;
  drinkingHis: DrinkingHisDataType;
  drug: boolean;
  drugUseHis: DrugUseHisDataType[];
  hormone: boolean;
  hormoneUseHis: HormoneUseHisDataType[];
  id: number;
  infDisHis: MultipleChoiceDataType;
  pid: number;
  smoke: boolean;
  smokingHis: SmokingHisDataType;
  tumFamHis: MultipleChoiceDataType;
  tumHis: MultipleChoiceDataType;
  tumor: boolean;
  tumorFam: boolean;
}

// type = 1 激素史
// type =0 其他药物史
export interface HormoneHistoryDataType {
  drug_dose: string;
  drug_name: string;
  id: number;
  use_time: number;
}

export interface DrugHistoryDataType {
  drug_dose: string;
  drug_name: string;
  id: number;
  use_time: number;
}
