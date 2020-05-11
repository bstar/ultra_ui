import React from 'react';
import { get } from 'lodash';
import ReactImageFallback from 'react-image-fallback';

import { leagueConversionMap } from '../../../../../constants';


const styles = {
  smallHead: {
    fontSize: '18px',
  },
  logo: {
    maxWidth: '100%',
    maxHeight: '100px',
    padding: '5px 10px 15px',
    marginLeft: '0px',
    filter: 'drop-shadow(5px 8px 7px rgba(0,0,0,.3))',
  },
  countryImg: {
    padding: '0px 10px 0px 0px',
    margin: '0px',
  },
  nameText: {
    textShadow: '1px 1px 3px rgba(52, 163, 203,.4)',
    margin: '10px 0px 0px 10px',
  },
  teamText: {
    textShadow: '1px 1px 3px rgba(0,0,0,.4)',
    margin: '0px 0px 10px 10px',
  }
};

const PlayerHeading = ({ player, fallbackImage }) => (

  <div className="row" style={{ minHeight: '100px', marginTop: '-10px' }}>
    <div>
      <ReactImageFallback
        src={`assets/img/clubs/huge/${leagueConversionMap[player.division_playing] || player.division_playing}/${get(player, 'club_playing', '').toLowerCase()}.png`}
        fallbackImage={fallbackImage}
        style={ styles.logo } />
    </div>

    { player.ehm_id &&
      <div>
        <h3 style={{ ...styles.nameText }}>
          { player.name } <span style={styles.smallHead}>({player.positions_short})</span>
        </h3>
        <h4 style={{ ...styles.teamText }}>
          {player.club_contracted} <span style={styles.smallHead}> #{player.ehm_id} #{player.id}</span>
        </h4>
      </div>
    }
  </div>
);

PlayerHeading.defaultProps = {
  fallbackImage: 'assets/img/default-team.png',
}

export default PlayerHeading;
