import React, {Component} from 'react';
import { render } from '@testing-library/react';
import logo from '../assets/images/logo.svg';

class TopNavBar extends Component {
  render() {
      return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
        </header>
      )
  }
}

export default TopNavBar;