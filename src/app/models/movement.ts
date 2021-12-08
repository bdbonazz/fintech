export interface Movement {
  _id: string;
  type: 'in' | 'out';
  amount: number;
  title: string;
  description: string;
  cardId: string;
  timestamp: number;
}

export interface CardMovements
{
  data: Movement[];
  total: number
}

export interface MovementsSelectorUtility
{
  cardId: string,
  movements: Movement[],
  showChunkLenght: number,
  loadingMovements: boolean
}
