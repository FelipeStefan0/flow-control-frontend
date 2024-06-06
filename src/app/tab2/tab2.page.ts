import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionService } from '../services/action.service';
import { map, tap } from 'rxjs';

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

  date!: string;

  actionTypes : {title: string, value: number}[] = [
    {
      title: "Receita",
      value: 0
    },
    {
      title: "Despesa",
      value: 1
    }
  ]

  constructor() {}

  ngOnInit() {
    this.initForm();
    // let value;
    // this.form.get("amount")?.valueChanges.pipe(
    //   map((res:string) => {
    //     res = res.replace(/[^0-9\.]+/g, "")
    //     return res;
    //   })
    // ).subscribe((res:string) => {
    //   console.log("Ola");
    //   value = res;
    //   return value;
    // }) 
    // this.form.get("amount")?.setValue(value);
  }

  initForm() {
    this.form = this.fb.group({
      value: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });

    let initValueForm = JSON.parse(JSON.stringify(this.form.getRawValue()));
    this.form.valueChanges.subscribe(() => {
      if (this.form.getRawValue() != initValueForm) {
        this.hiddenCleanButton = false;
      }
    });
  }

  openClose() {
    this.showCalendar = !this.showCalendar;
  }

  getDate(event: any) {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    if (event.detail.value) {
      this.form.get('date')?.setValue(event.detail.value);
      this.date = event.detail.value;
    } else {
      this.form.get('date')?.setValue(new Date(Date.now() - tzoffset).toISOString().slice(0, -1));
      this.date = new Date().toISOString();
    }
    this.openClose();
  }

  // amountMask() {
  //   let value;
  //   this.form.get("amount")?.valueChanges.pipe(
  //     map((res:string) => {
  //       res = res.replace(/[^0-9\.]+/g, "")
  //       return res;
  //     })
  //   ).subscribe((res:string) => {
  //     value = res;
  //     return value;
  //   }) 
  //   this.form.get("amount")?.setValue(value);
  // }

  create() {
    this.service.create(this.form.value).subscribe();
  }

  clear() {
    this.form.reset();
    this.date = "";
    this.hiddenCleanButton = true;
  }
}
