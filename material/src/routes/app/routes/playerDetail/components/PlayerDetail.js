import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import PlayerRadarChart from './PlayerRadarChart';
import QueueAnim from 'rc-queue-anim';
import { getPlayer } from 'actions';
import PlayerAttributes from './PlayerAttributes';
import StatBoxes from './StatBoxes';
import PlayerLineChart from './PlayerLineChart';
import PlayerLists from './PlayerLists'
import CombinedPlayerLineChart from './CombinedPlayerLineChart';
import PlayerPersonalInfo from './PlayerPersonalInfo';
import PlayerHeading from './PlayerHeading';


const mapStateToProps = state => {

  return ({
    playerMap: state.player,
    attributesMap: state.attribute,
    lists: get(state, 'list.lists'),
    username: get(state, 'user.jwt.id'),
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

    const { playerMap, attributesMap, playerId, username } = this.props;
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
            <div className="box box-default" style={{ overflow: 'hidden', marginBottom: '15px' }}>
              <div className="box-body">
                <PlayerPersonalInfo
                  lists={player.lists}
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
                  positions_short={player.positions_short}
                  stanley_cups_won={player.stanley_cups_won}
                  iss_ranking={player.iss_ranking}
                  draft_ranking={player.draft_ranking}
                  attributes={attributes} />
              </div>
            </div>
            <div>
              <div className="box box-default" style={{ overflow: 'hidden' }}>
                <div className="box-body">
                  <PlayerLists lists={player.lists} username={username} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="box box-default">
              <div className="box-body" style={{ height: '423px' }}>
                <PlayerAttributes attributes={attributes} position={player.positions_short} playerRoles={player.player_roles} />
              </div>
            </div>
          </div>
        </div>
        <StatBoxes player={player} />
        <div className="row">
          <div className="col-xl-2 col-lg-2">
            <div style={{ height: '100%' }}>
                <PlayerRadarChart position={player.positions_short} attributes={attributes} />
            </div>
          </div>
          <div className="col-xl-5 col-lg-5">
            Combined Growth
            <CombinedPlayerLineChart attributes={attributes} />
          </div>
          <div className="col-xl-5 col-lg-5">
            Technical / Mental / Physical Growth
            <PlayerLineChart attributes={attributes} />
          </div>
        </div>
      </div>
    )
  }
};

const PlayerDetail = ({ match, getPlayerById, playerMap, attributesMap, lists, isAuthed, username }) => {

  if (!isAuthed()) { return <div style={{ padding: '20px 0px 0px 30px' }}>Not Authenticated</div> };

  return (
    <div className="container-fluid no-breadcrumbs page-dashboard">
      <QueueAnim type="bottom" className="ui-animate">
        <Main isAuthed={isAuthed} playerId={match.params.playerId} getPlayerById={getPlayerById} playerMap={playerMap} attributesMap={attributesMap} lists={lists} username={username} />
      </QueueAnim>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerDetail);
