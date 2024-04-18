import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-actions-card',
  templateUrl: './actions-card.component.html',
  styleUrls: ['./actions-card.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ActionsCardComponent  implements OnInit {

  @Input() hours!: Date;
  @Input() amount!: number;
  @Input() notes!: string;
  @Input() type!: string;

  @Output() emitEditAction: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitDeleteAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  editAction() {
    this.emitEditAction.emit(true);
  }

  deleteAction() {
    this.emitDeleteAction.emit(true);
  }
}
