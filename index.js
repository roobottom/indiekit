import 'dotenv/config.js';
import {Indiekit} from '@indiekit/indiekit';
import {GithubStore} from '@indiekit/store-github';

// Create a new indiekit instance
const indiekit = new Indiekit();

// Create a server
const server = indiekit.server();

// Export server
export default server;

//setup
indiekit.set('publication.me', 'https://roobottom.com');

indiekit.set('publication.postTypes', [
{
  type: 'photo',
  name: 'Photograph',
  post: {
    path: '_source/photos/{​yyyy}-{MM}-{dd}-{​slug}.md',
    url: 'diary/{​yyyy}-{MM}-{dd}-{​slug}'
  },
  media: {
    path: 'images/photos/{​yyyy}-{MM}-{dd}-{​filename}',
  }
},
{
  type: 'article',
  name: 'Artile',
  post: {
    path: '_source/photos/{​yyyy}-{MM}-{dd}-{​slug}.md',
    url: 'diary/{​yyyy}-{MM}-{dd}-{​slug}'
  },
  media: {
    path: 'images/photos/{​yyyy}-{MM}-{dd}-{​filename}',
  }
}
]);


const github = new GithubStore({
  user: 'roobottom', // Your username on GitHub
  repo: 'roobottom-2020', // Repository files will be saved to
  branch: 'master', // Branch to publish to
  token:  process.env.GITHUB_TOKEN// GitHub personal access token
});
indiekit.set('publication.store', github);