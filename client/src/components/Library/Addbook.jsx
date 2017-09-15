import React, { Component } from 'react';
import Input from '../Common/Input.jsx';
import Button from '../Common/Button.jsx';

export default class Add extends Component {
  render() {
    return (
      <div className="row">
        <div className='col s10 m8 l6 offset-s1 offset-m2 offset-l3'>
          <form>
            <div className='row'>
              <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
                <h5 className='center indigo-text text-darken-2'>ADD A NEW BOOK</h5>
                <div className='input-field'>
                  <Input name="title" type="text" label="TITLE" />
                </div>
                <div className='input-field'>
                  <Input name="author" type="text" label="AUTHOR" />
                </div>
                <div className='input-field'>
                  <Input name="description" type="text" label="DESCRIPTION" />
                </div>
                <div className='input-field'>
                  <Input name="quantity" type="text" label="QUANTITY" />
                </div>
                <select>
                  <option value="" disabled selected>Choose book category</option>
                  <option value="thriller">THRILLER</option>
                  <option value="romance">ROMANCE</option>
                </select>
                <p className='grey-text'>Upload book image</p>
                <div className="file-field input-field">
                  <div className="btn indigo darken-2">
                    <span>Browse</span>
                    <input type="file" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
                <Button type="submit" name="action" label="Add book" icon="add" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
