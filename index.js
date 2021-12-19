import 'dotenv/config.js'
import {Indiekit} from '@indiekit/indiekit'
import {roobottomPreset} from './preset-roobottom-com.js'
import {GithubStore} from '@indiekit/store-github'
import {TwitterSyndicator} from '@indiekit/syndicator-twitter'

// Create a new indiekit instance
const indiekit = new Indiekit()

// Configure publication preset
const roobottomSiteSchema = new roobottomPreset()

// Configure content store
const github = new GithubStore({
  user: 'roobottom', // Your username on GitHub
  repo: 'roobottom-2021', // Repository files will be saved to
  branch: 'main', // Branch to publish to
  token:  process.env.GITHUB_TOKEN// GitHub personal access token
})

// Syndication 
const twitter = new TwitterSyndicator({
  checked: true,
  user: 'roobottom',
  apiKey: process.env.TWTWITTER_APIKEY,
  apiKeySecret: process.env.TWITTER_APISECRET,
  accessToken: process.env.TWITTER_ACCESSTOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESSTOKENSECRET
})

// Publication settings
indiekit.set('publication.locale', 'en-GB')
indiekit.set('publication.me', 'https://roobottom.com')
indiekit.set('publication.preset', roobottomSiteSchema)
indiekit.set('publication.store', github)
indiekit.set('publication.timeZone', 'Europe/London')
indiekit.set('publication.categories', 'https://roobottom.com/tags/list.json')
indiekit.set('publication.syndicationTargets', [
  twitter
])

// Create a server
const server = indiekit.server()

// Export server
export default server
