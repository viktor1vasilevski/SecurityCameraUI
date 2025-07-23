import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../core/services/camera.service';
import { NotificationService } from '../../core/services/notification.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { CommonModule } from '@angular/common';
import { CameraTableComponent } from '../../core/components/camera-table/camera-table.component';
import { MapComponent } from '../../core/components/map/map.component';
import { ApiResponse } from '../../core/models/api-response';
import { CameraDTO } from './models/camera-dto.model';
import { CameraGroupedDTO } from './models/camera-grouped-dto.model';

@Component({
  selector: 'app-cameras',
  imports: [CommonModule, CameraTableComponent, MapComponent],
  templateUrl: './cameras.component.html',
  styleUrl: './cameras.component.css',
})
export class CamerasComponent implements OnInit {
  cameras: CameraDTO[] = [];

  camerasByColumn: CameraGroupedDTO = {
    divisibleBy3: [],
    divisibleBy5: [],
    divisibleBy3And5: [],
    notDivisible: [],
  };

  constructor(
    private _cameraService: CameraService,
    private _notificationService: NotificationService,
    private _errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loadGroupedCameras();
  }

  loadGroupedCameras() {
    this._cameraService.getGroupedCameras().subscribe({
      next: (response: ApiResponse<CameraGroupedDTO>) => {
        if (response && response.success && response.data) {
          this.camerasByColumn = response.data;
          this.cameras = [
            ...response.data.divisibleBy3,
            ...response.data.divisibleBy5,
            ...response.data.divisibleBy3And5,
            ...response.data.notDivisible,
          ];
        } else {
          this._notificationService.notify(
            response.notificationType,
            response.message
          );
        }
      },
      error: (errorResponse: ApiResponse<CameraGroupedDTO>) => {
        this._errorHandlerService.handleErrors(errorResponse);
      },
    });
  }
}
