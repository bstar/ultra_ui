import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'components/Header';
import Sidenav from 'components/Sidenav';
import Footer from 'components/Footer';

import PlayerDetail from '../routes/playerDetail/'
import PlayerSearch from '../routes/playerSearch/'
import ChangeLog from '../routes/changeLog/'


class MainApp extends React.Component {

  render() {
    const { match } = this.props;

    return (
      <div className="main-app-container">
        <Sidenav />
        <section id="page-container" className="app-page-container">
          <Header />

          <div className="app-content-wrapper" style={{ background: 'url(assets/images/6.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
            <div className="app-content">
              <div className="full-height" style={{ maxWidth: '1800px' }}>
                  <Route path={`${match.url}/releasenotes`} component={ChangeLog} />
                  <Route path={`${match.url}/playersearch`} component={PlayerSearch} />
                  <Route path={`${match.url}/playerdetail/:playerId`} component={PlayerDetail} />
              </div>
            </div>
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}

export default MainApp;
