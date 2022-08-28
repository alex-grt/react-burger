import { ReactNode, SyntheticEvent } from 'react';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '..';
import { TActions } from '../services/actions/types';

export type TStore = ReturnType<typeof store.getState>;

export type TDispatch = ThunkDispatch<TStore, never, TActions>;

export type TThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TStore,
  never,
  TActions
>;

export type TIngredientList = string[];

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

export interface IOrder {
  readonly ingredients?: IData[];
  readonly _id?: string;
  readonly owner?: {
    readonly name: string;
    readonly email: string;
    readonly createdAt: string;
    readonly updatedAt: string;
  };
  readonly status?: string;
  readonly name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly number?: number;
  readonly price?: number;
}

export interface IWSOrder {
  readonly _id: string;
  readonly ingredients: string[];
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
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
