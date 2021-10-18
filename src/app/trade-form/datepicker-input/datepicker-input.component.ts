import {Component, ElementRef, forwardRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NgbDate, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors, Validator
} from "@angular/forms";

@Component({
  selector: 'app-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatepickerInputComponent),
      multi: true,
    }
  ]
})
export class DatepickerInputComponent implements OnInit, ControlValueAccessor, Validator   {

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target) && this.datepicker.isOpen()) {
      this.datepicker.close();
    }
  }

  @Input() id: string;

  @Input() isInvalid: boolean | undefined;

  @ViewChild('d') datepicker: NgbInputDatepicker;

  onTouch = (value: any) => {};

  onChange = (value: any) => {};

  _date: NgbDate | string;

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  set date(date: NgbDate | string) {
    this._date = date;
    if (typeof date === 'string') { // invalid date
      this.onChange(undefined);
    } else {
      const timestamp = new Date(date.year, date.month, date.day).getTime();
      this.onChange(timestamp);
    }
    this.onTouch(true);
  }

  get date() {
    return this._date;
  }

  isDateValid(date: Date) {
    return date.getTime() == date.getTime();
  }

  onClick() {
    this.datepicker.open();
  }

  toggle() {
    this.datepicker.toggle();
  }

  writeValue(value: any) {
    const date = new Date(value);
    if (!this.isDateValid(date)) {
      this._date = '';
    }
    this._date = new NgbDate(date.getFullYear(), date.getMonth(), date.getDate());
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const date = control.value;
    return date && date.year && date.month && date.day;
  }

}
