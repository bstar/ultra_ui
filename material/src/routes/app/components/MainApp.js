import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Route } from 'react-router-dom';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Snackbar from 'material-ui/Snackbar';
import Footer from 'components/Footer';

import PlayerDetail from '../routes/playerDetail/';
import PlayerSearch from '../routes/playerSearch/';
import ChangeLog from '../routes/changeLog/';
import Lists from '../routes/lists';
import { Login, Register, Profile, Activate } from '../routes/user';
import { closeMessageSuccess } from 'actions';


const mapStateToProps = state => ({
  message: get(state, 'message.data'),
});

const mapDispatchToProps = dispatch => ({
  close: () => {
      dispatch(closeMessageSuccess());
  }
});

class MainApp extends Component {


  handleClose = () => {

    const { close } = this.props;

    close();
  }

  render () {

    const { match, message } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />
        <section id="page-container" className="app-page-container">
          <Header />

          <div className="app-content-wrapper" style={{ background: 'url(assets/images/6.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', overflow: 'hidden' }}>
            <div className="app-content">
              <div className="full-height" style={{ maxWidth: '1800px' }}>
                  <Route path={`${match.url}/releasenotes`} component={ChangeLog} />
                  <Route path={`${match.url}/playersearch`} component={PlayerSearch} />
                  <Route path={`${match.url}/playerdetail/:playerId`} component={PlayerDetail} />
                  <Route path={`${match.url}/lists`} component={Lists} />
                  <Route path={`${match.url}/login`} component={Login} />
                  <Route path={`${match.url}/register`} component={Register} />
                  <Route path={`${match.url}/profile`} component={Profile} />
                  <Route path={`${match.url}/activate`} component={Activate} />
              </div>
            </div>
            <Snackbar
                open={ message && message.open }
                message={ message && message.text }
                autoHideDuration={4000}
                bodyStyle={{ borderRadiusTopRight: '10px', border: '1px solid rgb(46, 110, 115)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                contentStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                onRequestClose={this.handleClose}
            />
            <Footer />
          </div>
        </section>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
