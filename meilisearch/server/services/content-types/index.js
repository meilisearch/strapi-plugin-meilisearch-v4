'use strict'
const contentTypesGetter = require('./content-types')

module.exports = ({ strapi }) => ({
  ...contentTypesGetter({ strapi }),
})
