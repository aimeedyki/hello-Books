import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAuthorizationToken } from '../../actions/authAction';

export default (ComposedComponent) => {
  /** @description higher other component checks the is authenticated status
   * and redirects customer to landing page
   *
   * @class Authentication
   *
   * @extends {Component}
   */
  class Authentication extends Component {
    /** @description checks if user is authenticated before the component mounts
     * 
     *  @returns {*} null
     * 
     * @memberof Authentication
     */
    componentWillMount() {
      if (this.props.authenticated === false) {
        this.props.history.push('/');
        localStorage.clear();
        setAuthorizationToken('');
      }
    }
    /** @description checks if user is authenticated before the component updates
     * 
     * @returns {*} void
     * 
     * @param {object} nextProps
     * 
     * @memberof Authentication
     */
    componentWillUpdate(nextProps) {
      if (nextProps.authenticated === false) {
        this.props.history.push('/');
        localStorage.clear();
        setAuthorizationToken('');
      }
    }
    /** @description checks if user is authenticated before the component mounts
     * 
     *  @returns {object} component
     *
     * @memberof Authentication
     */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  /** @description connect the state from the store to the component props
   *
   * @param {object} state 
   *
   * @returns {object} user details
   * @returns {boolean} authentication status
   */
  const mapStateToProps = (state) => {
    const { user, authenticated } = state.authReducer;
    return {
      user,
      authenticated
    };
  };

  return connect(mapStateToProps)(withRouter(Authentication));
};
