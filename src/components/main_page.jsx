/**
 * Created by vallefor on 02.03.17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import img from '../assets/cash.png';

class MainPage extends Component {
  render(){
    return (
      <div>
        main page
        <img src={img} />
        <Link to="/contacts">contacts</Link>
      </div>
    );
  }
}

export default MainPage;