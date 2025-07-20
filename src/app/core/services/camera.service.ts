import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  baseUrl = 'https://localhost:44348/api'

  constructor(private _dataApiService: DataService) {}

  getCameras(request: any): Observable<any> {
    const params = new HttpParams()
      .set('name', request.name)

    const url = `${this.baseUrl}/camera`;
    return this._dataApiService.getAll<any>(url, params);
  }
}
