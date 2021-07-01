import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { getCOMColor, getAOColor, getGrowthColor, convertCombined, getRatingColor } from 'utils';
import { getPlayers, getLists, getListsByKey, loadMessage, addPlayersToList, openModal, closeModal } from 'actions';
import { nhlTeams, tempGMList, grades } from '../../../../../constants';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { SelectRoles } from '../../../../../components/Search';


const mapStateToProps = state => {

  return ({
    players: state.player.search,
    personalLists: get(state, 'list.personal'),
    globalLists: get(state, 'list.global'),
    // lists: get(state, 'list.lists'),
    addPlayerToListStatus: get(state, 'modal.addPlayersToList'),
    userRole: get(state, 'user.jwt.role'),
  });
};

const mapDispatchToProps = dispatch => ({
  getPlayers: query => dispatch(getPlayers(query)),
  getLists: () => dispatch(getLists()),
  getListsByKey: key => {
    dispatch(getListsByKey(key));
  },
  showMessage: message => {
    dispatch(loadMessage(message));
  },
  addPlayer: data => {
    dispatch(addPlayersToList(data));
  },
  showModal: id => {
    dispatch(openModal(id));
  },
  hideModal: id => {
    dispatch(closeModal(id));
  },
});

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
  }
};

const defaultSearch = { order: 'combined_rating', positions_short: '', ageMin: 12, ageMax: 48, name: '', club_contracted: '', nation: '', position: '', role: '' };

class SelectSort extends React.Component {

  render () {

    const { onChange, order } = this.props;

    return (
      <SelectField
        name="order"
        autoWidth={false}
        floatingLabelText="Sort by..."
        style={{ width: '200px' }}
        value={order}
        onChange={onChange}
      >
        <MenuItem value="combined_rating" primaryText="Combined Rating" />
        <MenuItem value="technical_rating" primaryText="Technical Rating" />
        <MenuItem value="mental_rating" primaryText="Mental Rating" />
        <MenuItem value="physical_rating" primaryText="Physical Rating" />
        <MenuItem value="att_growth" primaryText="Attributes growth" />
        <MenuItem value="age_over" primaryText="Age / Over" />
      </SelectField>
    );
  }
};

class PlayerSearch extends Component {

  constructor (props) {
    super(props)

    this.state = {
      search: defaultSearch,
      lists: [],
      height: 0,
      openAddPlayerModal: false,
      openCreateListFromSearchModal: false,
    };
  }

  componentDidMount () {

    const searchString = localStorage.getItem('player_search');

    if (searchString) {
      this.setState({ search: JSON.parse(searchString) }, () => this.getPlayersByFilter());
    }

    this.props.getListsByKey('personal');
    this.props.getListsByKey('global');
  }

  ageSlider = () => {

    const { search } = this.state;

    return (
      <div>
        <div className="custom-slider">
          Age Min: {search.ageMin} <Slider style={{ width: '134px', marginBottom: '0px' }} name="min" min={12} max={48} step={1} value={search.ageMin} onChange={this.onChangeAgeMin} />
        </div>
        <div className="custom-slider">
          Age Max: {search.ageMax} <Slider style={{ width: '134px', marginBottom: '0px' }} name="max" min={12} max={48} step={1} value={search.ageMax} onChange={this.onChangeAgeMax} />
        </div>
      </div>
    );
  }

  getPlayersByFilter = () => {

    const { getPlayers } = this.props;
    const { search } = this.state;
    const playerName = search.name ? `|name:${search.name}` : '';
    const role = search.role ? `|player_roles:${search.role}` : '';
    const nation = search.nation ? `|nation:${search.nation}` : '';
    const team = search.club_contracted ? `|club_contracted:${search.club_contracted}` : '';
    const age = `age_between:${search.ageMin},${search.ageMax}`;
    const position = search.positions_short ?  `|positions_short:${search.positions_short}` : '';
    const newOrder = search.order ? `&order=${search.order}` : '';
    const noatts = '&noatts=true';
    const limit = '&limit=100'
    const params = `where=${age}${playerName}${nation}${position}${team}${role}${noatts}${newOrder}${limit}`;

    localStorage.setItem('player_search', JSON.stringify(search));

    getPlayers(params);
  }

  onChangeText = event => {

    const { search } = this.state;
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    search[fieldName] = fieldValue;

    this.setState(search, () => {
      this.getPlayersByFilter();
    })
  }

  onChangeRole = (event, index, value) => {

    const { search } = this.state;

    search.role = value;

    this.setState(search, () => {
      this.getPlayersByFilter();
    });
  }

