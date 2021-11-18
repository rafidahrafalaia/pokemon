// GENERALS
const { Router } = require("express");
const isPrime = require('prime-number')
const route = Router();
// SERVICE
const Pokemon = require("../services/Pokemon");

const logger = require("../loaders/logger");

function rnd(min, max) {
	return Math.floor(Math.random() * max) + min;
 }

module.exports = (app) => {
  app.use('/pokemon', route);

  route.get("/getAll", async (req, res, next) => {
    try {
      const find = await Pokemon.findAll();
      return res.status(200).json(find);
    } catch (err) {
      logger.error("🔥 error: %o", err);
      return next(err);
    }
  });

  route.get("/catch", async (req, res, next) => {
    try {
      if(Math.random() < 0.5){
        return res.status(200).json(false);
      };
      return res.status(200).json(Math.random());
    } catch (err) {
      logger.error("🔥 error: %o", err);
      return next(err);
    }
  });

  route.post("/catch", async (req, res, next) => {
    let { pokemon_id, nickname, name, image, weight, height, abilities, types } = req.body;
    try {
        await Pokemon.insert({ pokemon_id, nickname, name, image, weight, height, abilities, types });
        return res.status(200).json(true);
    } catch (err) {
      logger.error("🔥 error: %o", err);
      return next(err);
    }
  });

  route.post("/release", async (req, res, next) => {
    let { id } = req.body;
    try {
				const x = rnd(0, 100);
				if(isPrime(x)){
          await Pokemon.release(id);
          return res.status(200).json(x);
        } 
				else return res.status(200).json(false);
    } catch (err) {
      logger.error("🔥 error: %o", err);
      return next(err);
    }
  });

  route.put("/rename", async (req, res, next) => {
    let { id } = req.body;
    try {
      const find = await Pokemon.find(id);
      if(find.id){
        const result = await Pokemon.rename(id, find.name, find.rename)
        return res.status(200).json(result)
      }
      return res.status(200).json(false);
    } catch (err) {
        logger.error("🔥 error: %o", err);
        return next(err);
    }
  });
};