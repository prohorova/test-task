import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';
import Trade from "../trade.model";

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.scss']
})
export class TradeFormComponent implements OnInit, OnChanges {

  @Input() trade: Trade;

  @Output() addTrade: EventEmitter<Trade> = new EventEmitter<Trade>();

  @Output() updateTrade: EventEmitter<Trade> = new EventEmitter<Trade>();

  @Output() resetTrade: EventEmitter<void> = new EventEmitter<void>();

  tradeForm: FormGroup;

  isNewTrade: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.trade) {
      this.initForm();
    }
  }

  datesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const entryDate = control.get('entryDate')?.value;
    const exitDate = control.get('exitDate')?.value;

    if (!entryDate || !exitDate) return null;

    return entryDate > exitDate ? { datesReversed: true } : null;
  };

  initForm() {
    this.isNewTrade = !this.trade.id;
    this.tradeForm = this.fb.group({
      entryDate: [this.trade.entryDate, Validators.required],
      entryPrice: [this.trade.entryPrice, Validators.compose([Validators.required, Validators.min(0)])],
      exitDate: [this.trade.exitDate, Validators.required],
      exitPrice: [this.trade.exitPrice, Validators.compose([Validators.required, Validators.min(0)])]
    }, { validators: this.datesValidator });
  }

  submit() {
    if (this.isNewTrade) {
      this.addTrade.next(Object.assign({id: uuidv4()}, this.tradeForm.value));
    } else {
      this.updateTrade.next(Object.assign({id: this.trade.id}, this.tradeForm.value));
    }

  }

}
