import React from 'react';
import { get } from 'lodash';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import BenchmarkChart from './BenchmarkChart';

const getCombinedColor = (rating) => {
  if (rating < 200) {
    return 'red';
  }

  if (rating < 300) {
    return 'orange';
  }

  if (rating < 350) {
    return 'green';
  }

  return 'blue';
};

const getTechnicalColor = (rating) => {
  if (rating < 70) {
    return 'red';
  }

  if (rating < 130) {
    return 'orange';
  }

  if (rating < 185) {
    return 'green';
  }

  return 'blue';
};

const getMentalColor = (rating) => {
  if (rating < 70) {
    return 'red';
  }

  if (rating < 110) {
    return 'orange';
  }

  if (rating < 140) {
    return 'green';
  }

  return 'blue';
};

const getPhysicalColor = (rating) => {
  if (rating < 60) {
    return 'red';
  }

  if (rating < 80) {
    return 'orange';
  }

  if (rating < 94) {
    return 'green';
  }

  return 'blue';
};

const leagueConversionMap = {
  NHL: 'National Hockey League',
  AHL: 'American Hckey League',
  ECHL: 'ECHL',
};

const portrait = player => {
  
  console.log("PLAYER", player)
  if (player.positions_short === 'G') {
    return 'goalie';
  }

  if (player.ehm_id) {
    return 'center';
  }
}

const styles = {
  listItem: {
    fontFamily: 'Roboto, sans-serif',
    padding: '5px 10px 5px 15px',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    textShadow: '1px 1px 3px rgba(0, 0, 0,.4)',
  },
  listTitle: {
    fontFamily: 'Roboto, sans-serif',
    padding: '5px 10px 5px 15px',
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
    opacity: 0.5,
    margin: '0px',
    transform: 'scale(1.2, 1.2)',
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
  }
};

const Chart = ({ player }) => (
  <div>
    <div className="row" style={{ minHeight: '250px' }}>
      <div className="col-xl-5">
        <img src={`assets/img/portraits/${portrait(player)}.png`} alt="Responsive Layout" style={styles.portrait} />
      </div>

      <div className="col-xl-7">
        <BenchmarkChart player={player} />
      </div>

    </div>

    <div className="row">
      <div className="col-xl-2">
        <span style={styles.listTitle}>Born:</span>
      </div>
      <div className="col-xl-10">
        <span style={styles.listItem}>{`${player.dob} (${player.age})`}</span>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-2">
        <span style={styles.listTitle}>Home:</span>
      </div>
      <div className="col-xl-10">
        {/* <img style={styles.countryImg} src={`assets/img/flags/32/${get(player, 'nation', '').replace(' ', '-')}.png`} alt="Responsive Layout" /> */}
        <span style={styles.listItem}>{`${player.birth_town}, ${player.nation}`}</span>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-2">
        <span style={styles.listTitle}>Shoots:</span>
      </div>
      <div className="col-xl-10">
        <span style={styles.listItem}>{player.handedness}</span>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-2">
        <span style={styles.listTitle}>Role:</span>
      </div>
      <div className="col-xl-10">
        <span style={styles.listItem}>{player.player_roles}</span>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-2">
        <span style={styles.listTitle}>Ratings:</span>
      </div>
      <div className="col-xl-10">
        <span style={styles.listItem}>
          <span title="200-300-350" className={`${getCombinedColor(player.combined_rating)}`}>{player.combined_rating}</span>&nbsp;com /&nbsp;
          <span title="70-130-185" className={`${getTechnicalColor(player.technical_rating)}`}>{player.technical_rating}</span>&nbsp;tec /&nbsp;
          <span title="70-110-140" className={`${getMentalColor(player.mental_rating)}`}>{player.mental_rating}</span>&nbsp;men /&nbsp;
          <span title="60-80-94" className={`${getPhysicalColor(player.physical_rating)}`}>{player.physical_rating}</span>&nbsp;phy
        </span>
      </div>
    </div>
  </div>
);

export default Chart;
