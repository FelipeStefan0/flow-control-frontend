import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionService } from '../services/action.service';
import { Action } from '../models/Interfaces/Action';
import { Location } from '@angular/common';

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

  updatingAction: boolean = false;
  data: any;

  actionTypes: { title: string; value: string }[] = [
    {
      title: 'Receita',
      value: "IN",
    },
    {
      title: 'Despesa',
      value: "OUT",
    },
  ];

  constructor(private location: Location) {}

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

  ionViewWillEnter() {
    this.data = this.location.getState();  
    const [year, month, day, hour, minute, second, millisecond] = this.data.action.date;
    if(this.data.action) { 
      delete this.data.action.id;
      this.updatingAction = true; 
      this.data.action.date = new Date(year, month-1, day, hour, minute, second, millisecond)
      this.data.action.date = new Date(this.data.action.date - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1);
      this.date = this.data.action.date;
      this.form.setValue(this.data.action);
    }
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
    let tzoffset = new Date().getTimezoneOffset() * 60000;
    if (event.detail.value) {
      this.form.get('date')?.setValue(event.detail.value);
      this.date = event.detail.value;
    } else {
      this.form
        .get('date')
        ?.setValue(new Date(Date.now() - tzoffset).toISOString().slice(0, -1));
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
    this.service.create(this.form.value).subscribe({
      next: (res: { data: Action[]; message: string; status: number }) => {
        this.toastr(res.message, 'success');
      },
      error: (err: { data: Action[]; message: string; status: number }) => { 
        this.toastr(err.message, 'failure');
      },
      complete: () => {
        this.clear();
      },
    });
  }

  edit() {
    this.service.edit(this.data.id, this.form.getRawValue()).subscribe({
      next: (res: { data: null; message: string; status: number }) => {
        this.toastr(res.message, "success");
      },
      error: (res: { data: null; message: string; status: number }) => {
        this.toastr(res.message, "failure");
      },
      complete: () => {
        this.clear();
        this.updatingAction = false;
      },
    })    
  }

  clear() {
    this.form.reset();
    this.date = '';
    this.hiddenCleanButton = true;
    this.updatingAction = false;
  }

  toastr(message: string, type?: string) {
    let body: Element = document.getElementsByClassName('ion-padding')[0];
    let div: HTMLElement = document.createElement('div');
    let text: HTMLElement = document.createElement('span');

    text.innerHTML = message;
    div.appendChild(text);

    if (type == 'success') div.style.backgroundColor = 'var(--font-success)';
    else if (type == 'failure') div.style.backgroundColor = 'var(--font-failure)';

    div.style.color = 'var(--font-tertiary)';
    div.style.width = '80%';
    div.style.height = '2.5rem';
    div.style.padding = '.2rem';
    div.style.borderRadius = '.5rem';
    div.style.position = 'absolute';
    div.style.top = '1.5rem';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.zIndex = '999';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';

    body.appendChild(div);

    setTimeout(() => {
      body.removeChild(div);
    }, 3000);
  }
}
