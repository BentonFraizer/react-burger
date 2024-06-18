import { Order } from './index';

type AllOrdersResponse = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: Order[]
}

export default AllOrdersResponse;
