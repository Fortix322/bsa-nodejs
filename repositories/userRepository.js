import { BaseRepository } from "./baseRepository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  isEmailExists(email) {
    return this.dbContext.find({ email }).value() !== undefined;
  }

  isPhoneNumberExists(phoneNumber) {
    return this.dbContext.find({ phoneNumber }).value() !== undefined;
  }
}

const userRepository = new UserRepository();

export { userRepository };
