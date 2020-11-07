const chai = require('chai');

const parse = require('../dist/sanity2i18n').parse;

const assert = chai.assert;

describe('Internal tests', function () {
  let schema, data;

  before(() => {
    schema = {
      name: 'loginHome',
      title: 'Login Home',
      type: 'document',
      fields: [
        {
          name: 'context',
          title: 'Context',
          type: 'string'
        },
        {
          name: 'title',
          title: 'Title',
          type: 'localeString'
        },
        {
          name: 'subTitle',
          title: 'Sub Title',
          type: 'localeString'
        },
        {
          name: 'loginBtn',
          title: 'Login Button',
          type: 'localeString'
        },
        {
          name: 'createAccountBtn',
          title: 'Create Account Button',
          type: 'localeString'
        }
      ]
    }

    data = {
      _createdAt: '2020-11-07T03:57:37Z',
      _type: 'loginHome',
      createAccountBtn: {
        _type: 'localeString',
        en: 'Create account'
      },
      loginBtn: {
        _type: 'localeString',
        en: 'Login'
      },
      subTitle: {
        _type: 'localeString',
        en: 'Login now!'
      },
      title: {
        _type: 'localeString',
        en: 'Just do It!',
      }
    }
  });

  it('should parse resources', async function () {
    const resources = {};

    parse(resources, ['en'])([data, schema])

    console.log(resources)

    assert.isDefined(resources['en']);
    assert.isDefined(resources['en']['loginHome']);
    assert.equal(resources['en']['loginHome']['title'], 'Just do It!');
    assert.equal(resources['en']['loginHome']['loginBtn'], 'Login');
    assert.notEqual(resources['en']['loginHome']['subTitle'], undefined);
  });
});
