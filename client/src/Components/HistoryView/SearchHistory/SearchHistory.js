import React from 'react';
import SearchHistoryItem from './SearchHistoryItem/SearchHistoryItem';

const SearchHistory = () => {

  const searches = [
    {
      id: 0,
      searchQuery: 'react router nested routes',
      timeSince: '46 minutes'
    },
    {
      id: 1,
      searchQuery: 'react router tutorial',
      timeSince: '1 hour'
    },
    {
      id: 2,
      searchQuery: 'starcraft 2 tournament 2018',
      timeSince: '13 hours'
    },
    {
      id: 3,
      searchQuery: 'busyworksbeats',
      timeSince: '1 day'
    },
    {
      id: 4,
      searchQuery: 'programming',
      timeSince: '1 day'
    },
    {
      id: 5,
      searchQuery: 'refactoring ui',
      timeSince: '1 day'
    },
  ];

  return (
    <div className="SearchHistory">
      {searches.map(search => (
        <SearchHistoryItem key={search.id} search={search} />
      ))}
    </div>
  );
}

export default SearchHistory;