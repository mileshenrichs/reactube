import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as watchActions from '../../../../actions/watchActions';
import * as playlistActions from '../../../../actions/playlistActions';
import InteractionDock from './InteractionDock/InteractionDock';
import ProfileIcon from '../../../ProfileIcon/ProfileIcon';
import SubscribeButton from '../../../SubscribeButton/SubscribeButton';
import subscriptionBell from '../../../../resources/subscription-bell.png';
import subscriptionBellActivated from '../../../../resources/subscription-bell-activated.png';

const VideoInfo = (props) => {
  const subscribed = true;
  const videoDescription = {
    __html: 'NodeJS and ExpressJS front to back. In this course we will look at the following concepts... <br><br>' + 
    'Express Installation & Setup <br>' + 
    'Middleware <br>' + 
    'Routing <br>' + 
    'Template Engines <br>' + 
    'Forms & Input <br>' + 
    'MongoDB w/ MongoJS <br><br>' + 
    'Express generator will be in another video <br><br>' + 
    'NODE.JS, EXPRESS & MONGODB COURSE: <br><a href="#">https://www.udemy.com/nodejs-express</a>'
  }

  return (
    <div className="VideoInfo">
      <section className="info-section">
        <h1 className="VideoInfo__video-title">Big Buck Bunny (Season 1, Episode 1)</h1>
        <span className="VideoInfo__view-count text-color-secondary">18,901 views</span>

        <InteractionDock 
          userRating={props.userRating}
          rateVideo={props.rateVideo} 
          toggleShareModal={props.toggleShareModal}
          closeAddToMenu={props.closeAddToMenu}
          watchingVideoId={props.watchingVideoId}
        />
      </section>

      <section className="info-section">
        <div className="VideoInfo__top-row">
          <div className="VideoInfo__top-row--metadata">
            <a href="#">
              <ProfileIcon width={46} />
            </a>
            <div className="metadata-text">
              <span className="meta-creator"><a href="#">Traversy Media</a></span>
              <span className="meta-publish-date">Published on Jul 22, 2016</span>
            </div>
          </div>

          <div className="VideoInfo__top-row--subscribe-notify">
            <SubscribeButton 
              subscribed={subscribed}
              subCount="408K"
            />

            {subscribed && 
              <button className="subscription-notification-bell">
                <img src={subscribed ? subscriptionBellActivated : subscriptionBell} alt="" />
              </button>}
          </div>
        </div>

        <div className={'VideoInfo__description' + (props.showExpandedDescription ? ' expanded' : '')} dangerouslySetInnerHTML={videoDescription}></div>
        <button className="VideoInfo__description--show-toggle" onClick={props.toggleDescriptionExpansion}>
          {props.showExpandedDescription ? 'Show less' : 'Show more'}
        </button>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userRating, showExpandedDescription, watchingVideoId } = state.watch;
  const { userPlaylistsContainingVideo, closeAddToMenu } = state.playlists.addToMenu;
  const { userPlaylists } = state.playlists;
  return {userRating, userPlaylistsContainingVideo, userPlaylists, showExpandedDescription, watchingVideoId, closeAddToMenu};
}

const { rateVideo, toggleShareModal, toggleDescriptionExpansion } = watchActions;
const { addVideoToPlaylist, removeVideoFromPlaylist, createPlaylistAndAddVideo } = playlistActions;
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    rateVideo, toggleShareModal, addVideoToPlaylist, 
    removeVideoFromPlaylist, createPlaylistAndAddVideo, toggleDescriptionExpansion
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoInfo);