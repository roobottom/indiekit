import 'dotenv/config.js'
import {Indiekit} from '@indiekit/indiekit'
import {GithubStore} from '@indiekit/store-github'

// Create a new indiekit instance
const indiekit = new Indiekit()

// Configure content store
const github = new GithubStore({
  user: 'roobottom', // Your username on GitHub
  repo: 'roobottom-2021', // Repository files will be saved to
  branch: 'main', // Branch to publish to
  token:  process.env.GITHUB_TOKEN// GitHub personal access token
})

// Application settings
//indiekit.set('application.mongodbUrl', process.env.MONGODB_URL)

// Publication settings
indiekit.set('publication.locale', 'en-GB')
indiekit.set('publication.me', 'https://roobottom.com')
indiekit.set('publication.postTypes', [
  {
    type: 'photo',
    name: 'Photograph',
    post: {
      path: 'source/content/photos/{yyyy}-{MM}-{dd}-{slug}.md',
      url: 'diary/{yyyy}-{MM}-{dd}-{slug}'
    },
    media: {
      path: 'source/images/photos/{yyyy}-{MM}-{dd}-{filename}',
      url: 'images/photos/{yyyy}-{MM}-{dd}-{filename}'
    }
  },
  {
    type: 'article',
    name: 'Artile',
    post: {
      path: 'source/content/articles/{yyyy}-{MM}-{dd}-{slug}.md',
      url: 'articles/{yyyy}-{MM}-{dd}-{slug}'
    },
    media: {
      path: 'source/images/articles/{slug}/{filename}',
      url: 'images/articles/{slug}/{filename}'
    }
  }
])
indiekit.set('publication.postTemplate', properties => {
  let content
  if (properties.content) {
    content = properties.content.text || properties.content.html || properties.content
    content = `${content}\n`
  } else {
    content = ''
  }

  properties = {
    date: properties.published,
    ...(properties.name && {title: properties.name}),
    ...(properties.summary && {excerpt: properties.summary}),
    ...(properties.category && {category: properties.category}),
    ...(properties.start && {start: properties.start}),
    ...(properties.end && {end: properties.end}),
    ...(properties.rsvp && {rsvp: properties.rsvp}),
    ...(properties.location && {location: properties.location}),
    ...(properties.checkin && {checkin: properties.checkin}),
    ...(properties.audio && {audio: properties.audio}),
    ...(properties.photo && {photo: properties.photo}),
    ...(properties.video && {video: properties.video}),
    ...(properties['bookmark-of'] && {'bookmark-of': properties['bookmark-of']}),
    ...(properties['like-of'] && {'like-of': properties['like-of']}),
    ...(properties['repost-of'] && {'repost-of': properties['repost-of']}),
    ...(properties['in-reply-to'] && {'in-reply-to': properties['in-reply-to']}),
    ...(properties['post-status'] === 'draft' && {draft: true}),
    ...(properties.visibility && {visibility: properties.visibility}),
    ...(properties.syndication && {syndication: properties.syndication}),
    ...(properties['mp-syndicate-to'] && {'mp-syndicate-to': properties['mp-syndicate-to']})
  }
  let frontmatter = YAML.stringify(properties)
  frontmatter = `---\n${frontmatter}---\n`

  return frontmatter + content
})
indiekit.set('publication.store', github)
indiekit.set('publication.timeZone', 'Europe/London')

// Create a server
const server = indiekit.server()

// Export server
export default server
