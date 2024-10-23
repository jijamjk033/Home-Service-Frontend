import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title!: string;
  @Input() image!: string;

  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  onDelete(): void {
    this.delete.emit();
  }

  onEdit(): void {
    this.edit.emit();
  }
}
