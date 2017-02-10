import React, {Component} from 'react';
import store from '../store';
import axios from 'axios'
import Lyrics from '../components/Lyrics'

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

        axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
        .then(response => {
            const setLyricsAction = setLyrics(response.data.lyric);
            store.dispatch(setLyricsAction);
        })
        .catch(err)

      }
  }


  render() {
    return (
    <div>
      <h1>Just a container for now!</h1>
        <Lyrics
        text={this.state.text}
        setArtist={this.handleArtistInput}
        setSong={this.handleSongInput}
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        handleSubmit={this.handleSubmit}
        />
    </div>
    );
  }

}