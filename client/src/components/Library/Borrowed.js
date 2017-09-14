import React, { Component } from 'react';
import Table from '../Common/Table';

export default class History extends Component {
  render() {
    const data = [{ title: "the beautiful", borrowdate: '17/8/2017', returndate: '23/8/2017' },
    { title: "the bad", borrowdate: '31/7/2017', returndate: '2/8/2017' }];
    const header = [
      {
        name: "TITLE",
        prop: "title"
      },
      {
        name: "DATE BORROWED",
        prop: "borrowdate"
      },
      {
        name: "DATE RETURNED",
        prop: "returndate"
      }
    ];
    return (
      <div className="row">
        <div className="col s12 l6 offset-l3">
          <Table data={data} header={header} />
        </div>
      </div>
    );
  }
}
