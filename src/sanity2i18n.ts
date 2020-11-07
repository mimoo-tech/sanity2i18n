import sanityClient from '@sanity/client'

export default async function sanity2i18n({ schemas, languages = ['en'], envs }) {
  const client = sanityClient(envs)
  const fetch = fetchFactory(client)
  const data = await Promise.all(schemas.map(async schema =>
    [await fetch(schema.name), schema]
  ))
  const resources = {};
  data.map(parse(resources, languages))
  return resources;
}

const fetchFactory = client => type => {
  const query = `*[_type == $type][0]`
  const params = { type }

  return client.fetch(query, params)
}

export const parse = (resources, languages = ['en']) => ([data, schema]) => {
  languages.map(lang => {
    const obj = {};
    schema.fields.map(field => {
      if
        (data[field.name]
        && data[field.name][lang]
        && data[field.name]['_type'] === 'localeString') {
        obj[field.name] = data[field.name][lang]
      }
    });
    resources[lang] = resources[lang] || {};
    resources[lang][schema.name] = obj;
  })
}
