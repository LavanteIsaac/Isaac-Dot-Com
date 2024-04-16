import React from 'react';
import MediaCard from './MediaCard';

const MediaList = ({ mediaPages }) => {
  
  const portfolioMedia = mediaPages.filter(mediaPage => mediaPage.category === 'portfolio');
  const videoMedia = mediaPages.filter(mediaPage => mediaPage.category === 'video');
  const lifestyleMedia = mediaPages.filter(mediaPage => mediaPage.category === 'lifestyle');

  return (
    <div>
      <div className="media-row">
        <h3>Portfolio</h3>
        <div className="media-cards">
          {portfolioMedia.map(mediaPage => (
            <MediaCard key={mediaPage.id} mediaPage={mediaPage} />
          ))}
        </div>
      </div>

      <div className="media-row">
        <h3>Videos</h3>
        <div className="media-cards">
          {videoMedia.map(mediaPage => (
            <MediaCard key={mediaPage.id} mediaPage={mediaPage} />
          ))}
        </div>
      </div>

      <div className="media-row">
        <h3>Lifestyle</h3>
        <div className="media-cards">
          {lifestyleMedia.map(mediaPage => (
            <MediaCard key={mediaPage.id} mediaPage={mediaPage} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaList;