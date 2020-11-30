// const { Fragment } = require("react")

import React from 'react'

class Discogs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      discogs_data: [],
      isLoaded: false,
      playlists: [],
      search: ''
    }
  }
  // const Discogs = () => {
  //     let [search,setSearch] = useState("")
  SearchData = e => {
    console.log('This is called')
    let { search } = this.state
    console.log(search)
    if (search != null) {
      let URL =
        'https://api.discogs.com/database/search?key=qEKHupTTqEVzjEIqtjOc&secret=rxXtkIaKJvbQToStedDAssNljBYovhxG&artist=' +
        search +
        '&country=canada'
      fetch(URL).then(response => {
        response.json().then(json_response => {
          console.log(json_response.results)
          this.setState({
            discogs_data: json_response.results,
            isLoaded: true
          })
        })
      })
    }
    let P_URL = 'http://localhost:8000/playlist'
    fetch(P_URL)
      .then(res => res.json())
      .then(
        response => {
          this.setState(
            {
              playlists: response.playlist
            },
            () => {
              console.log(this.state)
            }
          )
        },
        error => {
          this.state({
            error: error
          })
          console.log(error)
        }
      )
  }

  to_playlist = event => {
    let { discogs_data } = this.state
    let track = discogs_data.find(ele => ele.id === parseInt(event.target.id))
    let platlistID = document.getElementById('select-' + event.target.id).value
    let newData = {
      id: track.id,
      playlist_id: parseInt(platlistID),
      title: track.title,
      url: track.uri,
      master_id: track.master_id
    }

    let URL = 'http://localhost:8000/tracks'
    let method = 'POST'
    fetch(URL, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then(response1 => response1.json())
      .then(
        response => console.log(response),
        error => {
          this.setState({
            error: { message: 'AJAX eror, URL is not correct' }
          })
          console.log(error)
        }
      )
    //Count(this.state.count + 1)
  }

  onChangethis = event => {
    let { search } = this.state
    search = event.target.value
    this.setState({
      search: search
    })
  }

  DiscordNewData = () => {
    let { discogs_data, isLoaded, playlists } = this.state
    const newView = {
      height: 750 + 'px',
      width: 450 + 'px',
      overflow: 'scroll'
    }

    const cards = {
      width: '20rem',
      margin: '10px'
    }
    if (isLoaded) {
      return (
        <div className='container' style={newView}>
          {discogs_data.map((set, index) => {
            return (
              <div className='card' style={cards} key={index}>
                <img src={set.cover_image} className='card-img-top' alt='' />
                <div className='card-body'>
                  <h3 className='card-title'>{set.title}</h3>
                  <a
                    href={'http://www.discogs.com' + set.uri}
                    target='_blank'
                    rel='noreferrer'
                    className='btn btn-warning'
                  >
                    ADDITION
                  </a>
                  <div className='form-group'>
                    <select className='form-control' id={'select-' + set.id}>
                      {playlists.map((playlist, playlistIndex) => (
                        <option key={playlistIndex} value={playlist.id}>
                          {playlist.title}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={event => this.to_playlist(event)}
                      id={set.id}
                      className='btn btn-success'
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <div>Search more</div>
    }
  }

  render () {
    return (
      <div className='col-md-3'>
        <div className='form-group col-10 d-flex flex-flow'>
          <input
            className='form-control mr-sm-2'
            type='search'
            id='sea rch'
            placeholder='Search'
            aria-label='Search'
            onChange={e => this.onChangethis(e)}
          />
          <button
            className='btn btn-success'
            type='button'
            onClick={() => this.SearchData()}
          >
            Find
          </button>
        </div>
        {this.DiscordNewData()}
      </div>
    )
  }
}

export default Discogs
