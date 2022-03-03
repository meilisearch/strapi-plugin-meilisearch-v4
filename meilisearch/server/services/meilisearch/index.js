const configurations = require('./config')
const connector = require('./connector')
console.log(connector)

module.exports = ({ strapi }) => {
  return {
    ...configurations({ strapi }),
    ...connector({ strapi }),
  }
}
