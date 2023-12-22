'use strict';

/**
 *  article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async find(ctx) {
    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    const query = strapi.db.query('api::post.post');

    await Promise.all(
      data.map(async (item, index) => {
        const article = await query.findOne({
          where: {
            id: item.id,
          },
          populate: ['createdBy'],
        });
        
        data[index].attributes.createdBy = {
          roles: article.createdBy.roles,
          username: article.createdBy.username,
          lastname: article.createdBy.lastname,
        };
      })
    );

    return { data, meta };
  },
}));