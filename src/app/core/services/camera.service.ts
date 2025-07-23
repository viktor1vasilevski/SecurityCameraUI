import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { CameraGroupedDTO } from '../../features/cameras/models/camera-grouped-dto.model';
import { environment } from '../../../enviroments/enviroment';
import { ApiEndpoints } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataService) {}
  
  getGroupedCameras(): Observable<ApiResponse<CameraGroupedDTO>> {
    const url = `${this.baseUrl}/${ApiEndpoints.Camera.Grouped}`;
    return this._dataApiService.getAll<ApiResponse<CameraGroupedDTO>>(url);
  }
}
