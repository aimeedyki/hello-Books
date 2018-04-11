import React from 'react';

import rookie from '../assets/images/rookie.jpg';
import bookworm from '../assets/images/bookworm.png';
import voracious from '../assets/images/voracious.jpg';

/** @description component that tells user what the library is about
   *
   * @returns { JSX } JSX
   */
const About = () => (
  <div className="row">
    <div className="col s12 m10 l10 offset-m1 white-text">
      <h5 className="greeting white-text center" id="home">
        Welcome to Booksville, home for book lovers.</h5>
      <p>Booksville goes all over the world to bring you
        intersting and fresh books.</p>
      <p>So whatever your interest, you can always find it here first.</p>
      <h5 className="greeting white-text center">
        Membership Types</h5>
      <p>At Booksville, registration is free, which gives you access to a
        rookie Membership. Overdue books attract a charge of ₦100 per overdue
        day. Below are our membership types with our terms and conditions</p>
      <div className="row">
        <div className="col s12 m3 l4 offset-m1 white-text">
          <div className='about'>
            <img className='circle photo'
              src={rookie} alt='profile photo' />
          </div>
          <h5 >Rookie</h5>
          <p>free</p>
          <p>Maximum of 2 books borrowed</p>
          <p>Maximum of 3 days to return a borrowed books</p>
        </div>
        <div className="col s12 m3 l4 offset-m1 white-text">
          <div className='about'>
            <img className='circle photo'
              src={bookworm} alt='profile photo' />
          </div>
          <h5 >Bookworm</h5>
          <p>₦2000 a month</p>
          <p>Maximum of 5 books borrowed</p>
          <p>Maximum of 5 days to return a borrowed books</p>
        </div>
        <div className="col s12 m3 l4 offset-m1 white-text">
          <div className='about'>
            <img className='circle photo'
              src={voracious} alt='profile photo' />
          </div>
          <h5 >Voracious</h5>
          <p>₦5000 a month</p>
          <p>Maximum of 10 books borrowed</p>
          <p>Maximum of 7 days to return a borrowed books</p>
        </div>
      </div>
      <p className="center">Thank you for visiting</p>
    </div>
  </div>

);

export default About;
