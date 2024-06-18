type Order = {
  '_id': string,
  'ingredients': string[],
  'status': 'done' | 'pending',
  'name': string,
  'createdAt': Date,
  'updatedAt': Date,
  'number': number
}

export default Order;
