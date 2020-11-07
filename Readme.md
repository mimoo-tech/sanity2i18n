# Sanity to i18n

`Sanity to i18n` will pull data from [Sanity](https://www.sanity.io/) according to your schema definition and will output an appropriate [i18n](https://www.i18next.com/) in an opinionated way.

Useful for:

* Compile time applications
* Enable non developers to edit application texts
* Offline availability

## Example

`some-schema.js`
```ts
{
  name: 'loginScreen',
  title: 'Login Screen',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localeString'
    },
    {
      name: 'confirmBtn',
      title: 'Confirm Button',
      type: 'localeString'
    }
  ]
}
```

`frontend.js`
```ts
import sanity2i18n from 'sanity2i18n';
import i18next from 'i18next';

// load your envs
const envs {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false
};

// sanity2i18n() will fetch and parse your texts
const resources =
  await sanity2i18n({
    schemas: [ schema1, schema2, ... ],
    languages: ['en', 'pt', ...],
    envs
  });

// initialize i18next with the parsed resources
const t =
  await i18next.init({
    lng: 'en',
    resources
  });

const title = t('loginScreen.title');
const confirmBtn = t('loginScreen.confirmBtn');
```

## Installation

WIP

## Definitions

###### The parsing assumes a couple of opinionated definitions as shown bellow.

You should have the type `localeString` defined as:

`localeString.js`
```ts
const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'pt', title: 'Portuguese' },
  { id: 'es', title: 'Spanish' }
]

export default {
  name: 'localeString',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true }
    }
  ],
  fields: supportedLanguages.map(lang => (
    {
      title: lang.title,
      name: lang.id,
      type: 'string',
      fieldset: lang.isDefault ? null : 'translations'
    }
  ))
}
```

Schemas should have the following structure:

```ts
{
  name: 'page1',
  title: 'Page 1 Editor Name',
  type: 'document',
  fields: [
    {
      name: 'field1',
      title: 'Field 1 Editor Name',
      type: 'localeString'
    },
    {
      name: 'field2',
      title: 'Field 2 Editor Name',
      type: 'localeString'
    },
    ...
  ]
}
```

And after having the i18next object initialized you can recover the transation with:

```ts
const field1 = t('page1.field1');
const field2 = t('page1.field2');
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
