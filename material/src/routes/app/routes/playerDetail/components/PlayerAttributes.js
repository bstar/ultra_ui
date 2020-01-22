import React from 'react';
import styles from './styles.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import roleData from '../../../../../config/roles.json';


const getGrowthSymbol = (current, previous) => {
  if (current > previous) {
    // return <span style={{ color: '#ccc', fontSize: '8px' }} className="glyphicon-chevron-up-custom">&nbsp;</span>;
    return <i style={{ color: '#ccc', fontSize: '16px', fontWeight: 600 }} className="material-icons">keyboard_arrow_up</i>;

  }

  if (current < previous) {
    return <i style={{ color: 'rgb(228, 26, 26)', fontSize: '16px', fontWeight: 600 }} className="material-icons">keyboard_arrow_down</i>;
  }

  return <i style={{ color: '#ccc', fontSize: '16px', visibility: 'hidden' }} className="material-icons">keyboard_arrow_left</i>;
};


const roleMap = {
  "(W) Enforcer": "enforcer",
  "(C) Enforcer": "enforcer",
  "(D) Offensive (Finesse)": "offensive_finesse",
  "(W) Finesse": "finesse",
  "(C) Finesse": "finesse",
  "(W) Sniper": "sniper",
  "(C) Power Forward": "power_forward",
  "(C) Defensive": "defensive",
  "(C) Defensive (Physical)": "defensive_physical",
  "(W) Defensive": "defensive",
  "(C) All around": "all_around",
  "(W) Playmaker (Physical)": "playmaker_physical",
  "(W) All around": "all_around",
  "(D) All around": "all_around",
  "(W) Playmaker": "playmaker",
  "(C) Playmaker": "playmaker",
  "(C) Playmaker (Finesse)": "playmaker_finesse",
  "(W) Playmaker (Finesse)": "playmaker_finesse",
  "(W) Sniper (Physical)": "sniper_physical",
  "(C) Sniper": "sniper",
  "(C) Sniper (Finesse)": "sniper_finesse",
  "(W) Sniper (Finesse": "sniper_finesse",
  "(W) Power Forward": "power_forward",
  "(D) Offensive": "offensive",
  "(D) Playmaker (Finesse)": "playmaker_finesse",
  "(D) Playmaker": "playmaker",
  "(D) Defensive (Finesse)": "defensive_finesse",
  "(D) Pointman (Physical)": "pointman_physical",
  "(D) Offensive (Physical)": "offensive_physical",
  "(C) Playmaker (Physical)": "playmaker_physical",
  "(D) Defensive (Physical)": "defensive_physical",
  "(C) Sniper (Physical)": "sniper_physical",
  "(W) Defensive (Finesse)": "defensive_finesse",
  "(W) Grinder": "grinder",
  "(C) Grinder": "grinder",
  "(D) Standard": "standard",
  "(D) Defensive": "defensive",
  "(D) Pointman": "pointman",
  "(D) Rugged": "rugged",
  "(D) Pointman (Finesse)": "pointman_finesse",
  "(C) Defensive (Finesse)": "defensive_finesse",
  "(W) Defensive (Physical)": "defensive_physical",
  "(G) Butterfly style": "butterfly",
  "(G) Hybrid style": "mixed",
  "(G) Acrobatic style": "unorthodox",
};

const playerTypeMap = {
  RW: 'offence',
  LW: 'offence',
  C: 'offence',
  RD: 'defence',
  LD: 'defence',
  G: 'goalie',
}

const roleMapping = {
  primary: 'callout-info',
  secondary: 'callout-success',
  tertiary: 'callout-warning',
  useless: 'callout-danger'
}

const technicalAttsPlayer = [
  'checking',
  'deflections',
  'deking',
  'faceoffs',
  'hitting',
  'off the puck',
  'passing',
  'pokecheck',
  'positioning',
  'slapshot',
  'stickhandling',
  'wristshot'
];

const technicalAttsGoalie = [
  'blocker',
  'glove',
  'passing',
  'pokecheck',
  'positioning',
  'rebound control',
  'recovery',
  'reflexes',
  'stickhandling'
];

const mentalAtts = [
  'aggression',
  'anticipation',
  'bravery',
  'creativity',
  'determination',
  'flair',
  'influence',
  'teamwork',
  'work rate'
]

const physicalAtts = [
  'acceleration',
  'agility',
  'balance',
  'speed',
  'stamina',
  'strength'
]

const role = 'enforcer';

const getAttributeColor = (rating) => {
  if (rating < 7) {
    return 'red';
  }

  if (rating < 12) {
    return 'orange';
  }

  if (rating < 17) {
    return 'green';
  }

  return 'blue';
}

class SelectFieldExampleSimple extends React.Component {

  render () {

    const { attributes, cursor, handleChange } = this.props;

    return (
          <div>
            <SelectField
              floatingLabelText="Snapshot Date"
              value={cursor}
              onChange={handleChange}
              style={{ width: 260 }}
            >
              {attributes.map((attribute, i) => {
                return (<MenuItem key={i} value={i} primaryText={`${attribute.game_date} - [ ${attribute.att_growth} ]`} />);
              })}
            </SelectField>
          </div>
    );
  }
}

