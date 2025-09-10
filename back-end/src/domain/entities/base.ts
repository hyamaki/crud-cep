import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity {
  ID?: number;

  constructor(
    ID?: number,
  ) {
    this.ID = ID;
  }
}
