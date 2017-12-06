import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** higher other component checks the is authenticated status
  * and redirects customer to landing page
  * @class AdminAuthentication
  * @extends {Component}
  */
export class AdminAuthentication extends Component {
  /** @returns {*} void
   * @memberof AdminAuthentication
   */
  componentWillMount() {
    if (this.props.admin === false) {
      this.props.history.push('/user');
    }
  }
  /** @returns {*} void
       * @param {any} nextProps
       * @memberof AdminAuthentication
       */
  componentWillUpdate(nextProps) {
    if (this.props.admin === false) {
      this.props.history.push('/user');
    }
  }
  /** @returns {object} component
       * @memberof AdminAuthentication
       */
  render() {
    return <div {...this.props} />;
  }
}

export default (ComposedComponent) => {
  /**
   * @class AuthWrapper
   * @extends {AdminAuthentication}
   */
  class AuthWrapper extends AdminAuthentication {
    /**
     * @returns {*} null
     */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state) => {
    const { admin } = state.authReducer.user;
    return {
      admin
    };
  };

  return connect(mapStateToProps)(withRouter(AuthWrapper));
};
