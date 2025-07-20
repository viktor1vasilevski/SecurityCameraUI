import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../core/services/camera.service';
import { NotificationService } from '../../core/services/notification.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { CommonModule } from '@angular/common';
import { CameraTableComponent } from '../../core/components/camera-table/camera-table.component';
import { MapComponent } from '../../core/components/map/map.component';

export interface CameraRequest {
  name: string;
}

@Component({
  selector: 'app-cameras',
  imports: [CommonModule, CameraTableComponent, MapComponent],
  templateUrl: './cameras.component.html',
  styleUrl: './cameras.component.css',
})
export class CamerasComponent implements OnInit {
  cameras: any[] = [];

  camerasByColumn = {
    divisibleBy3: [] as any[],
    divisibleBy5: [] as any[],
    divisibleBy3And5: [] as any[],
    notDivisible: [] as any[],
  };

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
        if (response && response.success && response.data) {
          this.cameras = response.data;
          this.categorizeCameras(response.data);
        } else {
          this._notificationService.error(response.message);
        }
      },
      error: (errorResponse: any) => {
        this._errorHandlerService.handleErrors(errorResponse);
      },
    });
  }

  categorizeCameras(data: any[]) {
    this.camerasByColumn = {
      divisibleBy3: [],
      divisibleBy5: [],
      divisibleBy3And5: [],
      notDivisible: [],
    };

    for (const cam of data) {
      const number = cam.number;

      if (number % 3 === 0 && number % 5 === 0) {
        this.camerasByColumn.divisibleBy3And5.push(cam);
        //this.cameras.push(cam)
      } else if (number % 3 === 0) {
        this.camerasByColumn.divisibleBy3.push(cam);
        //this.cameras.push(cam)
      } else if (number % 5 === 0) {
        this.camerasByColumn.divisibleBy5.push(cam);
        //this.cameras.push(cam)
      } else {
        this.camerasByColumn.notDivisible.push(cam);
        //this.cameras.push(cam)
      }
    }
  }
}
