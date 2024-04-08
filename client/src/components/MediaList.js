import React from 'react';
import MediaCard from './MediaCard';

const MediaList = ({ mediaPages }) => {
  // Filter media pages based on their types
  const photos = mediaPages.filter(mediaPage => mediaPage.type === 'photos');
  const videos = mediaPages.filter(mediaPage => mediaPage.type === 'videos');
  const lifestyle = mediaPages.filter(mediaPage => mediaPage.type === 'lifestyle');

  return (
    <div>
      <h3>Photos</h3>
      {photos.map(mediaPage => (
        <MediaCard key={mediaPage.id} mediaPage={mediaPage} />
      ))}

      <h3>Videos</h3>
      {videos.map(mediaPage => (
        <MediaCard key={mediaPage.id} mediaPage={mediaPage} />
      ))}

      <h3>Lifestyle</h3>
      {lifestyle.map(mediaPage => (
        <MediaCard key={mediaPage.id} mediaPage={mediaPage} />
      ))}
    </div>
  );
};

export default MediaList;