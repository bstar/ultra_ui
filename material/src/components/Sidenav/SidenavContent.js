import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';


const styles = {
  textItem: {
    fontSize: '16px',
    textShadow: '1px 1px 6px rgba(0,0,0,.8)',
    color: '#ccc',
  }
};

class SidebarContent extends React.Component {

  render () {

    return (
      <div>
        <ul className="nav" ref={(c) => { this.nav = c; }}>
          <li style={{ marginLeft: '13px', marginTop: '25px' }} className="nav-header">

            <img style={{ filter: 'drop-shadow(2px 4px 6px #252525)', opacity : 0.65 }} src="assets/img/ehmlc_logo.png" alt="Responsive Layout" />
          </li>
          <br />
          <li>
            <NavLink to={{ pathname: '/app/releasenotes' }} activeClassName="selected">
              <i className="nav-icon material-icons">notes</i><span className="nav-text" style={ styles.textItem }>Changelog</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={{ pathname: '/app/gms' }} activeClassName="selected">
              <i className="nav-icon material-icons">account_circle</i><span className="nav-text" style={ styles.textItem }>General Managers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={{ pathname: '/app/playersearch' }} activeClassName="selected">
              <i className="nav-icon material-icons">search</i><span className="nav-text" style={ styles.textItem }>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={{ pathname: '/app/drafts' }} activeClassName="selected">
              <i className="nav-icon material-icons">drafts</i><span className="nav-text" style={ styles.textItem }>Drafts</span>
            </NavLink>
          </li>

          <li>
            <NavLink to={{ pathname: '/app/rankings' }} activeClassName="selected">
              <i className="nav-icon material-icons">language</i><span className="nav-text" style={ styles.textItem }>Rankings</span>
            </NavLink>
          </li>

          <li>
            <NavLink to={{ pathname: '/app/personallists' }} activeClassName="selected">
              <i className="nav-icon material-icons">list</i><span className="nav-text" style={ styles.textItem }>Personal Lists</span>
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(SidebarContent);
