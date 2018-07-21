import React, { Component } from 'react';
import VideoList from '../VideoList/VideoList';
import thumbnail5 from '../../resources/example-thumb-5.jpg';
import thumbnail6 from '../../resources/example-thumb-6.jpg';
import thumbnail7 from '../../resources/example-thumb-7.jpg';
import thumbnail8 from '../../resources/example-thumb-8.jpg';
import profilePic1 from '../../resources/example-profpic-1.jpg';
import profilePic2 from '../../resources/example-profpic-2.jpg';
import profilePic3 from '../../resources/example-profpic-3.jpg';
import profilePic4 from '../../resources/example-profpic-4.jpg';

class SubscriptionsView extends Component {

  componentDidMount() {
    // set page title and background color
    document.title = 'Subscriptions - Reactube';
    document.body.style.backgroundColor = '#fafafa';
  }

  render() {

    const videos = [
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
    ];

    return (
      <div className="SubscriptionsView page-container">
        <div className="feed-container">
          <VideoList 
            videos={videos}
            displayAs="list"
            showTitles
            showBorders
            showTimeSince
          />
        </div>
      </div>
    );
  }
}

export default SubscriptionsView;