import {Component, Input, OnChanges, OnInit} from '@angular/core';
import Trade from "../trade.model";
import * as moment from 'moment';

@Component({
  selector: 'app-trades-chart',
  templateUrl: './trades-chart.component.html',
  styleUrls: ['./trades-chart.component.scss']
})
export class TradesChartComponent implements OnInit, OnChanges {

  @Input() trades: Trade[];

  data: object;

  legend = false;
  xAxis = true;
  yAxis = true;
  showGridLines = false;
  tooltipDisabled = true;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges() {
    if (!this.trades || !this.trades.length) return;
    this.populateData();
  }

  dateTickFormatting(date: any) {
    return moment(date).format('YYYY-MM-DD');
  }

  populateData() {
    const minDate = Math.min(...this.trades.map(trade => trade.entryDate || 0));
    const maxDate = Math.max(...this.trades.map(trade => trade.exitDate || 0));
    const allDates = [];
    let date = minDate;
    while (date <= maxDate) {
      allDates.push(date);
      date = date + 60*60*24*1000;
    }
    const chartData: { value: number, name: any }[] = allDates.map((date, i) => {
      const trades = this.trades.filter(trade => trade.entryDate! <= date && trade.exitDate! >= date);
      let profit;
      if (trades.length) {
        profit = trades.reduce((acc, trade) => acc + (trade.exitPrice! - trade.entryPrice!), 0);
      } else {
        profit = chartData[i-1].value;
      }
      return {
        value: profit,
        name: new Date(date)
      }
    });
    this.data = [{
      name: '',
      series: chartData
    }];
  }

}
