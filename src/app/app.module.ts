import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { DatepickerInputComponent } from './trade-form/datepicker-input/datepicker-input.component';
import { TradesTableComponent } from './trades-table/trades-table.component';
import { MomentModule } from 'ngx-moment';
import { TradeFormComponent } from './trade-form/trade-form.component';
import { TradesChartComponent } from './trades-chart/trades-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerInputComponent,
    TradesTableComponent,
    TradeFormComponent,
    TradesChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MomentModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
