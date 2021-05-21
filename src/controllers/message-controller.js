const handleResponse = require('../services/response-service')

module.exports = {
  async index(req, res) {
    res.status(200).json([]);
  },

  async store(req, res) {
    if(!req.body.message){
      return res.status(204).send();
    }

    try {
      handleResponse(req.body.message)
    } catch {}

    res.status(204).send();
  },
};
