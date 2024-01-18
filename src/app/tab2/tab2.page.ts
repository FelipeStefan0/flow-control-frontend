import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Observable, map } from 'rxjs';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  form!: FormGroup;
  params!: any[];

  fb = inject(FormBuilder);
  service = inject(ActionService);

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      amount: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      types: [null, [Validators.required]]
    })
  }

  // readonly amountMask: MaskitoOptions = {
  //   mask: ['R$', ' ', /\d{5}/, '.', /\d/, /\d/]
  // }

  // readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


  create() {
    this.params = this.form.value;
    this.service.create(this.params).subscribe((res:any) => console.log(res))
  }

  clear() {
    this.form.setValue({
      amount: "",
      notes: "",
      types: ""
    })
  }
}
