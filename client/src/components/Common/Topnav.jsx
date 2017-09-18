import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction.js'

class Topnav extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout(event) {
    event.preventDefault();
    this.props.logoutUser();
  }
  render() {
    return (
      <div className='row'>
        <div className="col s12 navbar-fixed white">
          <nav>
            <div className="nav-wrapper white">
              <a href="#!" className="brand-logo left col l3 offset-l2 indigo-text text-darken-2">BOOKSVILLE</a>
              <ul className="right">
                <li>
                  <h5 className='indigo-text text-darken-2 hello'>Hello {this.props.username}!</h5>
                  {/* <div className="row valign-wrapper">
                    <div className='col s4 m5 l5'>
                      <img className='circle level-icon responsive-img' src={this.props.levelicon} />
                    </div>
                  </div> */}
                </li>
                <li>
                  <div className='col s1 m1 l1' />
                </li>
                <li><Link to="/" onClick={this.logout} className="indigo-text text-darken-2">Log out</Link></li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
  };
}
export default connect(mapStateToProps, { logoutUser })(Topnav);
