import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  form!: FormGroup;
  actions$!: Observable<any>;
  params!: any[];

  fb = inject(FormBuilder);
  http = inject(HttpClient)

  constructor() {}

  ngOnInit() {
    this.initForm();
    this.list();
  }

  initForm() {
    this.form = this.fb.group({
      amount: [null, [Validators.required]],
      notes: [null, [Validators.required]],
      types: [null, [Validators.required]]
    })
  }

  create() {
    this.params = this.form.value;
    this.http.post('http://localhost:8080/api/action', this.params).subscribe(() => this.list());
  }

  list() {
    this.actions$ = this.http.get<any[]>('http://localhost:8080/api/action');
  }

  readonly amountMask: MaskitoOptions = {
    mask: ['R$', ' ', /\d{5}/, '.', /\d/, /\d/]
  }

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();
}
