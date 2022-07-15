import React, { Component } from 'react'
import styled from 'styled-components'
import loadingGif from '../pokemon/hourglass.gif'
import {Link} from 'react-router-dom';

const Sprite = styled.img `
  width: 5em;
  height: 5em;
  display: none
`;

const Card = styled.div `
  box-shadow: 0px 3px 9px 0px rgba(0,0,0,0.36);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0px 9px 9px 0px rgba(229, 103, 23);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color:black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
state = {
  name: '',
  imageUrl: '',
  pokemonID: '',
  imageLoading: true,
  tooManyReq: false
}

componentDidMount () {
  const {name, url} = this.props;
  const pokemonID = url.split('/')[url.split('/').length - 2];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png?raw=true`

  this.setState({
    name: name,
    imageUrl: imageUrl,
    pokemonID: pokemonID
  })
}

  render() {
    const {name, url} = this.props;
    // const name = this.props.name;
    // const url = this.props.url;
    // console.log(loadingGif)

    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonID}`}>
          <Card className="card bg-red">
              <h5 className="card-header">{this.state.pokemonID}</h5>
              {this.state.imageLoading ? (
                <img 
                  src={loadingGif} 
                  style={{width: '5em', height: '5em'}} 
                  className="card-img-top rounded mx-auto d-block mt-2"
                />
              ) : null}
              <Sprite 
                className="card-img-top rounded mx-auto mt-2"
                onLoad={() => this.setState({imageLoading: false})}
                onError={() => this.setState({tooManyReq: true})} 
                src={this.state.imageUrl}
                style={
                  this.state.tooManyReq ? {display: "none"} :
                  this.state.imageLoading ? null : {display: "block"}
                }
              />
              {this.state.tooManyReq ? (
                <h6 className="mx-auto">
                  <span className="badge badge-danger mt-2">Too many REQUESTS</span>
                </h6>
              ) : null}
              <div className="card-body mx-auto">
                <h6 className="card-title">{this.state.name
                .toLowerCase()
                .split(' ')
                .map(
                  letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                )
                .join(' ')}</h6>
              </div>
          </Card>
        </StyledLink>
      </div>
    )
  }
}
