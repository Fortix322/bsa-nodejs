import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  create(data)
  {
    if(userRepository.isEmailExists(data.email))
    {
      throw Error("User with same email exist");
    }
    else if(userRepository.isPhoneNumberExists(data.phoneNumber))
    {
      throw Error("User with same phone number exist")
    }

    const item = userRepository.create(data);
    if(!item)
    {
      throw Error("Couldn`t create a user.");
    }

    return item;
  }
  
  getAll()
  {
    const item = userRepository.getAll();
    return item;
  }

  getById(id)
  {
    const item = this.search({id : id});
    if(!item)
    {
      throw Error("User is not found")
    }
    return item;
  }

  update(id, newData)
  {
    if(userRepository.isEmailExists(newData.email))
    {
      throw Error("User with same email exist");
    }
    else if(userRepository.isPhoneNumberExists(newData.phoneNumber))
    {
      throw Error("User with same phone number exist")
    }

    const item = this.getById(id);

    if(item)
    {
      userRepository.update(id, newData);
    }

    return item;
  }

  delete(id)
  {
    const item = this.getById(id);

    if(item)
    {
      userRepository.delete(id);
    }

    return item;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
