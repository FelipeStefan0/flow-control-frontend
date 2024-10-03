import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonTitle,
  IonContent,
  ModalController,
} from '@ionic/angular/standalone';
import { Action } from 'src/app/models/Interfaces/Action';

@Component({
  selector: 'app-buttons-modal',
  templateUrl: './buttons-modal.component.html',
  styleUrls: ['./buttons-modal.component.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonButtons, IonButton, IonToolbar, IonHeader],
})
export class ButtonsModalComponent implements OnInit {
  action: string = "";

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this.modalController.dismiss(null);
  }

  editAction() {
    return this.modalController.dismiss("edit");
  }

  deleteAction() {
    return this.modalController.dismiss("delete");
  }
}
