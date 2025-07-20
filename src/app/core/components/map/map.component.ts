import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() cameras: any[] = [];

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

  private initMap(): void {
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
        const marker = L.marker([cam.latitude, cam.longitude]).bindPopup(
          `<b>${cam.name}</b><br>Number: ${cam.number}`
        );
        this.markersLayer.addLayer(marker);
      }
    });
  }
}
