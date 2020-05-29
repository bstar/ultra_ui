import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import classnames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Route, Redirect } from 'react-router-dom';
import { setJWTUser } from 'actions';

import MainApp from 'routes/app/'
import Page404 from 'routes/404/'
import Page500 from 'routes/500/'

import 'styles/bootstrap.scss';
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

import darkTheme from './themes/darkTheme';


const mapStateToProps = (state, ownProps) => ({
  layoutBoxed: state.settings.layoutBoxed,
  navCollapsed: state.settings.navCollapsed,
  navBehind: state.settings.navBehind,
  fixedHeader: state.settings.fixedHeader,
  sidebarWidth: state.settings.sidebarWidth,
  theme: state.settings.theme,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  setUser: token => {
    dispatch(setJWTUser(token));
  }
});

class App extends Component {

  componentDidMount () {

    const { user, setUser } = this.props;
    const reduxToken = get(user, 'data.token');
    const localToken = localStorage.getItem('token');

    if (!reduxToken) {

      if (localToken) {
        setUser(localToken);
      }
    }
  }

  render() {
    const { match, location, layoutBoxed, navCollapsed, navBehind, fixedHeader, sidebarWidth, theme } = this.props;
    const materialUITheme = darkTheme;
    const isRoot = location.pathname === '/' ? true : false;

    if (isRoot) {
      return <Redirect to={'/app/playersearch'} />;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(materialUITheme)}>
        <div id="app-inner">
          <div className="preloaderbar hide"><span className="bar" /></div>
          <div
            className={classnames('app-main full-height', {
              'fixed-header': fixedHeader,
              'nav-collapsed': navCollapsed,
              'nav-behind': navBehind,
              'layout-boxed': layoutBoxed,
              'theme-gray': theme === 'gray',
              'theme-dark': theme === 'dark',
              'sidebar-sm': sidebarWidth === 'small',
              'sidebar-lg': sidebarWidth === 'large'})
          }>
            <Route path={`${match.url}app`} component={MainApp} />
            <Route exact path="/404" component={Page404} />
            <Route exact path="/500" component={Page500} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
