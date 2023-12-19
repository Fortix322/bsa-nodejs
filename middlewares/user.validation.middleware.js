import { USER } from "../models/user.js";

const validateEmail = (email) => typeof email === 'string' && /^([A-Za-z0-9_\-\.])+\@([gmail|GMAIL])+\.(com)$/.test(email);
const validatePhoneNumber = (phoneNumber) => typeof phoneNumber === 'string' && /^\+380\d{9}$/.test(phoneNumber);
const validatePassword = (password) => typeof password === 'string' && password.length >= 3;

const validateData = (data) =>

  (data.email && validateEmail(data.email)) && 
  (data.phoneNumber && validatePhoneNumber(data.phoneNumber)) &&
  (data.password && validatePassword(data.password))


const createUserValid = (req, res, next) => {

  const data = {...req.body};

  if(data.hasOwnProperty('id'))
  {
    return res.status(400).json({error: true, message: "Body contains id"});
  }

  const fields = Object.keys(USER).filter(key => key !== 'id');
  const hasFields = fields.every(field => data.hasOwnProperty(field));

  if(!hasFields)
  {
    return res.status(400).json({error: true, message: "Body hasn`t all of required fields"});
  }

  const noForbiddenFields = Object.keys(data).every(field => USER.hasOwnProperty(field));

  if(!noForbiddenFields)
  {
    return res.status(400).json({error: true, message: "Body has some extra fields"});
  }

  const validatedData = validateData(data);

  if(!validatedData)
  {
    return res.status(400).json({error: true, message: "Body didn`t pass all of the validation rules"});
  }
  // TODO: Implement validatior for USER entity during creation
  next();
};

const updateUserValid = (req, res, next) => {

  const data = {...req.body};

  if(data.hasOwnProperty('id'))
  {
    return res.status(400).json({error: true, message: "Body contains id"});
  }

  if(!data || Object.keys(data).length === 0)
  {
    return res.status(400).json({error: true, message: "Body doesn`t contains any fields"});
  }

  const noForbiddenFields = Object.keys(data).every(field => USER.hasOwnProperty(field));

  if(!noForbiddenFields)
  {
    return res.status(400).json({error: true, message: "Body has some extra fields"});
  }

  const isValidEmail = !("email" in data) || validateEmail(data.email);

  const isValidPhoneNumber =
    !("phoneNumber" in data) || validatePhoneNumber(data.phoneNumber);

  const isValidPassword =
    !("password" in data) || validatePassword(data.password);

  if (!isValidEmail || !isValidPhoneNumber || !isValidPassword)
    return res.status(400).json({ error: true, message: "Body didn`t pass all of the validation rules" });
  
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
