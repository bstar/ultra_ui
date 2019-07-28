import React, { Component } from 'react';
import {withRouter} from 'react-router';
import QueueAnim from 'rc-queue-anim';
import LinearProgress from 'material-ui/LinearProgress';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { leagues } from '../../../../../config/index.json';



const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  body: {
    width: '100%',
    fontFamily: 'Courier, Monaco, monospace',
  },
  search: {
    background: 'url(assets/images/6.png)',
    position: 'fixed',
    width: '100%',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    paddingTop: '20px',
  }
};

const defaultSearch = { ageMin: 12, ageMax: 48, name: '', club_contracted: '' };

class SelectFieldExampleSimple extends React.Component {

  render () {

    const { onChange, order } = this.props;

    return (
          <div>
            <SelectField
              name="order"
              autoWidth={false}
              style={{ width: '285px'}}
              floatingLabelText="Sort by..."
              value={order}
              onChange={onChange}
            >
              <MenuItem value="combined_rating" primaryText="Combined Rating" />
              <MenuItem value="technical_rating" primaryText="Technical Rating" />
              <MenuItem value="mental_rating" primaryText="Mental Rating" />
              <MenuItem value="physical_rating" primaryText="Physical Rating" />
              <MenuItem value="att_growth" primaryText="Attributes growth" />
            </SelectField>
          </div>
    );
  }
}

class Main extends Component {

  constructor (props) {

    super(props)

    this.state = {
      players: null,
      search: defaultSearch,
      height: 0,
    }

    this.getPlayersByFilter = this.getPlayersByFilter.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
    this.onChangeAgeMin = this.onChangeAgeMin.bind(this);
    this.onChangeAgeMax = this.onChangeAgeMax.bind(this);
    this.ageSlider = this.ageSlider.bind(this);
    this.onChangeOrderBy = this.onChangeOrderBy.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
  }

  componentWillMount () {
    const searchString = localStorage.getItem('player_search');

    if (searchString) {
      this.setState({ search: JSON.parse(searchString) }, () => {
        this.getPlayersByFilter();
      });
    }
  }

  ageSlider () {

    const { search } = this.state;

    return (
      <div className="row">
        <div className="col-lg-5">
          Min Age: {search.ageMin} <Slider style={{ width: '200px' }} name="min" min={12} max={48} step={1} value={search.ageMin} onChange={this.onChangeAgeMin} />
        </div>
        <div className="col-lg-4">
          Max Age: {search.ageMax} <Slider style={{ width: '200px' }} name="max" min={12} max={48} step={1} value={search.ageMax} onChange={this.onChangeAgeMax} />
        </div>
      </div>
    );
  }

