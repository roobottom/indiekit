import YAML from 'yaml';

/**
 * A specific preset just for my personal site
 * It's probably not that useful for other sites
 */

// YAML options
YAML.scalarOptions.str.fold.lineWidth = 0;

export const roobottomPreset = class {
  constructor() {
    this.id = 'roobottom';
    this.name = 'Roobottom';
  }

  /**
   * Post types
   *
   * @returns {object} Post types config
   */
  get postTypes() {
    return [{
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
    }, {
      type: 'note',
      name: 'Note',
      post: {
        path: 'source/notes/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'diary/{yyyy}-{MM}-{dd}-{slug}'
      }
    }, {
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
    }, {
      type: 'video',
      name: 'Video',
      post: {
        path: 'source/videos/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'diary/{yyyy}-{MM}-{dd}-{slug}'
      },
      media: {
        path: 'images/videos/{yyyy}-{MM}-{dd}-{filename}'
      }
    }, {
      type: 'audio',
      name: 'Audio',
      post: {
        path: 'source/audio/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'diary/{yyyy}-{MM}-{dd}-{slug}'
      },
      media: {
        path: 'source/images/audio/{yyyy}-{MM}-{dd}-{filename}'
      }
    }, {
      type: 'bookmark',
      name: 'Bookmark',
      post: {
        path: 'source/bookmarks/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'bookmarks/{yyyy}-{MM}-{dd}-{slug}'
      }
    }, 
    //website doesn't currently support any of these end types, so leaving them as defaults for now.
    {
      type: 'checkin',
      name: 'Checkin',
      post: {
        path: '_checkins/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'checkins/{yyyy}/{MM}/{dd}/{slug}'
      }
    }, {
      type: 'event',
      name: 'Event',
      post: {
        path: '_events/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'events/{yyyy}/{MM}/{dd}/{slug}'
      }
    }, {
      type: 'rsvp',
      name: 'Reply with RSVP',
      post: {
        path: '_replies/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'replies/{yyyy}/{MM}/{dd}/{slug}'
      }
    }, {
      type: 'reply',
      name: 'Reply',
      post: {
        path: '_replies/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'replies/{yyyy}/{MM}/{dd}/{slug}'
      }
    }, {
      type: 'repost',
      name: 'Repost',
      post: {
        path: '_reposts/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'reposts/{yyyy}/{MM}/{dd}/{slug}'
      }
    }, {
      type: 'like',
      name: 'Like',
      post: {
        path: '_likes/{yyyy}-{MM}-{dd}-{slug}.md',
        url: 'likes/{yyyy}/{MM}/{dd}/{slug}'
      }
    }];
  }

  /**
   * Post template
   *
   * @param {object} properties Post data variables
   * @returns {string} Rendered template
   */
  postTemplate(properties) {
    let content;
    if (properties.content) {
      content = properties.content.text || properties.content.html || properties.content;
      content = `${content}\n`;
    } else {
      content = '';
    }

    properties = {
      date: properties.published,
      ...(properties.name && {title: properties.name}),
      ...(properties.summary && {excerpt: properties.summary}),
      ...(properties.category && {tags: properties.category}), //this is custom,`category`->`tags`
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
    };
    let frontmatter = YAML.stringify(properties);
    frontmatter = `---\n${frontmatter}---\n`;

    return frontmatter + content;
  }
};