import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import SidenavContent from './SidenavContent';


class Sidebar extends React.Component {

  render () {
    return (
      <nav style={{ boxShadow: '10px 0 30px -2px #202020' }} className={classnames('app-sidebar', 'bg-color-dark')}>

        <section className="sidebar-content" style={{ background: 'url(assets/images/side-background.png)', backgroundAttachment: 'fixed', backgroundRepeat: 'repeat-y', borderRight: '1px solid #2e6e73' }}>
          <SidenavContent />
        </section>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  navCollapsed: state.settings.navCollapsed,
  colorOption: state.settings.colorOption
});

export default withRouter(connect(
  mapStateToProps,
  null,
)(Sidebar));