  onChangeAgeMin = (e, value) => {

    const { search } = this.state

    if (value >= search.ageMax) {
      search.ageMin = search.ageMax + 1;
      search.ageMax = value;
    } else {
      search.ageMin = value;
    }

    this.setState(search, () => {
      this.getPlayersByFilter();
    });
  }

  onChangeAgeMax = (e, value) => {

    const { search } = this.state

    if (value <= search.ageMin) {
      search.ageMin = value;
      search.ageMax = search.ageMin - 1;
    } else {
      search.ageMax = value;
    }

    this.setState(search, () => {
      this.getPlayersByFilter();
    });
  }

  onChangeOrderBy = (event, index, value) => {

    const { search } = this.state

    search.order = value;
    this.setState(search, () => {
      this.getPlayersByFilter();
    });
  }

  onChangeRadio = (e, value) => {

    const { search } = this.state

    if (value === 'goalies') {
      search.positions_short = 'G';
    } else {
      delete search.positions_short;
    }

    this.setState(search, () => {
      this.getPlayersByFilter();
    });
  }

  clearHandler = e => {

    e.preventDefault();

    this.setState({ search: defaultSearch }, () => {
      this.getPlayersByFilter();
    });
  }

  setModal = (id, data) => {

    const { showModal } = this.props;

    this.setState({ ...data });
    showModal(id);
  }

  addPlayerModalWrapper = ({ title, body }) => {

    const { stagedPlayers, stagedList, teamSelection, gmSelection, gradeSelection } = this.state;
    const { addPlayerToListStatus, hideModal } = this.props;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => hideModal('addPlayersToList')}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onClick={() => this.addPlayerToList({ boidIds: stagedPlayers, listId: stagedList.id, selections: { teamSelection, gmSelection, gradeSelection } })}
      />,
    ];

    return (
      <div>
          <Dialog
            title={title}
            actions={actions}
            modal={true}
            contentStyle={{ borderRaduis: '20px', border: '1px solid rgb(46, 110, 115)', maxWidth: '50%' }}
            actionsContainerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', borderTop: '1px solid rgb(46, 110, 115)' }}
            titleStyle={{ color: 'rgb(159, 207, 223)', paddingBottom: '10px' }}
            open={addPlayerToListStatus}
          >
            {body}
        </Dialog>
      </div>
    )
  }

  addPlayerBody = () => {

    const { stagedPlayers, teamSelection, gmSelection, gradeSelection, stagedList } = this.state;
    const { lists, personalLists, globalLists, userRole } = this.props;
    const player = stagedPlayers && stagedPlayers[0];

    return (
      <div>
        <h4 style={{ textShadow: 'rgba(52, 163, 203, 0.4) 1px 1px 3px' }}>{player && player.name}</h4>
        <div style={{ display: 'flex' }}>

          { ['admin', 'super'].includes(userRole) &&
            <div style={{ marginRight: '25px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <h5>Global Lists</h5>
              { globalLists && globalLists.map(list => {

                const buttonClass = (stagedList && (list.id === stagedList.id)) ? 'selectedListButton' : 'listButton';

                return (
                  <div className={buttonClass}>
                    <button onClick={() => this.setState({ stagedList: list })}>{list.name}</button>
                  </div>
                )
              })}
            </div>
          }
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', paddingRight: '25px', borderRight: '1px solid rgb(46, 110, 115)' }}>
            <h5>Personal Lists</h5>
            { personalLists && personalLists.map(list => {

              const buttonClass = (stagedList && (list.id === stagedList.id)) ? 'selectedListButton' : 'listButton';

              return (
                <div className={buttonClass}>
                  <button onClick={() => this.setState({ stagedList: list })}>{list.name}</button>
                </div>
              )
            })}
          </div>

          <div style={{ margin: '10px 0px 0px 25px'  }}>
            { get(stagedList, 'captureTeam') &&
              <div>
                <SelectField
                  name="team"
                  autoWidth={false}
                  floatingLabelText="Team Association"
                  floatingLabelFixed={true}
                  hintText={`Choose team to associate ${player.name}`}
                  style={{ width: '400px' }}
                  value={teamSelection}
                  onChange={(e, i, teamSelection) => this.setState({ teamSelection })}
                >
                  <MenuItem value={null} primaryText="" />
                  { nhlTeams.map(team => <MenuItem value={team.short} primaryText={`${team.region} ${team.name}`} /> )}
                </SelectField>
              </div>
            }
            { get(stagedList, 'captureGM') &&
              <div>
                <SelectField
                  name="gm"
                  autoWidth={false}
                  floatingLabelText="GM Association"
                  hintText={`Select GM to associate ${player.name}`}
                  floatingLabelFixed={true}
                  style={{ width: '400px' }}
                  value={gmSelection}
                  onChange={(e, i, gmSelection) => this.setState({ gmSelection })}
                >
                  <MenuItem value={null} primaryText="" />
                  { tempGMList.map(gm => <MenuItem value={gm} primaryText={gm} /> )}
                </SelectField>
              </div>
            }
            { get(stagedList, 'captureGrade') &&
              <div>
                <SelectField
                  name="grade"
                  autoWidth={false}
                  floatingLabelText="Grade Association"
                  floatingLabelFixed={true}
                  hintText={`Grade ${player.name}`}
                  style={{ width: '220px' }}
                  value={gradeSelection}
                  onChange={(e, i, gradeSelection) => this.setState({ gradeSelection })}
                >
                  <MenuItem value={null} primaryText="" />
                  { grades.map(grade => <MenuItem value={grade} primaryText={grade} /> )}
                </SelectField>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  // TODO placeholder, implement feature
  createListFromSearchModalWrapper = ({ title, open, body }) => {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.setModal({ openCreateListFromSearchModal: false })}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={() => this.setModal({ openCreateListFromSearchModal: true })}
      />,
    ];

    return (
      <div>
          <Dialog
            title={title}
            actions={actions}
            modal={true}
            open={open}
            style={{ overflowY: 'scroll' }}
          >
            {body}
        </Dialog>
      </div>
    )
  }

  addPlayerToList = ({ boidIds, listId, selections }) => {

    const { addPlayer, getListsByKey } = this.props;

    addPlayer({ listId, ids: [boidIds[0].id], selections });

    // TODO should prolly happen at saga level
    getListsByKey('personal');
    getListsByKey('global');
  }

  render () {

    const { search, openAddPlayerModal, openCreateListFromSearchModal, lists } = this.state;
    const { players, isAuthed } = this.props;
    const playerType = search.positions_short === 'G' ? 'goalies' : 'players';

    if (!isAuthed()) { return <div style={{ padding: '20px 0px 0px 30px' }}>Not Authenticated</div> };

    return (
      <div style={ styles.body }>

        { lists && this.addPlayerModalWrapper({ title: 'Select a list to add player', open: openAddPlayerModal, body: this.addPlayerBody() }) }
        { this.createListFromSearchModalWrapper({ title: 'Create List From Search', open: openCreateListFromSearchModal, body: <div>body content</div> }) }

        <div>
          <div className="row" style={{ border: '0px 0px 40px 0px', borderRight: '1px solid rgb(46, 110, 115)', borderBottom: '1px solid rgb(46, 110, 115)', paddingBottom: '0px', boxShadow: '0px 13px 56px -13px rgba(0,0,0,0.35)', margin: "0px -25px 0px -25px" }}>
            <div className="search-pod-container" style={{ padding: '12px 30px 0px 30px' }}>
              <div className="search-pod">
                <SelectSort onChange={this.onChangeOrderBy} order={search.order} />
              </div>
              <div className="search-pod">
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
              <div className="search-pod">
                {this.ageSlider()}
              </div>
              <div className="search-pod">
                <TextField
                  onChange={this.onChangeText}
                  name="name"
                  autoFocus
                  value={search.name}
                  hintText="Name"
                  style={{ marginRight: 20, width: '200px' }}
                />
              </div>
              <div className="search-pod">
                <TextField
                  onChange={this.onChangeText}
                  name="club_contracted"
                  value={search.club_contracted}
                  hintText="Team"
                  style={{ width: '200px' }}
                />
              </div>
              <div className="search-pod">
                <TextField
                  floatingLabelText="Position"
                  onChange={this.onChangeText}
                  name="positions_short"
                  value={search.positions_short}
                  style={{ marginTop: '-23px', width: '200px' }}
                  hintText="Use: c, lw, rw, ld, rd, g"
                />
              </div>
              <div className="search-pod">
                <TextField
                  onChange={this.onChangeText}
                  name="nation"
                  autoFocus
                  value={search.nation}
                  hintText="Nation"
                  style={{ marginRight: 20, width: '200px' }}
                />
              </div>
              <div className="search-pod">
                <SelectRoles onChange={this.onChangeRole} role={search.role} />
              </div>
            </div>
            <div style={{ height: '49px', position: 'relative', borderTop: '1px solid rgb(46, 110, 115)', borderBottom: '1px solid rgb(46, 110, 115)', margin: '10px 0px 0px 0px', padding: '6px 30px 5px 30px', backgroundColor: 'rgba(0,0,0,0.35)', width: '100%' }}>

              <FlatButton style={{ minWidth: '30px', paddingRight: '5px' }}>
                <div onClick={this.clearHandler} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <i className="nav-icon material-icons" style={{ color: '#1ecbce', padding: '0px 5px 0px 10px' }}>highlight_off</i><span style={{ paddingRight: '10px' }}>Clear Search</span>
                </div>
              </FlatButton>

              <FlatButton style={{ minWidth: '30px', paddingRight: '5px' }}>
                <div onClick={e => { this.setModal({ openCreateListFromSearchModal: true }) }} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {/* <i className="nav-icon material-icons" style={{ color: '#1ecbce', padding: '0px 5px 0px 10px' }}>playlist_add</i><span style={{ paddingRight: '10px' }}>Create List From Search</span> */}
                </div>
              </FlatButton>
            </div>
          </div>
        </div>

        <div className="player-table-container" style={{ overflowX: 'auto', marginLeft: '20px', position: 'relative' }}>
          { players ?
            <table className="player-search-table" style={{ minWidth: '1700px', maxWidth: '100%', margin: '20px 0px 20px 0px' }}>
                <thead style={{ fontSize: '14px', color: '#A3C3C6' }}>
                  { players &&
                    <tr >
                      <th />
                      <th style={{ paddingLeft: '210px' }} className="numeric">COM</th>
                      <th className="numeric">A/O</th>
                      <th className="numeric">GROW</th>
                      <th className="numeric">TECH</th>
                      <th className="numeric">MEN</th>
                      <th className="numeric">PHY</th>
                      <th className="numeric">Role</th>
                      <th className="numeric">Age</th>
                      <th className="numeric">Nation</th>
                      <th className="numeric">Contracted</th>
                      <th className="numeric">Positions</th>
                    </tr>
                  }
                </thead>

                <tbody style={{ flex: 1 }} className="player-list">
                  { players && players.map(player => {

                      const technicalRating = convertCombined(player.technical_rating, 'technical');
                      const mentalRating = convertCombined(player.mental_rating, 'mental');
                      const physicalRating = convertCombined(player.physical_rating, 'physical');

                      return (
                        <tr key={player.id}>
                          <td style={{ height: '28px', display: 'flex', borderRight: '1px solid rgb(32, 80, 83)', borderLeft: '1px solid rgb(32, 80, 83)', width: '205px', margin: '0px 15px 0px 0px', paddingRight: '5px', paddingLeft: '5px', position: 'absolute', background: 'rgba(28, 57, 73, 1)' }}>

                            <FlatButton onClick={e => { this.setModal('addPlayersToList', { stagedPlayers: [{ id: player.id, name: player.name }] }) }} style={{ minWidth: '30px', marginRight: '5px', height: '24px' }}>
                              <i className="nav-icon material-icons" style={{ color: '#1ecbce' }}>playlist_add</i>
                            </FlatButton>

                            <div style={{ width: '205px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                              <a href={`#/app/playerdetail/${player.id}`}>
                                <b>{player.name}</b>
                              </a>
                            </div>
                          </td>
                          <td style={{ paddingLeft: '210px', width: '270px' }} className={`numeric ${getCOMColor(player.combined_rating)}`}>{player.combined_rating}</td>
                          <td className={`numeric ${getAOColor(player.age_over)}`}>{player.age_over && player.age_over.toFixed(2)}</td>
                          <td className={`numeric ${getGrowthColor(player.att_growth)}`}>{player.att_growth}</td>
                          <td className={`numeric ${getRatingColor(technicalRating)}`}>{technicalRating}</td>
                          <td className={`numeric ${getRatingColor(mentalRating)}`}>{mentalRating}</td>
                          <td className={`numeric ${getRatingColor(physicalRating)}`}>{physicalRating}</td>
                          <td className="numeric">{player.player_roles}</td>
                          <td className="numeric">{player.age}</td>
                          <td className="numeric">{player.nation}</td>
                          <td className="numeric">{player.club_contracted}</td>
                          <td className="numeric">{player.positions_short}</td>
                        </tr>
                      )
                    }
                )}
                </tbody>
            </table>
          :
            <div style={{ padding: '10px' }}>Loading...</div>
          }
        </div>
      </div>
    )
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerSearch);
