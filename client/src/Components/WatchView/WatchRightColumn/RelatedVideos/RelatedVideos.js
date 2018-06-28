import React from 'react';
import RelatedVideo from '../RelatedVideo/RelatedVideo';
import thumbnail1 from '../../../../resources/example-thumb-1.jpg';
import thumbnail2 from '../../../../resources/example-thumb-2.jpg';
import thumbnail3 from '../../../../resources/example-thumb-3.jpg';
import thumbnail4 from '../../../../resources/example-thumb-4.jpg';

const RelatedVideos = () => {

  const videos = [
    {
      id: 'aHlwbm9zaXM',
      thumbnailSrc: thumbnail1,
      videoLength: '25:23',
      title: '"Is Hypnosis Fake?" Hypnotist stuns TEDX crowd',
      creator: 'Albert Nerenberg',
      views: '28K',
      watchedProgress: 0
    },
    {
      id: 'ZWxvbiBtdXN',
      thumbnailSrc: thumbnail2,
      videoLength: '13:30',
      title: 'Elon Musk: How To Achieve 10x More Than Your Peers',
      creator: 'Charisma On Command',
      views: '1.1M',
      watchedProgress: .33
    },
    {
      id: 'dGhlc2UgYm9',
      thumbnailSrc: thumbnail3,
      videoLength: '6:01',
      title: 'MY BOSS QUIT TODAY',
      creator: 'Joshua Fluke',
      views: '13K',
      watchedProgress: 1
    },
    {
      id: 'cXVpY2sgaW5',
      thumbnailSrc: thumbnail4,
      videoLength: '10:20',
      title: 'Double or Triple Your Internet Speed - This Method Actually Works!',
      creator: 'Linus Tech Tips',
      views: '6.8M',
      watchedProgress: 0
    },
    {
      id: 'aHlwbm9zaXM',
      thumbnailSrc: thumbnail1,
      videoLength: '25:23',
      title: '"Is Hypnosis Fake?" Hypnotist stuns TEDX crowd',
      creator: 'Albert Nerenberg',
      views: '28K',
      watchedProgress: 0
    },
    {
      id: 'ZWxvbiBtdXN',
      thumbnailSrc: thumbnail2,
      videoLength: '13:30',
      title: 'Elon Musk: How To Achieve 10x More Than Your Peers',
      creator: 'Charisma On Command',
      views: '1.1M',
      watchedProgress: .33
    },
    {
      id: 'dGhlc2UgYm9',
      thumbnailSrc: thumbnail3,
      videoLength: '6:01',
      title: 'MY BOSS QUIT TODAY',
      creator: 'Joshua Fluke',
      views: '13K',
      watchedProgress: 1
    },
    {
      id: 'cXVpY2sgaW5',
      thumbnailSrc: thumbnail4,
      videoLength: '10:20',
      title: 'Double or Triple Your Internet Speed - This Method Actually Works!',
      creator: 'Linus Tech Tips',
      views: '6.8M',
      watchedProgress: 0
    },
    {
      id: 'aHlwbm9zaXM',
      thumbnailSrc: thumbnail1,
      videoLength: '25:23',
      title: '"Is Hypnosis Fake?" Hypnotist stuns TEDX crowd',
      creator: 'Albert Nerenberg',
      views: '28K',
      watchedProgress: 0
    },
    {
      id: 'ZWxvbiBtdXN',
      thumbnailSrc: thumbnail2,
      videoLength: '13:30',
      title: 'Elon Musk: How To Achieve 10x More Than Your Peers',
      creator: 'Charisma On Command',
      views: '1.1M',
      watchedProgress: .33
    },
    {
      id: 'dGhlc2UgYm9',
      thumbnailSrc: thumbnail3,
      videoLength: '6:01',
      title: 'MY BOSS QUIT TODAY',
      creator: 'Joshua Fluke',
      views: '13K',
      watchedProgress: 1
    },
    {
      id: 'cXVpY2sgaW5',
      thumbnailSrc: thumbnail4,
      videoLength: '10:20',
      title: 'Double or Triple Your Internet Speed - This Method Actually Works!',
      creator: 'Linus Tech Tips',
      views: '6.8M',
      watchedProgress: 0
    }
  ];

  return (
    <div className="RelatedVideos">
      {videos.map(video => {
        return(
          <RelatedVideo video={video} key={video.id} />
        );
      })}
    </div>
  );
}

export default RelatedVideos;