import { IData, IDataWithTimestamp } from "./types";

export function calculateSum(arr: IData[] | IDataWithTimestamp[]): number {
  const buns = arr?.filter(item => item.type === 'bun' ? item : null);
  const bunPrice = buns && buns?.length > 0 ? buns[0].price : 0;
  const filling = arr?.filter(item => item.type !== 'bun' ? item : null);
  const sumFilling: number = filling?.reduce(
    (sum, item) => sum = sum + item.price,
    0
  );
  const fillingPrice = sumFilling ? sumFilling : 0;
  const sum: number = (2 * bunPrice) + fillingPrice;

  return sum;
}
