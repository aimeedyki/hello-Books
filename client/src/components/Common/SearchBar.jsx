import React from 'react';

const SearchBar = props => (
  <div className="search-bar row">
    <div className="col s12 " >
      <div className="row" id="topbarsearch">
        <div className="input-field col s6 s12">
          <input type="text"
            placeholder="search"
            id="autocomplete-input"
            className="autocomplete"
            onChange={props.searchItem}
          />
          <i className="indigo-text text-darken-2 material-icons prefix"
            onClick={props.submit}
          >search</i>
        </div>
      </div>
    </div>
  </div>
);

export default SearchBar;
