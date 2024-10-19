export interface Coffee {
  id: number;
  name: string;
  description?: string;
  price: number;
  region: string;
  weight: number;
  flavor_profile: string[];
  grind_option: string[];
  roast_level: number;
  image_url: string;
  length: string;
}
