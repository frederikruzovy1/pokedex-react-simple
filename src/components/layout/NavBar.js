import React, { Component } from 'react'
import styles from 'styled-components'



export default class NavBar extends Component {
  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-md navbar-light bg-danger bg-gradient fixed-top">
              <div className="container-fluid">
                <a className="navbar-brand fw-bolder text-white" href="#">Pokedex</a>
              </div>
          </nav>
      </div>
    )
  }
}
