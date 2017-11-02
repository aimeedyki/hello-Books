/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAuthorizationToken } from '../../actions/authAction';

export default (ComposedComponent) => {
  /** higher other component checks the is authenticated status
   * and redirects customer to landing page
   * @class Authentication
   * @extends {Component}
   */
  class Authentication extends Component {
    /** @returns {*} void
     * @memberof Authentication
     */
    componentWillMount() {
      if (this.props.authenticated === false || (!this.props.user)) {
        this.props.history.push('/');
        localStorage.clear();
        setAuthorizationToken('');
      }
    }
    /** @returns {*} void
         * @param {any} nextProps
         * @memberof Authentication
         */
    componentWillUpdate(nextProps) {
      if (nextProps.authenticated === false || (!this.props.user)) {
        this.props.history.push('/');
        localStorage.clear();
        setAuthorizationToken('');
      }
    }
    /** @returns {object} component
         * @memberof Authentication
         */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    const { user, authenticated } = state.auth;
    return {
      user,
      authenticated
    };
  };

  return connect(mapStateToProps)(withRouter(Authentication));
};
