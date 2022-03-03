
- How to run a playground and a dev console at the same time? ✅
  - They are both in development mode
  - there is no port option in the CLI

- How do I get all content-types: ✅
  - Native
  - user permissions
  - other plugins

- Is there a documentation on the Strapi global? 🌙 ⁇
  Because global strapi has prototypes it is hard to find what it contains
  - Is there a documentation on the store ?
  - https://github.com/strapi/strapi/blob/master/packages/core/strapi/lib/Strapi.js ✅


- Accessing config of plugin https://docs.strapi.io/developer-docs/latest/developer-resources/plugin-api-reference/server.html#usage

```js
  const config = strapi.plugin('meilisearch').config ⁇
  console.log(config) // A function
  const config2 = strapi.config.get('plugin.meilisearch')
  console.log(config2) // the config
```

- How do I add lifecycles functions to different collections without writing in the dedicated file:
  https://docs.strapi.io/developer-docs/latest/development/backend-customization/models.html#declarative-and-programmatic-usage
  - in `contentTypes` >   `lifecycles: {}` 🌙 ⁇

- 'api::blog.article' => what is `blog` what is `article` ?
  - `blog`: nom de l api
  - `article`: content-types

- Does the reloader still exist ? strapi.reload()
  - back end should work as before
  - front end ? @strapi/utils

- confirmDialog 🌙

- UTILS:
  - `sanitizeEntity` -> How do I import it?
  ```js
      const modelDef = strapi.getModel(model);
      const sanitizedEntity = await strapiUtils.sanitize.sanitizers.defaultSanitizeOutput(
        modelDef,
        entity
      );
  ```

## FRONT

- buffet becomes design-system -> https://github.com/strapi/design-system
  - is there a doc with the components
  - Story book
  - plugin helper front end


https://github.com/strapi/strapi/blob/master/packages/core/strapi/lib/Strapi.js
https://github.com/strapi/strapi/blob/master/packages/core/helper-plugin/lib/src/index.js
