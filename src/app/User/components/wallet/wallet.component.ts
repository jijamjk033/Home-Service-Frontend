import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { userService } from '../../services/userService';
import { ITransaction, IWallet } from '../../models/walletResponse';
import { TableComponent } from '../../../common/components/table/table.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, TableComponent,CommonModule],
  providers: [DatePipe],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})

export class WalletComponent {
  walletBalance: number = 0;
  wallet!: IWallet;
  transactions: ITransaction[] = [];
  tableHeaders = ['Date', 'Amount', 'Type'];
  headerKeys = ['date', 'amount', 'type'];

  constructor(private userService: userService, private datePipe: DatePipe) {
  }
  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.userService.getTransactions(userId).subscribe({
        next: (response) => {
          if (response) {
            this.transactions = response.data.transactions.map((transaction) => ({
              ...transaction,
              date: this.datePipe.transform(transaction.date, 'MMM dd, yyyy') || transaction.date,
            })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());;
            this.walletBalance = response.data.walletBalance;
          } else {
            console.error('No transactions found.');
          }
        },
        error: (err) => {
          console.error('Error fetching transaction details', err);
        }
      })
    }
    else {
      console.error('User not found in database');
    }
  }
}
