const { Router } = require("express");

// ROUTES
const pokemon = require("./pokemon");

module.exports = () => {
  const app = Router();

  pokemon(app);

  return app;
};
