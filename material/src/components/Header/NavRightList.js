import React from 'react';
import { connect } from 'react-redux';
import { get, find } from 'lodash';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { withRouter } from 'react-router-dom';
import { invalidateJWTUser } from 'actions';
import { leagueConversionMap, nhlTeams } from '../../constants';


const mapStateToProps = state => ({
  user: state.user.jwt,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(invalidateJWTUser());
  }
});

const listItemStyle = {
  paddingLeft: '50px', // 36 + 16, algin with sub list
};

class NavRightList extends React.Component {

  handleChange = (event, value) => {

    this.props.history.push(value);
  }

  handleLogout = () => {

    const { logout } = this.props;

    logout();
  }

  render () {

    const { user } = this.props;
    const team = user && find(nhlTeams, { short: get(user, 'team') });

    return (
      <ul className="list-unstyled float-right">
        { user && user.id ?
          <li style={{ marginRight: '20px' }}>
            <div style={{ float: 'left', marginTop: '17px' }}>{user.id}</div>
            <IconMenu
              iconButtonElement={<IconButton style={{ marginRight: '10px', marginTop: '4px' }}><img src={`assets/img/clubs/huge/${leagueConversionMap['NHL']}/${team.region} ${team.name}.png`} alt="" className=" img50" /></IconButton>}
              listStyle={{ border: '1px solid rgb(46, 110, 115)', borderRadius: '5px' }}
              onChange={this.handleChange}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              menuStyle={{minWidth: '150px'}}
                      >
              <MenuItem
                value="/app/profile"
                primaryText="Profile"
                innerDivStyle={listItemStyle}
                style={{fontSize: '14px', lineHeight: '48px' }}
                leftIcon={<i className="material-icons">person_outline</i>}
                          />
              <MenuItem
                value="/app/login"
                onClick={this.handleLogout}
                primaryText="Log Out"
                innerDivStyle={listItemStyle}
                style={{fontSize: '14px', lineHeight: '48px'}}
                leftIcon={<i className="material-icons">forward</i>}
                          />
            </IconMenu>
          </li>
        :
          <li style={{ marginRight: '20px' }}>
            <IconMenu
              iconButtonElement={<IconButton style={{ filter: 'invert(1)', marginRight: '10px' }}><img src="assets/images-demo/player2.png" alt="" className="rounded-circle img40_40" /></IconButton>}
              listStyle={{ border: '1px solid rgb(46, 110, 115)', borderRadius: '5px' }}
              onChange={this.handleChange}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              menuStyle={{ minWidth: '150px' }}
            >
              <MenuItem
                value="/app/login"
                primaryText="Login"
                innerDivStyle={listItemStyle}
                style={{fontSize: '14px', lineHeight: '48px' }}
                leftIcon={<i className="material-icons">person_outline</i>}
              />
              <MenuItem
                value="/app/register"
                primaryText="Register"
                innerDivStyle={listItemStyle}
                style={{fontSize: '14px', lineHeight: '48px'}}
                leftIcon={<i className="material-icons">forward</i>}
              />
            </IconMenu>
          </li>
        }
      </ul>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavRightList));
