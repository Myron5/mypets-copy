import { useState } from 'react';

import Loader from './Loader';

const ImageLoader = props => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageOnLoad = async () => {
    await new Promise(r => setTimeout(r, 1000));
    setIsLoaded(true);
  };

  /* eslint-disable jsx-a11y/alt-text */
  return (
    <>
      {!isLoaded && <Loader />}
      <img
        {...props}
        onLoad={handleImageOnLoad}
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
      />
    </>
  );
};

export default ImageLoader;
