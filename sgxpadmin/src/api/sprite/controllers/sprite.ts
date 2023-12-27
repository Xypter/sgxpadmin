'use strict';

/**
 * sprite controller
 */

export {};

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sprite.sprite', ({ strapi }) => ({
    async find(ctx) {
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
  
      const query = strapi.db.query('api::sprite.sprite');
  
      await Promise.all(
        data.map(async (item, index) => {
          const sprite = await query.findOne({
            where: {
              id: item.id,
            },
            populate: ['createdBy'],
          });
          
          data[index].attributes.createdBy = {
            role: sprite.createdBy.user,
            username: sprite.createdBy.username,
          };
        })
      );
  
      return { data, meta };
    },
  }));
