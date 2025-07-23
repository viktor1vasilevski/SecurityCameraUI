import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { CameraDTO } from '../../../features/cameras/models/camera-dto.model';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() cameras: CameraDTO[] = [];

  private map!: L.Map;
  private markersLayer = L.layerGroup();

  ngAfterViewInit(): void {
    this.initMap();
    this.updateMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cameras'] && !changes['cameras'].firstChange) {
      this.updateMarkers();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = undefined as any;
    }
  }

  private initMap(): void {
    if (this.map) return;
    this.map = L.map('map').setView([52.0914, 5.1115], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
  }

  private updateMarkers(): void {
    if (!this.map) return;

    this.markersLayer.clearLayers();

    this.cameras.forEach((cam) => {
      if (cam.latitude && cam.longitude) {
        const marker = L.marker([cam.latitude, cam.longitude], {
          icon: this.customIcon,
        }).bindPopup(`<b>${cam.name}</b><br>Number: ${cam.number}`);
        this.markersLayer.addLayer(marker);
      }
    });
  }

  private customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    shadowSize: [41, 41],
    iconAnchor: [12, 41],
    shadowAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
}
