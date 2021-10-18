import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { DatepickerInputComponent } from './trade-form/datepicker-input/datepicker-input.component';
import { TradesTableComponent } from './trades-table/trades-table.component';
import { MomentModule } from 'ngx-moment';
import { TradeFormComponent } from './trade-form/trade-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerInputComponent,
    TradesTableComponent,
    TradeFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
