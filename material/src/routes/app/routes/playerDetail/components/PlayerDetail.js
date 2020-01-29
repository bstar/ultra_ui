import React, { Component } from 'react';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import { getPlayer } from 'actions';
import PlayerAttributes from './PlayerAttributes';
import StatBoxes from './StatBoxes';
import PlayerLineChart from './PlayerLineChart';
import CombinedPlayerLineChart from './CombinedPlayerLineChart';
import PlayerPersonalInfo from './PlayerPersonalInfo';
import PlayerHeading from './PlayerHeading';


const mapStateToProps = state => {

  return ({
    playerMap: state.player,
    attributesMap: state.attribute,
  });
};

const mapDispatchToProps = dispatch => ({
  getPlayerById: id => {
    dispatch(getPlayer({ id }));
  }
});

class Main extends Component {

  constructor (props) {

    super(props);

    this.state = {
      player: {},
      attribtues: {},
      metrics: { total: 0 },
    }
  }

  componentDidMount () {

    const { playerId, getPlayerById } = this.props;

    getPlayerById(playerId);
  }

  render () {

    const { playerMap, attributesMap, playerId } = this.props;

    const player = playerMap[playerId];
    const attributes = attributesMap[playerId];

    if (!player) return (<span></span>);

    return (
      <div>
        <div className="row>">
          <div className="col-xl-12">
              <PlayerHeading player={player} />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4">
            <div className="box box-default">
              <div className="box-body">
                <PlayerPersonalInfo
                  dob={player.dob}
                  age={player.age}
                  birth_town={player.birth_town}
                  nation={player.nation}
                  handedness={player.handedness}
                  player_roles={player.player_roles}
                  combined_rating={player.combined_rating}
                  technical_rating={player.technical_rating}
                  mental_rating={player.mental_rating}
                  physical_rating={player.physical_rating}
                  attributes={attributes} />
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="box box-default">
              <div className="box-body">
                <PlayerAttributes attributes={attributes} position={player.positions_short} playerRoles={player.player_roles} />
              </div>
            </div>
          </div>
        </div>
        <StatBoxes player={player} />
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <CombinedPlayerLineChart attributes={attributes} />
          </div>
          <div className="col-xl-6 col-lg-6">
            <PlayerLineChart attributes={attributes} />
          </div>
        </div>
      </div>
    )
  }
}

const PlayerDetail = ({ match, getPlayerById, playerMap, attributesMap }) => {

  return (
    <div className="container-fluid no-breadcrumbs page-dashboard">
      <QueueAnim type="bottom" className="ui-animate">
        <Main playerId={match.params.playerId} getPlayerById={getPlayerById} playerMap={playerMap} attributesMap={attributesMap} />
      </QueueAnim>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerDetail);