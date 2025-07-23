import { CameraDTO } from './camera-dto.model';

export interface CameraGroupedDTO {
  divisibleBy3: CameraDTO[];
  divisibleBy5: CameraDTO[];
  divisibleBy3And5: CameraDTO[];
  notDivisible: CameraDTO[];
}
