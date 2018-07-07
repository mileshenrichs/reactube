import React from 'react';
import CommentHistoryItem from './CommentHistoryItem/CommentHistoryItem';

const CommentHistory = () => {

  const comments = [
    {
      id: 0,
      videoTitle: 'Why “Cheat Meals” are KILLING Your Gains! (SORRY)',
      commentText: 'cheat meals <br><br>are delicious',
      timeSince: '3 days'
    },
    {
      id: 1,
      videoTitle: 'ExpressJS Crash Course',
      commentText: 'gotta love it',
      timeSince: '3 days'
    },
    {
      id: 2,
      videoTitle: 'Schedule Python Scripts in With Windows Task Scheduler (2018)',
      commentText: 'clutch video, thanks',
      timeSince: '1 month'
    },
    {
      id: 3,
      videoTitle: 'Clash of Clans: "My Favorite Level 6 Troops!" | Upgrades and Farming!',
      commentText: 'Congrats on 20k!',
      timeSince: '3 years'
    },
  ];

  return (
    <div className="CommentHistory">
      {comments.map(comment => (
        <CommentHistoryItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentHistory;