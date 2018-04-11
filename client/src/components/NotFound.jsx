import React, { Component } from 'react';

/** @description displays this page if url does not match defined urls
   *
   * @param { object } props
   *
   * @returns { JSX } JSX
   */
const NotFoundPage = props => (
  <div className="center">
    <h1>404 - Page Not Found</h1>
    <p>I'm sorry, the page you were looking for cannot be found!</p>
  </div>

);
export default NotFoundPage;
