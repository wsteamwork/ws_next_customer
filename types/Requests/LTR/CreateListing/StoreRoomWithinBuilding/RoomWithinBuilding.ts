export interface RoomWithinBuildingReq {
  apartment_building_id: number,
  room_number: string,
  floor: string
}

export interface AddToBuildingReq {
  apartment_building_id: number,
  room_number: string,
  list_long_term_room_id: number[],
  floor: string
}
