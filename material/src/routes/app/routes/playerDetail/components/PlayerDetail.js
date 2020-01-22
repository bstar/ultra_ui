import React, { Component } from 'react';
import { withRouter } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import PlayerAttributes from './PlayerAttributes';
import StatBoxes from './StatBoxes';
import PlayerLineChart from './PlayerLineChart';
import CombinedPlayerLineChart from './CombinedPlayerLineChart';
import PlayerPersonalInfo from './PlayerPersonalInfo';
import PlayerHeading from './PlayerHeading';
import { leagues } from '../../../../../config/index.json'; // scope this better


class Main extends Component {

  constructor (props) {

    super(props);

    this.state = {
      player: {},
      attribtues: {},
      metrics: { total: 0 }
    }
  }

  componentDidMount () {

    const { playerId } = this.props;
    const leagueId = localStorage.getItem('league_id');
    const league = leagues[leagueId];

    if (league) { // league_id is loaded from local storage
      const url = `http://${league.address}/boid/${playerId}?noatts=true`;

      fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      })
        .then(response => response.json())
        .then((response) => {

          this.setState({ player: response });
        })
    }
  }

  componentDidUpdate () {

    const leagueId = localStorage.getItem('league_id');
    const league = leagues[leagueId]
    const id = this.state.player.id;

    if (id && !this.state.attributes) {
      const url = `http://${league.address}/attributes?where=boidId:${id}`;

      fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      })
        .then(response => response.json())
        .then(attributes => {

          this.setState({ attributes });
        })
    }
  }

  render () {

    const { player, attributes } = this.state;

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

const PlayerDetail = ({ match }) => {

  return (
    <div className="container-fluid no-breadcrumbs page-dashboard">
      <QueueAnim type="bottom" className="ui-animate">
        <Main playerId={match.params.playerId} />
      </QueueAnim>
    </div>
  );
};

export default withRouter(PlayerDetail);
