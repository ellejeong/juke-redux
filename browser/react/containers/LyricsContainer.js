    
import React, {Component} from 'react';
import Lyrics from '../components/Lyrics';
import axios from 'axios';

import {setLyrics} from '../action-creators/lyrics';
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

  handleSubmit(event) {
    event.preventDefault();
    
      console.log('OUTSIDE HANDLE SUBMIT');
    if (this.state.artistQuery && this.state.songQuery) {
        console.log('INSIDE HANDLE SUBMIT');
      axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
        .then(response => {
          const setLyricsAction = setLyrics(response.data.lyric);
          store.dispatch(setLyricsAction);           
        });

    }

  }

  render() {
    return <Lyrics
      text={this.state.text}
      setArtist={this.handleArtistInput}
      setSong={this.handleSongInput}
      artistQuery={this.state.artistQuery}
      songQuery={this.state.songQuery}
      handleSubmit={this.handleSubmit}
    />
  }

}