export interface IWallet {
  transactions: Array<ITransaction>;
  user: string;
  walletBalance: number;
  _id: string;
}

export interface ITransaction{
  date: string;
  amount: number;
  type: 'debit' | 'credit';
}

export interface WalletModel extends Document {
  user: string;
  transactions: ITransaction[];
  walletBalance?: number;
}