import { ColorRing } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          maxHeight: '100%',
          height: '100%',
        }}
      >
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#54adff', '#54adff', '#54adff', '#54adff', '#54adff']}
        />
      </div>
    </>
  );
};

export default Loader;
