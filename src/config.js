let is_force = false;

const open_force = function () {
  is_force = true;
};

const force = function () {
  return is_force;
};

module.exports = {
  open_force,
  force,
};