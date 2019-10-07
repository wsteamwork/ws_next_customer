export interface BedRoomReq {
  number_bed: number;
  beds: Bed[];
  area: number;
}

export interface Bed {
  number_bed: number;
  size: number;
}
