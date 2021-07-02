import React from 'react';

import {
  getPortrait,
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
    whiteSpace: 'nowrap',
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
    margin: '-10px 0px 0px 0px',
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
  tag: {
    border: '1px solid rgb(64 110 111)',
    borderRadius: '5px',
    padding: '1px 4px 0px 4px',
    background: 'rgb(51 86 86)',
    marginRight: '6px',
  },
};

const PlayerPersonalInfo = ({ dob, age, positions_short, birth_town, nation, handedness, player_roles, combined_rating, stanley_cups_won, iss_ranking, com_ranking, draft_ranking, attributes }) => (
  <div>
    <div style={{ display: 'flex', flexDirection: 'row', paddingRight: '10px', marginTop: '10px' }}>
      <div style={{ paddingRight: '10px', minWidth: '360px' }}>
        <div className="row" style={{ marginTop: '8px' }}>
          <span style={styles.listTitle}>Born:</span><span style={styles.listItem}>{dob && `${dob} - ${age} y/o`}</span>
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
        <div className="row" style={{ overflow: 'hidden' }}>
          <span style={styles.listItem}>
            { iss_ranking && <span style={styles.tag}>ISS: #{iss_ranking}</span> }
            { com_ranking && <span style={styles.tag}>COM: #{com_ranking}</span> }
            { draft_ranking && <span style={styles.tag}>Drafted: {draft_ranking}oa</span> }
            <span style={styles.tag}>Cups: {stanley_cups_won}</span>
          </span>
        </div>
      </div>

      <div style={{ width: '100%', position: 'relative' }}>
        <div className="personal-portrait">
          <img src={`assets/img/portraits/${getPortrait(positions_short)}.png`} alt="Responsive Layout" style={styles.portrait} />
        </div>
      </div>
    </div>
  </div>
);

PlayerPersonalInfo.defaultProps = {
  lists: [],
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
