import React from 'react';
import { withRouter } from 'react-router-dom';
import { leagues } from '../../config';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';


const isDevelopment = process.env.NODE_ENV === 'development';

const styles = {
  title: {
    fontSize: '24px',
    padding: '20px',
  }
}

class NavRightList extends React.Component {

  handleChange = (e, index, value) => {

    const { history } = this.props;
    localStorage.setItem('league_id', value);

    history.push('/');
  }

  render () {

    const leagueId = localStorage.getItem('league_id');

    return (
      <ul className="list-unstyled" >
        <li style={ styles.title }>
          <div>
            <SelectField
              name="league"
              autoWidth={true}
              value={leagueId}
              hintText="Choose League"
              style={{ marginTop: '-10px' }}
              onChange={this.handleChange}
            >
              { leagues && Object.keys(leagues).map(league => {
                const name = leagues[league].name; 
                if (league === 'LOCAL' && !isDevelopment){ return (<span></span>) };

                return (<MenuItem key={name} value={league} primaryText={name} />);
              })}
            </SelectField>
            </div>
        </li>
      </ul>
    );
  }
}

export default withRouter(NavRightList);
