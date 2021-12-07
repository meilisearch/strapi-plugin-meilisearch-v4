'use strict'
const contentTypesGetter = require('./content-types')
const configs = require('./configs')

module.exports = ({ strapi }) => ({
  ...contentTypesGetter({ strapi }),
  ...configs({ strapi }),
})
