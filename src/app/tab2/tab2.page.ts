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

  fb = inject(FormBuilder);
  service = inject(ActionService);

  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      amount: ["", [Validators.required]],
      notes: ["", [Validators.required]],
      types: ["", [Validators.required]]
    })
  }

  create() {
    this.service.create(this.form.value).subscribe();
  }

  clear() {
    this.initForm();
  }
}
