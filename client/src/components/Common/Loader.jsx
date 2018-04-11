import React from 'react';

/** @description Shows loader component
   * 
   * @returns { JSX } JSX
   */
const Loader = () => (
  <div className="row">
    <div className="col s2 offset-s6">
      <div className="preloader-wrapper center big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Loader;
