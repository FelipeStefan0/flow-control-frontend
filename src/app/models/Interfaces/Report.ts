import { Month } from '../Enum/Month';
import { Action } from './Action';

export interface Report {
  id: number;
  month: Month;
  year: number;
  total_value: number;
  in_total_value: number;
  out_total_value: number;
  actions: Action[];
}
