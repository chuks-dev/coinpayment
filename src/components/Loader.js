import React from 'react';

const Loader = () => {
  return (
    <div className='row'>
      <div className='col-md-12  d-flex justify-content-center'>
        <div class='spinner-border my-1 mx-auto' role='status'>
          <span class='sr-only'>Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
