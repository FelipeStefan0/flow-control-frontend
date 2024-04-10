import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';
import { MaskitoModule } from '@maskito/angular';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    ReactiveFormsModule,
    MaskitoModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
