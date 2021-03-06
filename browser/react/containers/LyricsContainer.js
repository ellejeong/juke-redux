    
import React, {Component} from 'react';
import Lyrics from '../components/Lyrics';
import axios from 'axios';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics';

// ... or ...
// import {fetchLyrics} from '../action-creators/lyrics';
import store from '../store';

export default class extends Component {

  constructor() {

    super();

    // NOTE: FROM JOE ... object.assign({}, previousState, newProperties)
    // NOTE: FROM MOZILLA ... var copy = Object.assign({}, obj); or Object.assign(target, ...sources)
    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());

    this.handleArtistInput = this.handleArtistInput.bind(this);
    this.handleSongInput = this.handleSongInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleArtistInput(artist) {
    this.setState({ artistQuery: artist });
  }

  handleSongInput(song) {
    this.setState({ songQuery: song });
  }


  handleSubmit() {
  if (this.state.artistQuery && this.state.songQuery) {
    store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery));
  }
}


// NOTE: before we got to redux-thunk
//   handleSubmit(event) {
//     event.preventDefault();
//       console.log('OUTSIDE HANDLE SUBMIT');
//     if (this.state.artistQuery && this.state.songQuery) {
//         console.log('INSIDE HANDLE SUBMIT');
//       axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
//         .then(response => {
//           const setLyricsAction = setLyrics(response.data.lyric);
//           store.dispatch(setLyricsAction);           
//         });
//     }
//   }

  render() {
    return <Lyrics
      text={this.state.lyrics.text}
      setArtist={this.handleArtistInput}
      setSong={this.handleSongInput}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit={this.handleSubmit}
    />
  }

}