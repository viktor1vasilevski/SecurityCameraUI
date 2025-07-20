import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../core/services/camera.service';
import { NotificationService } from '../../core/services/notification.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { CommonModule } from '@angular/common';

export interface CameraRequest {
  name: string;
}

@Component({
  selector: 'app-cameras',
  imports: [CommonModule],
  templateUrl: './cameras.component.html',
  styleUrl: './cameras.component.css',
})
export class CamerasComponent implements OnInit {
  cameras: any[] = [];

  cameraRequest: CameraRequest = {
    name: '',
  };

  constructor(
    private _cameraService: CameraService,
    private _notificationService: NotificationService,
    private _errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loadCameras();
  }

  loadCameras() {
    this._cameraService.getCameras(this.cameraRequest).subscribe({
      next: (response: any) => {
        if(response && response.success && response.data) {
          this.cameras = response.data;
        } else {
          this._notificationService.error(response.message);
        }
      },
      error: (errorResponse: any) => {
        this._errorHandlerService.handleErrors(errorResponse);
      },
    });
  }
}
