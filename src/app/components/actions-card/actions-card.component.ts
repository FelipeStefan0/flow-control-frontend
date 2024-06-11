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

  @Output() emitEditAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitDeleteAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  private as = inject(ActionService)

  constructor() {}

  ngOnInit() {}

  editAction(action: Action) {
    this.as.edit(action).subscribe((res) => {
      console.log(res);
    })
    this.emitEditAction.emit(true);
  }

  deleteAction(id: number) {
    this.as.delete(id).subscribe((res) => {
      console.log(res);
    })
    this.emitDeleteAction.emit(true);
  }
}
