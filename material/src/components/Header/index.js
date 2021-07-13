import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import APPCONFIG from 'constants/Config';
import NavLeftList from './NavLeftList';
import NavRightList from './NavRightList';
import { teamColors } from '../../utils';
import $ from 'jquery';

const styles = {
  section: {
    backgroundColor: 'rgba(57, 74, 89, .97)',
  },
}

const getHighlightColor = abbrev => {

  const team = teamColors[abbrev];

  return team[`color${team.highlight}`];
}

class Header extends React.Component {

  componentDidMount() {
    const sidebarToggler = this.sidebarBtn;
    const $sidebarToggler = $(sidebarToggler);
    const $body = $('#body');

    $sidebarToggler.on('click', (e) => {
      $body.toggleClass('sidebar-mobile-open');
    });
  }

  render () {

    return (
      <section className="app-header" style={styles.section}>
        <div
          style={{ borderBottom: `2px solid ${getHighlightColor('phi')}`, height: '62px', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)' }}
          className="appHeaderInner">

          <div className="d-lg-none d-xl-none float-left">
            <a className="md-button header-icon toggle-sidebar-btn" ref={(c) => { this.sidebarBtn = c; }}>
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand d-none d-lg-inline-block d-xl-inline-block">
            <h2><Link to="/">{APPCONFIG.brand}</Link></h2>
          </div>

          <div className="top-nav-left d-none d-lg-inline-block d-xl-inline-block">
            <NavLeftList />
          </div>

          <div className="top-nav-right">
            <NavRightList />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  colorOption: state.settings.colorOption,
});

export default connect(
  mapStateToProps
)(Header);
