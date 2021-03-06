import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Route, Redirect } from 'react-router-dom';
import moment from 'moment';
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
  user: get(state, 'user'),
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

  isAuthed = () => {

    const { user } = this.props;
    const exp = get(user, 'jwt.exp');

    return moment().isBefore(moment.unix(exp));
  }

  render () {

    const { match, message } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />
        <section id="page-container" className="app-page-container">
          <Header />
          <div className="app-content-wrapper">
            <div className="app-content">
              <div className="full-height" style={{ maxWidth: '1800px' }}>
                  <Route
                    path={`${match.url}/releasenotes`}
                    render={ props => <ChangeLog {...props} isAuthed={this.isAuthed} /> }
                  />
                  <Route
                    path={`${match.url}/gms`}
                    render={ props => <Profile {...props} isAuthed={this.isAuthed} /> }
                  />
                  <Route
                    path={`${match.url}/playersearch`}
                    render={ props => <PlayerSearch {...props} isAuthed={this.isAuthed} /> }
                  />
                  <Route
                    exact
                    path={`${match.url}/lists/:key`}
                    render={ props => <Lists {...props} isAuthed={this.isAuthed} /> }
                  />
                  <Route
                    exact
                    path={`${match.url}/lists/:key/:type/`}
                    render={ props => <Lists {...props} isAuthed={this.isAuthed} /> }
                  />
                  <Route
                    path={`${match.url}/playerdetail/:playerId/`}
                    render={ props => <PlayerDetail {...props} isAuthed={this.isAuthed} /> }
                  />
                  <Route
                    path={`${match.url}/login`}
                    render={props => (
                      <Login {...props} />
                    )}
                  />
                  <Route
                    path={`${match.url}/register`}
                    render={props => (
                      <Register {...props} />
                    )}
                  />
                  <Route
                    path={`${match.url}/profile`}
                    render={ props => <Profile {...props} isAuthed={this.isAuthed} /> }
                  />
                  <Route
                    path={`${match.url}/activate`}
                    render={ props => <Activate {...props} isAuthed={this.isAuthed} /> }
                  />
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
