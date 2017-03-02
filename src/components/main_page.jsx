/**
 * Created by vallefor on 02.03.17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

class MainPage extends Component {
  render(){
    return (
      <div>
        main page
        <Link to="/contacts">contacts</Link>
      </div>
    );
  }
}

export default MainPage;