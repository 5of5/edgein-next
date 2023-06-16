export const insertOneNews = {
  partner_api_key: process.env.PARTNER_API_KEY,
  resource_type: 'news',
  resource_identifier: [{ field: 'id' }],
  resource: {
    date: new Date(),
    text: 'testing news',
    link: 'http://test.abc.com',
    source: {
      title: 'testing news',
      domain: 'test.abc.com',
      region: 'en',
      poweredby: 'TestingApi',
    },
    kind: 'news',
    metadata: { image: 'imageUrl.com' },
    status: 'published',
    library: ['AI'],
  },
};

export const insertThreeNewsRelationship = {
  partner_api_key: process.env.PARTNER_API_KEY,
  resource_type: 'news',
  resource_identifier: [
    [{ field: 'id' }],
    [{ field: 'id' }],
    [{ field: 'id' }],
  ],
  resource: [
    {
      date: new Date(),
      text: 'testing news number 1',
      link: 'http://test1.abc.com',
      source: {
        title: 'testing news number 1',
        domain: 'test.abc.com',
        region: 'en',
        poweredby: 'TestingApi',
      },
      kind: 'news',
      metadata: { image: 'imageUrl.com' },
      status: 'published',
      library: ['Web3'],
      news_organizations: { 'companies:name': 'Defy Trends' },
    },
    {
      date: new Date(),
      text: 'testing news number 2',
      link: 'http://test2.abc.com',
      source: {
        title: 'testing news number 2',
        domain: 'test.abc.com',
        region: 'en',
        poweredby: 'TestingApi',
      },
      kind: 'news',
      metadata: { image: 'imageUrl.com' },
      status: 'published',
      library: ['Web3'],
      news_person: { 'people:name': 'Jessica Taggart' },
    },
    {
      date: new Date(),
      text: 'testing news number 3',
      link: 'http://test3.abc.com',
      source: {
        title: 'testing news number 3',
        domain: 'test.abc.com',
        region: 'en',
        poweredby: 'TestingApi',
      },
      kind: 'news',
      metadata: { image: 'imageUrl.com' },
      status: 'published',
      library: ['Web3'],
      news_person: { 'people:name': 'Rita Liao' },
    },
  ],
};

export const updateOneNews = {
  partner_api_key: process.env.PARTNER_API_KEY,
  resource_type: 'news',
  force_update: true,
  resource_identifier: [{ field: 'id', value: 'xxx', method: '_eq' }],
  resource: {
    link: 'http://test.abc.com',
  },
};

export const deleteOneNews = {
  partner_api_key: process.env.PARTNER_API_KEY,
  resource_type: 'news',
  force_update: true,
  resource_identifier: [{ field: 'id', value: 'xxx', method: '_eq' }],
  resource: {
    id: 'xxx',
  },
};

export const upsertOneNews = {
  partner_api_key: process.env.PARTNER_API_KEY,
  resource_type: 'news',
  resource_identifier: [{ field: 'id' }],
  resource: {
    text: 'testing news',
    date: new Date(),
    source: {
      title: 'testing news',
      domain: 'test.abc.com',
      region: 'en',
      poweredby: 'TestingApi',
    },
    kind: 'news',
    metadata: { image: 'imageUrl.com' },
    status: 'published',
    library: ['Web3'],
  },
};

export const upsertNews = {
  partner_api_key: process.env.PARTNER_API_KEY,
  resource_type: 'news',
  resource_identifier: [{ field: 'id', value: 'xxx', method: '_eq' }],
  resource: {
    text: 'testing news',
    date: new Date(),
    link: 'http://test.abc.com',
    source: {
      title: 'testing news',
      domain: 'test.abc.com',
      region: 'en',
      poweredby: 'TestingApi',
    },
    kind: 'news',
    metadata: { image: 'imageUrl.com' },
    status: 'published',
    library: ['Web3'],
  },
};

export const insertOnePerson = {
  partner_api_key: process.env.PARTNER_API_KEY,
  resource_type: 'people',
  resource_identifier: [{ field: 'id' }],
  resource: {
    name: 'Unit test person',
    slug: 'unit-test-person',
    status: 'published',
  },
};

export const insertPersonToUpdate = {
  partner_api_key: process.env.PARTNER_API_KEY,
  resource_type: 'people',
  resource_identifier: [{ field: 'id' }],
  resource: {
    name: 'Unit test person to update',
    slug: 'unit-test-person-to-update',
    status: 'published',
  },
};
