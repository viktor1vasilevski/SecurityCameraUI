import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-camera-table',
  imports: [CommonModule],
  templateUrl: './camera-table.component.html',
  styleUrl: './camera-table.component.css',
})
export class CameraTableComponent {
  @Input() cameras: any[] = [];
  @Input() title: string = '';
}
