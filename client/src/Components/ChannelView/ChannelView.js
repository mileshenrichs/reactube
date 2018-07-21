import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/channelActions';
import { Redirect, Switch, Route } from 'react-router-dom';
import ChannelCover from './ChannelCover/ChannelCover';
import ChannelHeaderInfo from './ChannelHeaderInfo/ChannelHeaderInfo';
import ChannelNav from './ChannelNav/ChannelNav';
import VideoList from '../VideoList/VideoList';
import sortIcon from '../../resources/sort.png';
import thumbnail5 from '../../resources/example-thumb-5.jpg';
import thumbnail6 from '../../resources/example-thumb-6.jpg';
import thumbnail7 from '../../resources/example-thumb-7.jpg';
import thumbnail8 from '../../resources/example-thumb-8.jpg';
import profilePic1 from '../../resources/example-profpic-1.jpg';
import profilePic2 from '../../resources/example-profpic-2.jpg';
import profilePic3 from '../../resources/example-profpic-3.jpg';
import profilePic4 from '../../resources/example-profpic-4.jpg';
import thumbnail9 from '../../resources/example-thumb-9.jpg';
import thumbnail10 from '../../resources/example-thumb-10.jpg';
import thumbnail11 from '../../resources/example-thumb-11.jpg';
import thumbnail12 from '../../resources/example-thumb-12.jpg';
import thumbnail13 from '../../resources/example-thumb-13.jpg';
import thumbnail14 from '../../resources/example-thumb-14.jpg';
import thumbnail15 from '../../resources/example-thumb-15.jpg';
import thumbnail16 from '../../resources/example-thumb-16.jpg';
import ChannelDescription from './ChannelDescription/ChannelDescription';

class ChannelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSortMenu: false
    };
  }

  componentDidMount() {
    // set page title and background color
    document.title = 'Ninja - Reactube';
    document.body.style.backgroundColor = '#ffffff';

    // pass current channel info to redux store
    this.props.updateChannelUsername(this.props.match.params.username);
  }

  toggleSortMenu() {
    this.setState((prevState) => ({
      showSortMenu: !prevState.showSortMenu
    }));
  }

  handleClickWhileSortMenuOpen(e) {
    if(this.state.showSortMenu) {
      if(!this.sortMenu.contains(e.target) && !this.sortByButton.contains(e.target)) {
        this.setState({
          showSortMenu: false
        });
      }
    }
  }

  getCurrentPageName() {
    const path = this.props.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1);
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

    const playlists = [
      {
        id: 'PLA6F2C0E49DA6710',
        name: 'Fortnite Battle Royale',
        videoCount: 262,
        thumbnailSrc: thumbnail9
      },
      {
        id: 'PLA6F2C0E49DA3710',
        name: 'Interviews and Vlogs',
        videoCount: 18,
        thumbnailSrc: thumbnail10
      },
      {
        id: 'PLA6F2C0A49DA6710',
        name: 'HALO',
        videoCount: 115,
        thumbnailSrc: thumbnail11
      },
      {
        id: 'PLA6F2C0G49DA6710',
        name: 'Stream Playlist',
        videoCount: 228,
        thumbnailSrc: thumbnail12
      },
      {
        id: 'PLA6F2C0E59DA6710',
        name: 'Realm Royale',
        videoCount: 3,
        thumbnailSrc: thumbnail13
      },
      {
        id: 'PLA6F2C0E49BA6710',
        name: 'Ninja Las Vegas 2018',
        videoCount: 9,
        thumbnailSrc: thumbnail14
      },
      {
        id: 'PLA6F2C0E99DA6710',
        name: 'Ninjas Freestyle beats',
        videoCount: 5,
        thumbnailSrc: thumbnail15
      },
      {
        id: 'PLA6F2C0E49DA3610',
        name: 'PUBG',
        videoCount: 55,
        thumbnailSrc: thumbnail16
      }
    ];

    const currentPageName = this.getCurrentPageName();

    // listen for clicks if sort menu open (to close if clicked outside)
    if(this.state.showSortMenu) {
      document.addEventListener('mousedown', this.handleClickWhileSortMenuOpen.bind(this));
    }

    let contentHeaderText;
    if(currentPageName === 'videos') {
      contentHeaderText = 'Uploads';
    } else if(currentPageName === 'playlists') {
      contentHeaderText = 'Created Playlists';
    }

    let sortMenuUl;
    if(currentPageName === 'videos') {
      sortMenuUl = (
        <ul className="ChannelView__sort-menu inline-menu" ref={node => this.sortMenu = node}>
          <li onClick={() => this.props.changeVideoSortOrder('POPULAR')}>Most popular</li>
          <li onClick={() => this.props.changeVideoSortOrder('OLDEST')}>Date added (oldest)</li>
          <li onClick={() => this.props.changeVideoSortOrder('NEWEST')}>Date added (newest)</li>
        </ul>
      );
    } else {
      sortMenuUl = (
        <ul className="ChannelView__sort-menu inline-menu" ref={node => this.sortMenu = node}>
          <li onClick={() => this.props.changePlaylistSortOrder('OLDEST')}>Date created (oldest)</li>
          <li onClick={() => this.props.changePlaylistSortOrder('NEWEST')}>Date created (newest)</li>
          <li onClick={() => this.props.changePlaylistSortOrder('LAST_ADDED')}>Last video added</li>
        </ul>
      );
    }

    // if not on one of specified channel pages, redirect by default to /videos
    if(!['videos', 'playlists', 'about'].includes(currentPageName)) {
      return (
        <Redirect to={this.props.location.pathname + '/videos'} />
      );
    } else {
      return (
        <div className={'ChannelView page-container' + (currentPageName === 'playlists' ? ' on-playlists' : '')}>
          <ChannelCover coverImg={this.props.coverImgSrc} />
    
          <div className="ChannelView__header">
            <ChannelHeaderInfo />
          </div>
          <ChannelNav
            currentPage={currentPageName}  
          />
  
          <div className="ChannelView__content">
            {currentPageName !== 'about' && 
              <div className={'ChannelView__content--header'}>
                <h2>{contentHeaderText}</h2>
                {currentPageName === 'videos' && 
                  <button className="transparent-button text-button">Play all</button>}
                <span className="sort-control">
                  <button className="sort-button transparent-button" 
                      onClick={this.toggleSortMenu.bind(this)} ref={node => this.sortByButton = node}>
                    <img src={sortIcon} alt="" />
                    <span className="text-color-secondary">Sort By</span>
                  </button>
                  {this.state.showSortMenu && sortMenuUl}
                </span>
              </div>}

            <Switch>
              <Route exact path={this.props.match.path + '/videos'} render={() => (
                <VideoList 
                  videos={videos} 
                  displayAs="grid"
                  showTimeSince
                />
              )} />

              <Route exact path={this.props.match.path + '/playlists'} render={() => (
                <VideoList 
                  playlists={playlists} 
                  displayAs="grid"
                />
              )} />

              <Route exact path={this.props.match.path + '/about'} render={() => (
                <ChannelDescription description={this.props.channelDescription} />
              )} />
            </Switch>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return state.channel;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelView);