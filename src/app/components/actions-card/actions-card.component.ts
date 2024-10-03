import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Action } from 'src/app/models/Interfaces/Action';
import { ActionService } from 'src/app/services/action.service';
import {
  IonModal,
  IonHeader,
  IonTitle,
  IonButtons,
  IonButton,
  IonToolbar,
  IonContent,
  ModalController,
} from '@ionic/angular/standalone';
import { ButtonsModalComponent } from '../buttons-modal/buttons-modal.component';

@Component({
  selector: 'app-actions-card',
  templateUrl: './actions-card.component.html',
  styleUrls: ['./actions-card.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonToolbar,
    IonButton,
    IonButtons,
    IonTitle,
    IonHeader,
    IonModal,
    CommonModule,
  ],
})
export class ActionsCardComponent implements OnInit {
  @Input() action!: Action;
  @Input() date!: number[];
  @Input() value!: number;
  @Input() description!: string;
  @Input() type!: string;

  @Output() emitEditAction: EventEmitter<{ id: number; action: Action }> =
    new EventEmitter<{ id: number; action: Action }>();
  @Output() emitDeleteAction: EventEmitter<number> = new EventEmitter<number>();

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalController.create({
      component: ButtonsModalComponent,
      initialBreakpoint: 0.3
    })
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data == "edit") {
      this.editAction(this.action.id, this.action);
    } else if (data == "delete") {
      this.deleteAction(this.action.id);
    } 
  }

  editAction(id: number, action: Action) {
    let event = { id: id, action: action };
    this.emitEditAction.emit(event);
  }

  deleteAction(id: number) {
    this.emitDeleteAction.emit(id);
  }
}
