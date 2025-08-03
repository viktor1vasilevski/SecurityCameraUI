# SecurityCameraUI

SecurityCameraUI is an Angular application that visualizes and categorizes security cameras in Utrecht, Netherlands. It fetches camera data from a backend API and displays their locations on an interactive map, and organizes them into groups based on their camera number (divisible by 3, 5, both, or neither).

## Features

- **Map Visualization:**
  - Displays all camera locations on a map using Leaflet, with popups showing camera name and number.
- **Camera Grouping:**
  - Cameras are grouped into four categories:
    - Divisible by 3
    - Divisible by 5
    - Divisible by both 3 and 5
    - Not divisible by 3 or 5
  - Each group is shown in its own table.
- **Live Data:**
  - Fetches camera data from a backend API endpoint (`/camera/grouped`), which returns grouped camera data.
- **Notifications:**
  - Uses toast notifications for success and error messages.

## Getting Started

### Prerequisites
- Node.js and npm installed
- Angular CLI installed globally (`npm install -g @angular/cli`)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   ng serve
   ```
   Open your browser at [http://localhost:4200](http://localhost:4200).


## Project Structure
- `src/app/features/cameras/` – Main feature module for camera display and grouping.
- `src/app/core/components/map/` – Map component for visualizing camera locations.
- `src/app/core/services/` – Services for API communication, error handling, and notifications.
- `src/app/core/models/` – TypeScript interfaces for API responses and camera data.


## API Contract
The frontend expects the backend to provide a grouped camera endpoint at `/camera/grouped`, returning data in the following format:

```ts
interface CameraGroupedDTO {
  divisibleBy3: CameraDTO[];
  divisibleBy5: CameraDTO[];
  divisibleBy3And5: CameraDTO[];
  notDivisible: CameraDTO[];
}

interface CameraDTO {
  number: number;
  name: string;
  latitude?: number;
  longitude?: number;
}
```

## Tech Stack
- Angular 19
- Leaflet (for maps)
- Bootstrap (for styling)
- ngx-toastr (for notifications)
- TypeScript

---
