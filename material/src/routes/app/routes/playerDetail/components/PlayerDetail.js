import React, { Component } from 'react';
import { withRouter } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import KPIsChart from './KPIsChart';
import PlayerStrengthsChart from './PlayerStrengthsChart';
import PlayerAttributes from './PlayerAttributes';
import StatBoxes from './StatBoxes';
import EngagementStats from './EngagementStats';
import BenchmarkChart from './BenchmarkChart';
import DonutChart from './DonutChart';
import LineChart from './LineChart';
import CombinedChart from './CombinedChart';
import PlayerPersonalInfo from './PlayerPersonalInfo';
import PlayerHeading from './PlayerHeading';
import { leagues } from '../../../../../config/index.json';

const league = leagues[0];

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
    const domain = window && window.config && window.config.domain || '192.168.86.108'; //'localhost';
    const port = window && window.config && window.config.port || 5150; //10010;

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
                <PlayerPersonalInfo player={player} attributes={attributes} />
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
            <CombinedChart player={player} attributes={attributes} />
          </div>
          <div className="col-xl-6 col-lg-6">
            <LineChart player={player} attributes={attributes} />
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
