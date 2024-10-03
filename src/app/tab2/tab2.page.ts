import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionService } from '../services/action.service';
import { Action } from '../models/Interfaces/Action';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';

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

  loading: boolean = false;

  constructor(private location: Location, private toastController: ToastController) {}

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
    if(Object.keys(this.data).length > 1) {
      const [year, month, day, hour, minute, second, millisecond] = this.data.action.date;
      if(this.data.action) { 
        delete this.data.action.id;
        this.data.action.date = new Date(year, month-1, day, hour, minute, second, millisecond*0.000001);
        this.updatingAction = true; 
        this.data.action.date = new Date(this.data.action.date - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1);
        this.date = this.data.action.date;
        this.form.setValue(this.data.action);
      }
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
    this.loading = true;
    this.service.create(this.form.getRawValue()).subscribe({
      next: (res: { data: Action[]; message: string; status: number }) => {
        this.presentToast(res.message, true);

      },
      error: (err: { data: Action[]; message: string; status: number }) => { 
        this.presentToast(err.message, false);
        this.loading = false;
      },
      complete: () => {
        this.clear();
        this.loading = false;
      },
    });
  }

  edit() {
    this.service.edit(this.data.id, this.form.getRawValue()).subscribe({
      next: (res: { data: null; message: string; status: number }) => {
        this.presentToast(res.message, true);
      },
      error: (err: { data: null; message: string; status: number }) => {
        this.presentToast(err.message, false);
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

  async presentToast(message: string, status: boolean) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: status ? 'success' : 'failure'
    })

    await toast.present();
  }
}
