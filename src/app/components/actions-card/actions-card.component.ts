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
} from '@ionic/angular/standalone';

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

  isModalOpen: boolean = false;

  constructor() {}

  ngOnInit() {}

  editAction(id: number, action: Action) {
    let event = { id: id, action: action };
    this.emitEditAction.emit(event);
  }

  deleteAction(id: number) {
    this.emitDeleteAction.emit(id);
  }

  openClose() {
    this.isModalOpen = !this.isModalOpen;
  }
}
