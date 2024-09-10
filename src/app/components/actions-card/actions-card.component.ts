import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Action } from 'src/app/models/Interfaces/Action';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-actions-card',
  templateUrl: './actions-card.component.html',
  styleUrls: ['./actions-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ActionsCardComponent implements OnInit {
  @Input() action!: Action;
  @Input() date!: number[];
  @Input() value!: number;
  @Input() description!: string;
  @Input() type!: string;

  @Output() emitEditAction: EventEmitter<{id: number, action: Action}> = new EventEmitter<{id: number, action: Action}>();
  @Output() emitDeleteAction: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  editAction(id: number, action: Action) {
    let event = {id: id, action: action}
    this.emitEditAction.emit(event);
  }

  deleteAction(id: number) {
    this.emitDeleteAction.emit(id);
  }
}
