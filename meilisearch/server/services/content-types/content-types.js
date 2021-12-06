'use strict'

function isUserPermissionEnabled(strapi) {
  return Object.keys(strapi.contentTypes).includes(
    'plugin::users-permissions.user'
  )
}

module.exports = ({ strapi }) => ({
  getContentTypes() {
    const contentTypes = Object.keys(strapi.contentTypes)
      .filter(contentType => contentType.startsWith('api::'))
      .map(contentType => contentType.replace(/(api::.*?\.)/, ''))
    if (isUserPermissionEnabled(strapi)) {
      contentTypes.push('user')
    }
    return contentTypes
  },
})
// 'use strict'

// function isUserPermissionEnabled(strapi) {
//   return Object.keys(strapi.contentTypes).includes(
//     'plugin::users-permissions.user'
//   )
// }

// module.exports = ({ strapi }) => ({
//   getContentTypes() {
//     const contentTypes = Object.keys(strapi.contentTypes).filter(contentType =>
//       contentType.startsWith('api::')
//     )
//     if (isUserPermissionEnabled(strapi)) {
//       contentTypes.push('plugin::users-permissions.user')
//     }
//     return contentTypes
//   },
// })
