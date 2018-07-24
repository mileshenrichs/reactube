import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers';
import thumbnail5 from './resources/example-thumb-5.jpg';
import thumbnail6 from './resources/example-thumb-6.jpg';
import thumbnail7 from './resources/example-thumb-7.jpg';
import thumbnail8 from './resources/example-thumb-8.jpg';
import profilePic1 from './resources/example-profpic-1.jpg';
import profilePic2 from './resources/example-profpic-2.jpg';
import profilePic3 from './resources/example-profpic-3.jpg';
import profilePic4 from './resources/example-profpic-4.jpg';
import channelCover from './resources/example-channel-cover.jpg';

const defaultState = {
  app: {
    showLeftDrawer: false,
    slideDrawerOut: false,
    searchQuery: ''
  },
  search: {
    results: []
  },
  watch: {
    watchingVideoId: 'aHlwbm9zaXM',
    videoComments: [],
    userRating: undefined,
    showVideoShareModal: false,
    showExpandedDescription: false,
    sortCommentsByNewest: false,
    userCommentRatings: [
      {
        commentId: 2,
        liked: true
      }
    ]
  },
  subscriptions: {
    useListLayout: true
  },
  history: {
    watchedVideos: [
      {
        id: 'aHlwbm9zaXM',
        thumbnailSrc: thumbnail5,
        videoLength: '4:10',
        title: 'Kendrick Lamar Type Beat Free “Ahead” | Free Beats | Logic Type Instrumental 2018 | The Cratez',
        description: '🔥 Road to 50K 🔥 Subscribe for Daily Beat Uploads ► http://ytb.li/TheCratez ' + 
                    '💰 Buy This Beat ► http://bsta.rs/kp985 🔽 Click for more Information! 🔽 ' + 
                    'Click the Bell 🔔 to recieve Beat Upload Notifications ✉️ Business Contact ► thecratez@gmail.com 🌐 Subscribe for more Beats ► http://ytb.li/TheCratez 🔷 Website ⚡ Full Catalogue ► https://thecratez.com 🎵 Make a Beat with our Soundkits now ► http://bit.ly/soundfuel Beatstars ► https://beatstars.com/TheCratez Instagram ► http://instagram.com/TheCratez Twitter ► https://twitter.com/TheCratez Facebook ► https://facebook.com/TheCratez Soundclick ► https://tinyurl.com/TheCratezSC Soundcloud ► https://soundcloud.com/TheCratez',
        timeSince: '25 minutes',
        creator: {
          name: 'The Cratez',
          profilePicSrc: profilePic1
        },
        views: '43',
        watchedProgress: 0
      },
      {
        id: 'ZWxvbiBtdXN',
        thumbnailSrc: thumbnail6,
        videoLength: '12:14',
        title: 'Katherine Heigl Apologies for Cemetary Selfies ft. DavidSoComedy & Noah Fleder',
        description: 'Katherine Heigl has apologized after posing for selfies in a cemetery! Disrespectful News - https://ietv.co/2lNLvAF Special Thanks to Our Guests & Friends: Noah Fleder • YouTube: https://www.yout...',
        timeSince: '26 minutes',
        creator: {
          name: 'JustKiddingNews',
          profilePicSrc: profilePic2
        },
        views: '4.6K',
        watchedProgress: 0
      },
      {
        id: 'dGhlc2UgYm9',
        thumbnailSrc: thumbnail7,
        videoLength: '3:30',
        title: 'Lil Xan Feat. Lil Skies "Lies" (WSHH Exclusive - Official Audio)',
        description: 'Listen to the official audio for "Lies" by Lil Xan Feat. Lil Skies. SUBSCRIBE for more: http://bit.ly/subWSHH More WorldstarHipHop: http://worldstarhiphop.com https://twitter.com/worldstar',
        timeSince: '52 minutes',
        creator: {
          name: 'WORLDSTARHIPHOP',
          profilePicSrc: profilePic3
        },
        views: '15K',
        watchedProgress: .45
      },
      {
        id: 'cXVpY2sgaW5',
        thumbnailSrc: thumbnail8,
        videoLength: '14:12',
        title: 'Myth vs Hamlinz - Pro Playgrounds (TSM 1v1 BUILD BATTLES!)',
        description: '►► LIKE & SUBSCRIBE for MORE VIDEOS! ►► ENTER MY $20,000 PC GIVEAWAY! https://goo.gl/bJjYeH ►► Check out more from Myth! https://goo.gl/J1F1mc ►► MORE FULL FORTNITE MATCHES! https://goo.gl/RHXXUE',
        timeSince: '56 minutes',
        creator: {
          name: 'Myth',
          profilePicSrc: profilePic4
        },
        views: '38K',
        watchedProgress: 0
      },
      {
        id: 'aHlwem9zaXM',
        thumbnailSrc: thumbnail5,
        videoLength: '4:10',
        title: 'Kendrick Lamar Type Beat Free “Ahead” | Free Beats | Logic Type Instrumental 2018 | The Cratez',
        description: '🔥 Road to 50K 🔥 Subscribe for Daily Beat Uploads ► http://ytb.li/TheCratez ' + 
                    '💰 Buy This Beat ► http://bsta.rs/kp985 🔽 Click for more Information! 🔽 ' + 
                    'Click the Bell 🔔 to recieve Beat Upload Notifications ✉️ Business Contact ► thecratez@gmail.com 🌐 Subscribe for more Beats ► http://ytb.li/TheCratez 🔷 Website ⚡ Full Catalogue ► https://thecratez.com 🎵 Make a Beat with our Soundkits now ► http://bit.ly/soundfuel Beatstars ► https://beatstars.com/TheCratez Instagram ► http://instagram.com/TheCratez Twitter ► https://twitter.com/TheCratez Facebook ► https://facebook.com/TheCratez Soundclick ► https://tinyurl.com/TheCratezSC Soundcloud ► https://soundcloud.com/TheCratez',
        timeSince: '25 minutes',
        creator: {
          name: 'The Cratez',
          profilePicSrc: profilePic1
        },
        views: '43',
        watchedProgress: 0
      },
      {
        id: 'ZWxvbeBtdXN',
        thumbnailSrc: thumbnail6,
        videoLength: '12:14',
        title: 'Katherine Heigl Apologies for Cemetary Selfies ft. DavidSoComedy & Noah Fleder',
        description: 'Katherine Heigl has apologized after posing for selfies in a cemetery! Disrespectful News - https://ietv.co/2lNLvAF Special Thanks to Our Guests & Friends: Noah Fleder • YouTube: https://www.yout...',
        timeSince: '26 minutes',
        creator: {
          name: 'JustKiddingNews',
          profilePicSrc: profilePic2
        },
        views: '4.6K',
        watchedProgress: 0
      },
      {
        id: 'dGhlc2UgYme',
        thumbnailSrc: thumbnail7,
        videoLength: '3:30',
        title: 'Lil Xan Feat. Lil Skies "Lies" (WSHH Exclusive - Official Audio)',
        description: 'Listen to the official audio for "Lies" by Lil Xan Feat. Lil Skies. SUBSCRIBE for more: http://bit.ly/subWSHH More WorldstarHipHop: http://worldstarhiphop.com https://twitter.com/worldstar',
        timeSince: '52 minutes',
        creator: {
          name: 'WORLDSTARHIPHOP',
          profilePicSrc: profilePic3
        },
        views: '15K',
        watchedProgress: .45
      },
      {
        id: '6XVpY2sgaW5',
        thumbnailSrc: thumbnail8,
        videoLength: '14:12',
        title: 'Myth vs Hamlinz - Pro Playgrounds (TSM 1v1 BUILD BATTLES!)',
        description: '►► LIKE & SUBSCRIBE for MORE VIDEOS! ►► ENTER MY $20,000 PC GIVEAWAY! https://goo.gl/bJjYeH ►► Check out more from Myth! https://goo.gl/J1F1mc ►► MORE FULL FORTNITE MATCHES! https://goo.gl/RHXXUE',
        timeSince: '56 minutes',
        creator: {
          name: 'Myth',
          profilePicSrc: profilePic4
        },
        views: '38K',
        watchedProgress: 0
      }
    ]
  },
  channel: {
    coverImgSrc: channelCover,
    username: undefined,
    videoSortOrder: 'NEWEST',
    playlistSortOrder: 'LAST_ADDED',
    channelDescription: 'Tyler "Ninja" Blevins is a professional Battle Royale Player and Streamer on Twitch.tv/ninja. He currently is playing Fortnite and Realm Royale.<br><br>*Accomplishments*<br>- 1st Place Fortnite Celebrity Pro-Am Tournament E3 2018<br>- 1st Place PUBG Squads Gamescom Invitational 2017<br>- 2nd Place H1Z1 5s Dreamhack 2017<br>- 1st Place H1Z1 Invitational 2015<br>- 1st Place Halo 4 Dallas 2012<br>- 1st Place AGL 8 Knoxville<br><br>He is known for his goofy energetic personality, his incredible impressions, and can often be found streaming on Twitch.'
  },
  upload: {
    fileSelected: false,
    video: {
      file: 'file',
      privacy: {
        type: 'PUBLIC',
        optionName: 'Public',
        optionDesc: 'Anyone can search for and view'
      }
    }
  },
  playlists: {
    userPlaylists: [
      {
        id: 'PLAWL2C0E49DA6710',
        name: 'Watch Later',
        privacy: 'PRIVATE'
      },
      {
        id: 'PLA532C0E49DA6710',
        name: 'Algorithms',
        privacy: 'UNLISTED'
      },
      {
        id: 'PLA632C0E49DA6710',
        name: 'Favorites',
        privacy: 'PRIVATE'
      },
      {
        id: 'PLA432C0D49DA6710',
        name: 'Yum',
        privacy: 'PUBLIC'
      },
      {
        id: 'PLA432C0E49DA8710',
        name: 'Reason Tutorials',
        privacy: 'PUBLIC'
      },
      {
        id: 'PLAECCC0E491A6710',
        name: 'MW3 Singles',
        privacy: 'PUBLIC'
      }
    ],
    addToMenu: {
      userPlaylistsContainingVideo: [],
      closeAddToMenu: false
    }
  },
  notification: {
    showNotification: false,
    notificationText: undefined
  },
  user: {
    id: 1,
    name: 'Snooz.'
  }
}

let middleware = [thunk, promiseMiddleware()];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

const store = createStore(rootReducer, defaultState, applyMiddleware(...middleware));

export default store;