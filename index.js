import 'dotenv/config.js';
import {Indiekit} from '@indiekit/indiekit';
import {roobottomPreset} from './preset-roobottom-com.js';
import {GithubStore} from '@indiekit/store-github';

// Create a new indiekit instance
const indiekit = new Indiekit();

// Configure publication preset
const roobottomSiteSchema = new roobottomPreset();

// Configure content store
const github = new GithubStore({
  user: 'roobottom', // Your username on GitHub
  repo: 'roobottom-2021', // Repository files will be saved to
  branch: 'indiekit-test', // Branch to publish to
  token:  process.env.GITHUB_TOKEN// GitHub personal access token
});

// Publication settings
indiekit.set('publication.locale', 'en-GB');
indiekit.set('publication.me', 'https://roobottom.com');
indiekit.set('publication.preset', roobottomSiteSchema);
indiekit.set('publication.store', github);
indiekit.set('publication.timeZone', 'Europe/London');

// Create a server
const server = indiekit.server();

// Export server
export default server;
