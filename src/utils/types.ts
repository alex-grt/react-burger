import { ReactNode, SyntheticEvent } from 'react';
import { store } from '..';

export type TStore = typeof store;

export type TDispatch = typeof store.dispatch;

export interface IHeaders {
  [name: string]: string;
}

export interface IData {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
}

export interface IDataWithTimestamp extends IData {
  timeId: number;
}

export interface IButton {
  type?: 'secondary' | 'primary';
  size?: 'small' | 'medium' | 'large';
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  disabled?: boolean;
  name?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
}

export interface ITab {
  active: boolean;
  value: string;
  onClick: (value: string) => void;
  children?: ReactNode;
}
