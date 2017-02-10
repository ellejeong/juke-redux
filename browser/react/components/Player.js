import React from 'react';

const Player = (props) => {

  const currentSong = props.currentSong;
  const currentSongList = props.currentSongList;
  const isPlaying = props.isPlaying;
  const progress = props.progress;
  const prev = props.prev;
  const toggle = props.toggle;
  const next = props.next;

// From this, we can see that we need to handle the following state:
// isPlaying --> boolean
// currentSong
// currentSongList

// And we'll need to define the following behavior:
// play
// pause
// load
// startSong
// toggleOne
// toggle


  return (
    <footer>
      <div style={!currentSong.id ? {display: 'none'} : null}>
        <div className="pull-left">
          <button className="btn btn-default" onClick={prev}>
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button className="btn btn-default" onClick={toggle}>
            <span className={isPlaying ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play'}></span>
          </button>
          <button className="btn btn-default" onClick={next}>
            <span className="glyphicon glyphicon-step-forward"></span>
          </button>
        </div>
        <div className="bar">
          <div className="progress">
            <div className="progress-bar" style={{width: `${progress * 100}%`}}></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Player;
