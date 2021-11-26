import 'dotenv/config.js';
import {Indiekit} from '@indiekit/indiekit';
import {JekyllPreset} from '@indiekit/preset-jekyll';
import {GithubStore} from '@indiekit/store-github';

// Create a new indiekit instance
const indiekit = new Indiekit();

// Configure publication preset
const jekyll = new JekyllPreset();

// Configure content store
const github = new GithubStore({
  user: 'roobottom', // Your username on GitHub
  repo: 'roobottom-2021', // Repository files will be saved to
  branch: 'main', // Branch to publish to
  token:  process.env.GITHUB_TOKEN// GitHub personal access token
});

// Application settings
//indiekit.set('application.mongodbUrl', process.env.MONGODB_URL)

// Publication settings
indiekit.set('publication.locale', 'en-GB');
indiekit.set('publication.me', 'https://roobottom.com');
indiekit.set('publication.postTypes', [
  {
    type: 'photo',
    name: 'Photograph',
    post: {
      path: 'source/content/photos/{yyyy}-{MM}-{dd}-{slug}.md',
      url: 'diary/{yyyy}-{MM}-{dd}-{​slug}'
    },
    media: {
      path: 'source/images/photos/{yyyy}-{MM}-{dd}-{​filename}-{filename}',
    }
  },
  {
    type: 'article',
    name: 'Artile',
    post: {
      path: 'source/content/articles/{yyyy}-{MM}-{dd}-{​slug}.md',
      url: 'articles/{yyyy}-{MM}-{dd}-{​slug}'
    },
    media: {
      path: 'source/images/articles/{slug}/{​filename}',
    }
  }
]);
indiekit.set('publication.preset', jekyll);
indiekit.set('publication.store', github);
indiekit.set('publication.timeZone', 'Europe/London');

// Create a server
const server = indiekit.server();

// Export server
export default server;
