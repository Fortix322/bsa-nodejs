import { FIGHTER } from "../models/fighter.js";

const validatePower = (power) =>
  typeof power === "number" && power >= 1 && power <= 100;
const validateDefense = (defense) =>
  typeof defense === "number" && defense >= 1 && defense <= 10;
const validateHealth = (health) =>
  typeof health === "number" && health >= 80 && health <= 120;

const createFighterValid = (req, res, next) => {
  const data = {...req.body};

  if(data.hasOwnProperty('id'))
  {
    return res.status(400).json({error: true, message: "Body contains id"});
  }

  const fields = Object.keys(FIGHTER).filter(key => key !== 'id' && key !== 'health');
  const hasFields = fields.every(field => data.hasOwnProperty(field));

  if(!hasFields)
  {
    return res.status(400).json({error: true, message: "Body hasn`t all of required fields"});
  }

  const noForbiddenFields = Object.keys(data).every(field => FIGHTER.hasOwnProperty(field));

  if(!noForbiddenFields)
  {
    return res.status(400).json({error: true, message: "Body has some extra fields"});
  }

  const isValidPower = validatePower(data.power);
  const isValidDefense = validateDefense(data.defense);
  const isValidHealth =
    !("health" in data) || validateHealth(data.health);

  if (!isValidPower || !isValidDefense || !isValidHealth)
    return res.status(400).json({error: true, message: "Body didn`t pass all of the validation rules"});

  // TODO: Implement validatior for FIGHTER entity during creation
  next();
};

const updateFighterValid = (req, res, next) => {

  const data = {...req.body};

  if(data.hasOwnProperty('id'))
  {
    return res.status(400).json({error: true, message: "Body contains id"});
  }

  if(!data || Object.keys(data).length === 0)
  {
    return res.status(400).json({error: true, message: "Body doesn`t contains any fields"});
  }

  const noForbiddenFields = Object.keys(data).every(field => FIGHTER.hasOwnProperty(field));

  if(!noForbiddenFields)
  {
    return res.status(400).json({error: true, message: "Body has some extra fields"});
  }

  const isValidPower =
    !("power" in data) || validatePower(data.power);
  const isValidDefense =
    !("defense" in data) || validateDefense(data.defense);
  const isValidHealth =
    !("health" in data) || validateHealth(data.health);


  if (!isValidPower || !isValidDefense || !isValidHealth)
    return res.status(400).json({error: true, message: "Body didn`t pass all of the validation rules"});

  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
