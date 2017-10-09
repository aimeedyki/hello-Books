/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (ComposedComponent) => {
  /**
   * higher other component checks the is authenticated status 
   * and redirects customer to landing page
   * 
   * @class Authentication
   * @extends {Component}
   */
  class Authentication extends Component {
    /**
     * 
     * @returns {*} void
     * @memberof Authentication
     */
    componentWillMount() {
      if (this.props.authenticated === false) {
        this.props.history.push('/');
      }
    }

    /**
     * 
     * @returns {*} void
     * @param {any} nextProps 
     * @memberof Authentication
     */
    componentWillUpdate(nextProps) {
      if (nextProps.authenticated === false) {
        this.props.history.push('/');
      }
    }

    /**
     * 
     * 
     * @returns {object} component
     * @memberof Authentication
     */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps)(withRouter(Authentication));
};
