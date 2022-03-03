const configurations = require('./config')
const connector = require('./connector')

module.exports = ({ strapi }) => {
  return {
    ...configurations({ strapi }),
    ...connector({ strapi }),
  }
}
