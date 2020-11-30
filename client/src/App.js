import './App.css';
import React,{ Fragment } from 'react';
import Discogs from './component/Discogs';
// import ListOffice from './component/Playlist';
function App() {
  return (
    <Fragment>
      <div className="container">
        <Discogs />
        {/* <ListOffice /> */}

      </div>
    </Fragment>
  );
}

export default App;
