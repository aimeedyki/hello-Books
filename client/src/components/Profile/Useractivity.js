import React, { Component } from 'react';

import Table from '../Common/Table';

export default class Outstanding extends Component {
  render() {
    const data = [{ username: "gracie", title: 'the beautiful', action: 'returned', createdat: '26/8/2017' },
    { username: "jura", title: 'the bad', action: 'borrowed', createdat: '6/8/2017' }];
    const header = [
      {
        name: "USER",
        prop: "username"
      },
      {
        name: "BOOK",
        prop: "title"
      },
      {
        name: "ACTION",
        prop: "action"
      },
      {
        name: "DATE",
        prop: "createdat"
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
