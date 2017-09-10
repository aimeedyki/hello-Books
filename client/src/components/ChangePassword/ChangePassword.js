import React, { Component } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default class ChangePassword extends Component {
  render() {
    return (
      <div className="row">
        <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l3'>
          <form>
            <div className='row'>
              <div className='col s10 m8 l8 offset-s1 offset-m2 '>
                <h5 className="indigo-text text-darken-2 center">CHANGE PASSWORD</h5>
                <Input name="oldpassword" type="text" label="Password" />

                <Input name="newpassword" type="text" label="New password" />

                <Input name="cnewpassword" type="text" label="Confirm new password" />

                <Button type="submit" name="action" label="Change Password" icon="save" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
