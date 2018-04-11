import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/** @description higher other component checks the is authenticated status
  * and redirects customer to landing page
  *
  * @class AdminAuthentication
  *
  * @extends {Component}
  */
export class AdminAuthentication extends Component {
  /** @description checks if user is an admin before the component mounts
   * 
   * @returns {*} null
   * 
   * @memberof AdminAuthentication
   */
  componentWillMount() {
    if (this.props.admin === false) {
      this.props.history.push('/user');
    }
  }

  /** @description checks if user is an admin before the component updates
   * 
   * @returns {*} null
   * 
   * @param {any} nextProps
   * 
   * @memberof AdminAuthentication
   */
  componentWillUpdate(nextProps) {
    if (this.props.admin === false) {
      this.props.history.push('/user');
    }
  }

  /** @description renders props
   * 
   * @returns {object} component
   * 
   * @memberof AdminAuthentication
   */
  render() {
    return <div {...this.props} />;
  }
}

export default (ComposedComponent) => {
  /** @description wraps component
   * 
   * @class AuthWrapper
   * 
   * @extends {AdminAuthentication}
   */
  class AuthWrapper extends AdminAuthentication {
    /** @description renders component
     * 
     * @returns {JSX} JSX
     */
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  /** @description connect the state from the store to the component props
   * 
   * @param {object} state 
   * 
   * @returns {boolean} admin status
   */
  const mapStateToProps = (state) => {
    const { admin } = state.authReducer.user;
    return {
      admin
    };
  };

  return connect(mapStateToProps)(withRouter(AuthWrapper));
};
