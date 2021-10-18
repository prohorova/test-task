import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-trades-table',
  templateUrl: './trades-table.component.html',
  styleUrls: ['./trades-table.component.scss']
})
export class TradesTableComponent implements OnInit {

  @Input() trades: any[];

  @Output() removeTrade: EventEmitter<string> = new EventEmitter<string>();

  @Output() editTrade: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
