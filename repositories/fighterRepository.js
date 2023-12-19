import { BaseRepository } from "./baseRepository.js";

class FighterRepository extends BaseRepository {
  constructor() {
    super("fighters");
  }

  isNameExists(name) 
  {
    return this.dbContext.find((fighter) => fighter.name?.toLowerCase() === name.toLowerCase()).value() !== undefined;
  }
}


const fighterRepository = new FighterRepository();

export { fighterRepository };
