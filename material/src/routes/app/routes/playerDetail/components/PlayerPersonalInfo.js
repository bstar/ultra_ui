import React from 'react';
import PlayerRadarChart from './PlayerRadarChart';

import {
  getPortrait,
  getCombinedColor,
  getTechnicalColor,
  getMentalColor,
  getPhysicalColor,
} from 'utils';


const styles = {
  listItem: {
    fontFamily: 'Roboto, sans-serif',
    padding: '3px 10px 5px 15px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    textShadow: '1px 1px 3px rgba(0, 0, 0,.4)',
  },
  listTitle: {
    width: '80px',
    fontFamily: 'Roboto, sans-serif',
    padding: '3px 10px 5px 15px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    color: '#9fcfdf',
    fontWeight: 500,
    textShadow: '1px 1px 3px rgba(0, 0, 0,.4)',
  },
  icon: {
    padding: '0px 20px 0px 0px',
    color: '#7cb7b1',
    width: '60px',
  },
  radioButton: {
    marginBottom: 16,
  },
  portrait: {
    height: 'auto',
    borderRadius: '50%',
    padding: '18px 0px 10px 0px',
    opacity: 0.2,
    transform: 'scale(1, 1)',
  },
  personal: {
    margin: '20px 10px 10px 0px',
  },
  name: {
    fontSize: '24px',
  },
  smallHead: {
    fontSize: '18px',
  },
  iconColumn: {
    width: '60px',
  },
  countryImg: {
    padding: '0px 10px 0px 0px',
    margin: '0px',
  },
  team: {
    fontSize: '22px',
  },
};

const PlayerPersonalInfo = ({ dob, age, positions_short, birth_town, nation, handedness, player_roles, combined_rating, stanley_cups_won, attributes }) => (
  <div>
    <div className="row" style={{ maxHeight: '222px' }}>

      <div className="col-xl-2">

        <div className="personal-portrait">
          <img src={`assets/img/portraits/${getPortrait(positions_short)}.png`} alt="Responsive Layout" style={styles.portrait} />
        </div>
      </div>
      <div className="col-xl-10">
        <div>
          <PlayerRadarChart position={positions_short} attributes={attributes} />
        </div>
      </div>
    </div>
    <div className="row" style={{ marginTop: '15px' }}>
      <span style={styles.listTitle}>Born:</span><span style={styles.listItem}>{dob && `${dob} (${age})`}</span>
    </div>
    <div className="row">
      <span style={styles.listTitle}>Home:</span><span style={styles.listItem}>{nation && `${birth_town}, ${nation}`}</span>
    </div>
    <div className="row">
      <span style={styles.listTitle}>Shoots:</span><span style={styles.listItem}>{handedness}</span>
    </div>
    <div className="row">
      <span style={styles.listTitle}>Role:</span><span style={styles.listItem}>{player_roles}</span>
    </div>
    <div className="row">
      <span style={styles.listTitle}>Ratings:</span><span style={styles.listItem}>{combined_rating} com / {(combined_rating/age).toFixed(1)} ao</span>
    </div>
    <div className="row">
      <span style={styles.listTitle}>Cups:</span><span style={styles.listItem}>{stanley_cups_won}</span>
    </div>
  </div>
);

PlayerPersonalInfo.defaultProps = {
  dob: '',
  age: '',
  birth_town: '',
  nation: '',
  handedness: '',
  player_roles: '',
  combined_rating: '',
  technical_rating: '',
  mental_rating: '',
  physical_rating: '',
  positions_short: '',
};

export default PlayerPersonalInfo;
