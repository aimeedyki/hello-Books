import React, { Component } from 'react';
import Input from '../Common/Input.jsx';
import Button from '../Common/Button.jsx';

export default class Add extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

      <div className='col s10 m8 l6 offset-s1 offset-m2 offset-l3'>
        <form>
          <div className='row'>
            <div className='col s10 m8 l8 offset-s1 offset-m2 offset-l2'>
              <h5>EDIT {this.props.title}</h5>
              <Input name="title" type="text" label="TITLE" />
              <Input name="author" type="text" label="AUTHOR" />
              <Input name="description" type="text" label="DESCRIPTION" />
              <Input name="quantity" type="text" label="QUANTITY" />
              <select>
                <option value="" disabled selected>Change book category</option>
                <option value="thriller">THRILLER</option>
                <option value="romance">ROMANCE</option>
              </select>
              <p className='grey-text'>Change book image</p>
              <div className="file-field input-field">
                <div className="btn indigo darken-2">
                  <span>Browse</span>
                  <input type="file" />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
              <Button type="submit" name="action" label="save changes" icon="save" />
            </div>
          </div>
        </form>
      </div>

    );
  }
}