// const Attributes = ({ attributes }) => {
class Attributes extends React.Component {

  state = { cursor: null };

  handleChange = (event, index, value) => {

    this.setState({ cursor: value });
  }

  getRoleStyle = (playerRoles, playerType, att) => {

    try {
      const primaryRoles = playerRoles && roleData[playerType][roleMap[playerRoles]].primary;
      const secondaryRoles = playerRoles && roleData[playerType][roleMap[playerRoles]].secondary;
      const tertiaryRoles = playerRoles && roleData[playerType][roleMap[playerRoles]].tertiary;
      const uselessRoles = playerRoles && roleData[playerType][roleMap[playerRoles]].useless;

      if (primaryRoles && primaryRoles.includes(att)) {
        return roleMapping['primary'];
      }
      if (secondaryRoles && secondaryRoles.includes(att)) {
        return roleMapping['secondary'];
      }
      if (tertiaryRoles && tertiaryRoles.includes(att)) {
        return roleMapping['tertiary'];
      }
      if (uselessRoles && uselessRoles.includes(att)) {
        return roleMapping['useless'];
      }
    } catch(e) {

      return '';
    }
  }

  render () {

    const { attributes, position, playerRoles } = this.props;

    console.log("ATTRIBUTES", attributes)
    const { cursor } = this.state;
    const currentCursor = cursor !== null ? cursor : attributes.length - 1;
    const selectedAttributes = attributes[currentCursor];
    const previousAttributes = attributes[currentCursor > 0 ? currentCursor-1 : 0];
    const technicalAtts = (position === 'G') ? technicalAttsGoalie : technicalAttsPlayer;
    const playerType = position && playerTypeMap[position.match(/(^[a-zA-Z]*)/)[1]];
    const showRole = true;

    return (
      <div>
        <div className={`row ${styles.txt}`}>
          <div className="col-xl-4 col-lg-6">
            <h6>Technical</h6>

            {technicalAtts.map((att, i) => {
              const rating = selectedAttributes[att.replace(/ /g, '_')];
              const previousRating = previousAttributes[att.replace(/ /g, '_')];
              const roleStyle = this.getRoleStyle(playerRoles, playerType, att);

              return (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.05)', fontSize: '16px', textShadow: '1px 1px 3px rgba(0,0,0,.4)' }} className={`callout callout-container ${showRole && roleStyle}`}>
                  <div className="callout-data callout-left">{att}</div>
                  <div className={`callout-data callout-right ${getAttributeColor(rating)}`}>
                    {rating} {getGrowthSymbol(rating, previousRating)}
                  </div>
                </div>
              );
            })}

          </div>
          <div className="col-xl-4 col-lg-6">
            <h6>Mental</h6>

            {mentalAtts.map((att, i) => {
              const rating = selectedAttributes[att.replace(/ /g, '_')];
              const previousRating = previousAttributes[att.replace(/ /g, '_')];
              const roleStyle = this.getRoleStyle(playerRoles, playerType, att)

              return (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.05)', fontSize: '16px', textShadow: '1px 1px 3px rgba(0,0,0,.4)' }} className={`callout callout-container ${showRole && roleStyle}`}>
                  <div className="callout-data callout-left">{att}</div>
                  <div className={`callout-data callout-right ${getAttributeColor(rating)}`}>
                    {rating} {getGrowthSymbol(rating, previousRating)}
                  </div>
                </div>
              )
            })}

          </div>
          <div className="col-xl-4 col-lg-6">
            <h6>Physical</h6>

            {physicalAtts.map((att, i) => {
              const rating = selectedAttributes[att.replace(/ /g, '_')];
              const previousRating = previousAttributes[att.replace(/ /g, '_')];
              const roleStyle = this.getRoleStyle(playerRoles, playerType, att)

              return (
                <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.05)', fontSize: '16px', textShadow: '1px 1px 3px rgba(0,0,0,.4)' }} className={`callout callout-container ${showRole && roleStyle}`}>
                  <div className="callout-data callout-left">{att}</div>
                  <div className={`callout-data callout-right ${getAttributeColor(rating)}`}>
                    {rating} {getGrowthSymbol(rating, previousRating)}
                  </div>
                </div>
              )
            })}

          </div>
          {/* <div className="row">
            <div className="col-xl-1 col-lg-6">
            </div>
          </div> */}
        </div>

        <div className="row" style={{ float: 'right', marginTop: '-60px' }}>
          <SelectFieldExampleSimple style={{ width: 300 }} attributes={attributes} cursor={currentCursor} handleChange={this.handleChange} />
        </div>

      </div>
    )
  }
};

// Attributes.propTypes = {
//     playerAttributes: PropTypes.object.isRequired,
// };

Attributes.defaultProps = {
    attributes: [{}],
};


export default Attributes;
