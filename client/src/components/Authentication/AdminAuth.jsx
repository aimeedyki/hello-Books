import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (ComposedComponent) => {
  /** higher other component checks the is authenticated status
   * and redirects customer to landing page
   * @class AdminAuthentication
   * @extends {Component}
   */
  class AdminAuthentication extends Component {
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
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    const { user } = state.authReducer;
    return {
      admin: user.admin,
    };
  };

  return connect(mapStateToProps)(withRouter(AdminAuthentication));
};
