import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  form!: FormGroup;

  fb = inject(FormBuilder);
  service = inject(ActionService);

  hiddenCleanButton: boolean = true;
  showCalendar: boolean = false;

  amount!: number;
  date!: string;

  constructor() {}

  ngOnInit() {
    this.initForm();
    let initValueForm = JSON.parse(JSON.stringify(this.form.getRawValue()));
    this.form.valueChanges.subscribe(() => {
      if (this.form.getRawValue() != initValueForm) {
        this.hiddenCleanButton = false;
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      amount: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      types: ['', [Validators.required]],
    });
  }

  openClose() {
    this.showCalendar = !this.showCalendar;
  }

  getDate(event: any) {
    if (event.detail.value) {
      this.form.get('hours')?.setValue(event.detail.value);
      this.date = event.detail.value;
    }
    else {
      this.form.get('hours')?.setValue(new Date().toISOString());
      this.date = new Date().toISOString();
    }
    this.openClose();
  }

  create() {
    this.service.create(this.form.value).subscribe();
  }

  clear() {
    this.form.reset();
    this.hiddenCleanButton = true;
  }
}
