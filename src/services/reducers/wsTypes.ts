export interface IStateWSOrders {
  connected: boolean;
  data: string;
  error?: Event | null;
  info?: Event | null;
}
