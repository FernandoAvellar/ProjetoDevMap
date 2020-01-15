const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index (lista), show(unico), store(criar), update(atualizar), destroy(apagar)

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });
        }

        return response.json(dev);
    },

    async delete(request, response) {
        const { github_username } = request.query;
        const isDevExist = await Dev.findOne({ github_username });
        if (isDevExist) {
            await Dev.deleteOne({
                github_username: github_username,
            });
            return response.json({ Result: `User ${github_username} deleted` });
        }
        return response.json({ Result: `User ${github_username} not found in database!` });
    }
};