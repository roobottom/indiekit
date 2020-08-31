import 'dotenv/config.js';
import {Indiekit} from '@indiekit/indiekit';
import {GithubStore} from '@indiekit/store-github';

// New indiekit instance
const indiekit = new Indiekit();

// Configure content store
const githubStore = new GithubStore({
  user: 'roobottom',
  repo: 'roobottom-2020',
  branch: 'indiekit-test',
  token: process.env.GITHUB_TOKEN
});

const publicationConfig = {
  categories: {
    url: 'https://paulrobertlloyd.com/categories/index.json' //array of categories written by 11ty
  },
  'post-types': [{
    type: 'note',
    name: 'Note',
    post: {
      path: '_source/notes/{yyyy}-{MM}-{dd}-{slug}.md',
      url: 'notes/{yyyy}-{MM}-{dd}-{slug}/'
    }
  }],
  'slug-separator': '-'
}

// Register extensions
indiekit.addStore(githubStore);

// Application settings
indiekit.set('application.locale', 'en-GB');

// Publication settings
indiekit.set('publication.config', publicationConfig);
indiekit.set('publication.me', 'https://roobottom.com');
indiekit.set('publication.storeId', 'github');

// Server
const server = indiekit.server();

export default server;