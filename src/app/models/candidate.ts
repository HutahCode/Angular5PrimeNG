import { Favourite } from './favourite';

export class Candidate {
  id: number;
  name: string;
  dob: Date;
  gender: string;
  favouriteCollection: Favourite[];
}
