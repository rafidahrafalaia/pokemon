// MODELS
const models = require("../models");
const uuid = require("uuid");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;
const logger = require('../loaders/logger');

function newNameFibonacci(name, rename){
	let i = 2;
	let fib = []; // Initialize array!
	fib[0] = 0;
	fib[1] = 1;
	for (i; i <= rename + 2; i++) {
		fib[i] = fib[i - 2] + fib[i - 1];
		if(i===rename+2){
			return name+'-'+String(fib[i]);
			// break;
		}
	}
	// console.log(fib[i]);
}
module.exports = class Pokemon {
	static async insert({pokemon_id, nickname, name, image, weight, height, abilities, types}) {
    	let values, clauses;
		if(!nickname) nickname = "";
		try {
			values = {
				...values,
				pokemon_id,
				name,
				nickname,
				abilities: abilities.join(), 
				types: types.join(),
				image,
				weight,
				height
			};
			clauses = { ...clauses };
			
      return models.pokemon.create(values, clauses);;
    }catch (err) {
			logger.error("🔥 error: %o", err);
			return res.status(400).json({ error: 'check request value' });
		}
  }

  static async find(id) {
	try {
		const result = await models.pokemon.findByPk(id, {
			attributes: ["id", "name", "rename"]}
		)
		return result;
	}catch (err) {
		logger.error("🔥 error: %o", err);
		return res.status(400).json({ error: 'check request value' });
	}
}
	static async findAll() {
	try {
		const result = await models.pokemon.findAll(
			// {
			// attributes: ["id", "name", "rename"]}
		)
		return result;
	}catch (err) {
		logger.error("🔥 error: %o", err);
		return res.status(400).json({ error: 'check request value' });
	}
	}

	static async release(id) {
		try {
			await models.pokemon.destroy({
			  where: { id },
			  force: true,
			});
			
			return { message: "Pokemon has been returned" };
		}catch (err) {
			logger.error("🔥 error: %o", err);
			return res.status(400).json({ error: 'check request value' });
		}
	}

	static async rename(id, name, rename) {
		try {
			let values, transaction;
			const first_name = name.split('-')[0];
			const new_name = newNameFibonacci(first_name, rename);
			console.log(new_name);
			values = {
				name: new_name,
				rename: rename + 1
			}
			await models.pokemon.update(values, { where: { id }, transaction });
			return new_name;
		}catch (err) {
			logger.error("🔥 error: %o", err);
			return res.status(400).json({ error: 'check request value' });
		}
	}
};