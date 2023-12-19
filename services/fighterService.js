import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {

  create(data)
  {
    if(fighterRepository.isNameExists(data.name))
    {
      throw Error('A fighter with the same name exists.')
    }
    data.health = 100;
    const item = fighterRepository.create(data);
    if(!item)
    {
      throw Error("Couldn`t create a fighter.");
    }
    return item;
  }
  
  getAll()
  {
    const item = fighterRepository.getAll();
    return item;
  }

  getById(id)
  {
    const item = this.search({id : id});
    if(!item)
    {
      throw Error("Fighter is not found")
    }
    return item;
  }

  update(id, newData)
  {
    if(fighterRepository.isNameExists(newData.name))
    {
      throw Error('A fighter with the same name exists.')
    }
    const item = this.getById(id);

    if(item)
    {
      fighterRepository.update(id, newData);
    }

    return item;
  }

  delete(id)
  {
    const item = this.getById(id);

    if(item)
    {
      fighterRepository.delete(id);
    }

    return item;
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
  // TODO: Implement methods to work with fighters
}

const fighterService = new FighterService();

export { fighterService };
