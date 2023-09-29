export interface ParkingIDs {
  [key: string]: string;
}

interface Occupancy {
  loop: string;
  total: string;
  monthlies: string | null;
  open_gate: string | null;
  transients: string | null;
}

interface Zone {
  spots: string;
  zone_id: string;
  occupancy: Occupancy;
  zone_name: string;
  parent_zone_id: string;
}

export interface ParkingFacility {
  tsn: string;
  time: string;
  spots: string;
  zones: Zone[];
  ParkID: string;
  occupancy: Occupancy;
  MessageDate: string;
  facility_id: string;
  facility_name: string;
  tfnsw_facility_id: string;
}
