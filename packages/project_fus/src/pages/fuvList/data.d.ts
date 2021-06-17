/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2020-09-10 20:12:53
 */

import { MultipleChoiceDataType } from '@/models/data';

export interface FuvListItemDataType {
  age: number;
  gender: string;
  hospitalNumber: string;
  id: number;
  idNumber: string;
  name: string;
  patDia: MultipleChoiceDataType;
  patNumber: string;
  phoneNumber: string;
}

export interface AddSampleDataType {
  pid: number;
  samples: FuvListItemDataType[];
  status: number;
}