  getPlayersByFilter () {

    const leagueId = localStorage.getItem('league_id');
    const league = leagues[leagueId];

    const { search } = this.state;
    const newOrder = search.order ? `&order=${search.order}` : '';
    const noatts = '&noatts=true';
    const limit = '&limit=100'

    const playerName = search.name ? `|name:${search.name}` : '';
    const team = search.club_contracted ? `|club_contracted:${search.club_contracted}` : '';
    const age = `age_between:${search.ageMin},${search.ageMax}`;
    const position = search.positions_short ?  `|positions_short:${search.positions_short}` : '';

    localStorage.setItem('player_search', JSON.stringify(search));

    if (league) { // league_id is loaded from local storage
      const url = league && `http://${league.address}/boids?where=${age}${playerName}${position}${team}${noatts}${newOrder}${limit}`;

      fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' }
      })
        .then(response => response.json())
        .then((response) => {
          this.setState({ players: response });
        })
    }
  }

  onChangeText (event) {

    const { search } = this.state;
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    search[fieldName] = fieldValue;

    this.setState(search, () => {
      this.getPlayersByFilter();
    })
  }

  onChangeAgeMin (e, value) {

    const { search } = this.state

    if (value >= search.ageMax) {
      search.ageMin = search.ageMax + 1;
      search.ageMax = value;
    } else {
      search.ageMin = value;
    }

    this.setState(search, () => {
      this.getPlayersByFilter();
    })
  }

  onChangeAgeMax (e, value) {

    const { search } = this.state

    if (value <= search.ageMin) {
      search.ageMin = value;
      search.ageMax = search.ageMin - 1;
    } else {
      search.ageMax = value;
    }

    this.setState(search, () => {
      this.getPlayersByFilter();
    })
  }

  onChangeOrderBy (event, index, value) {

    const { search } = this.state

    search.order = value;
    this.setState(search, () => {
      this.getPlayersByFilter();
    })
  }

  onChangeRadio (e, value) {

    const { search } = this.state
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (value === 'goalies') {
      search.positions_short = 'G';
    } else {
      delete search.positions_short;
    }

    this.setState(search, () => {
      this.getPlayersByFilter();
    })
  }

  clearHandler (e) {

    e.preventDefault();

    this.setState({ search: defaultSearch }, () => {
      this.getPlayersByFilter();
    })
  }

  render () {

    const { players, loading, name, club_contracted, onChangeOrderBy, order, search } = this.state;
    const playerType = search.positions_short === 'G' ? 'goalies' : 'players';

    return (
      <div style={ styles.body }>

        <div style={styles.search}>
          <div className="row" style={{ border: '0px 0px 40px 0px', borderBottom: '1px solid rgb(46, 110, 115)', paddingBottom: '20px', boxShadow: '0px 13px 56px -13px rgba(0,0,0,0.35)' }}>
            <div className="col-xl-3">

              <div style={{ marginBottom: '15px' }}>
                <SelectFieldExampleSimple onChange={this.onChangeOrderBy} order={search.order} />
              </div>

              <RadioButtonGroup name="playerType" defaultSelected={playerType} onChange={this.onChangeRadio}>
                <RadioButton
                  style={{maxWidth: 250}}
                  value="players"
                  label="Players"
                />
                <RadioButton
                  style={{maxWidth: 250}}
                  value="goalies"
                  label="Goalies"
                />
              </RadioButtonGroup>


            </div>
            <div className="col-xl-4">

              {this.ageSlider()}

              <TextField
                onChange={this.onChangeText}
                name="name"
                autoFocus
                value={search.name}
                hintText="Enter Player Name"
                style={{ marginRight: 20, width: '200px' }}
              />

              <TextField
                onChange={this.onChangeText}
                name="club_contracted"
                value={search.club_contracted}
                hintText="Enter Team Name"
                style={{ width: '200px' }}
              />
            </div>
            <div className="col-xl-4">
              <TextField
                floatingLabelText="Filter by Position"
                onChange={this.onChangeText}
                name="positions_short"
                value={search.positions_short}
                hintText="Use: c, lw, rw, ld, rd, g"
              />

            </div>

            <div className="col-xl-2">
              <a style={{ fontSize: '12px', fontFamily: 'arial' }} href="#" onClick={this.clearHandler}>Clear</a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '220px'}}>
          <table id ="someDiv" style={{ width: '100%', margin: '20px 0px 20px 0px' }}>
              <thead style={{ width: '100%', fontSize: '16px', color: '#A3C3C6' }}>
                { players &&
                  <tr >
                    <th>Name</th>
                    <th className="numeric">Combined</th>
                    <th className="numeric">Technical</th>
                    <th className="numeric">Mental</th>
                    <th className="numeric">Physical</th>
                    <th className="numeric">Role</th>
                    <th className="numeric">Growth</th>
                    <th className="numeric">Age</th>
                    <th className="numeric">Nation</th>
                    <th className="numeric">Contracted</th>
                    <th className="numeric">Positions</th>
                  </tr>
                }
              </thead>

              <tbody style={{ flex: 1, width: '100%' }} className="player-list">
                { players && players.map(player =>
                  <tr>
                    <td><a href={`#/app/playerdetail/${player.id}`}><b>{player.name}</b></a></td>
                    <td className="numeric">{player.combined_rating}</td>
                    <td className="numeric">{player.technical_rating}</td>
                    <td className="numeric">{player.mental_rating}</td>
                    <td className="numeric">{player.physical_rating}</td>
                    <td className="numeric">{player.player_roles}</td>
                    <td className="numeric">{player.att_growth}</td>
                    <td className="numeric">{player.age}</td>
                    <td className="numeric">{player.nation}</td>
                    <td className="numeric">{player.club_contracted}</td>
                    <td className="numeric">{player.positions_short}</td>
                  </tr>
              )}
              </tbody>
          </table>
        </div>
      </div>
    )
  }
};

const Page = () => (
  <section className="container-fluid">
      <div key="2">
        <Main />
      </div>
  </section>
);

export default Page;
