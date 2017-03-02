/**
 * Created by vallefor on 02.03.17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

class MainPage extends Component {
  render(){
    return (<div>
      <Link to="/">to main</Link>
    </div>);
  }
}

export default MainPage;