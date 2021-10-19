import {Component, OnInit} from '@angular/core';
import Trade from "./trade.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  trades: Trade[] = [];

  tradeToEdit: Trade;

  ngOnInit() {
    this.createNewTrade();
  }

  createNewTrade() {
    this.tradeToEdit = {
      id: undefined,
      entryDate: undefined,
      entryPrice: undefined,
      exitDate: undefined,
      exitPrice: undefined
    };
  }

  onAddTrade(trade: any) {
    this.trades = [trade, ...this.trades];
    this.createNewTrade();
  }

  onEditTrade(id: string) {
    const trade = this.trades.find(value => value.id === id);
    if (trade) {
      this.tradeToEdit = {
        id: trade.id,
        entryDate: trade.entryDate,
        entryPrice: trade.entryPrice,
        exitDate: trade.exitDate,
        exitPrice: trade.exitPrice
      }
    }
  }

  onRemoveTrade(id: string) {
    if (this.tradeToEdit.id === id) {
      this.createNewTrade();
    }
    this.trades = this.trades.filter(value => value.id !== id);
  }

  onResetTrade() {
    this.createNewTrade();
  }

  onUpdateTrade(value: Trade) {
    const trade = this.trades.find(trade => trade.id === value.id);
    if (trade) {
      this.trades = this.trades.map(trade => {
        if (trade.id === value.id) {
          return Object.assign({}, trade, value)
        } else {
          return trade;
        }
      });
    }
    this.createNewTrade();
  }
}
