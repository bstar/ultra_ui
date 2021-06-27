import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import roleData from '../../../../../config/roles.json';
import {
  roleMap,
  roleMapping,
  playerTypeMap,
  technicalAttsPlayer,
  technicalAttsGoalie,
  mentalAtts,
  physicalAtts,
  getAttributeColor,
} from 'utils';

const colorMap = {
  0: { color: '#ccc' }, // white
  1: { color: '#3cae3c' }, // green
  2: { color: '#5895d2' }, // blue
  3: { color: '#ff1cff' }, // purple
  4: { color: '#ff1cff' }, // purple
  5: { color: '#ff1cff' }, // purple
};

const getGrowthSymbol = (current, previous) => {
  const diff = current - previous;

  if (current > previous) {
    return <i style={{ fontSize: '16px', fontWeight: 600, ...colorMap[diff] } } className="material-icons">keyboard_arrow_up</i>;
  }

  if (current < previous) {
    return <i style={{ color: 'rgb(228, 26, 26)', fontSize: '16px', fontWeight: 600 }} className="material-icons">keyboard_arrow_down</i>;
  }

  return <i style={{ color: '#ccc', fontSize: '16px', visibility: 'hidden' }} className="material-icons">keyboard_arrow_left</i>;
};

class SnapshotSelectField extends React.Component {

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
  };

  render () {

    const { attributes, position, playerRoles } = this.props;
    const { cursor } = this.state;
    const currentCursor = cursor !== null ? cursor : attributes.length - 1;
    const selectedAttributes = attributes[currentCursor];
    const previousAttributes = attributes[currentCursor > 0 ? currentCursor-1 : 0];
    const technicalAtts = (position === 'G') ? technicalAttsGoalie : technicalAttsPlayer;
    const playerType = position && playerTypeMap[position.match(/(^[a-zA-Z]*)/)[1]];
    const showRole = true;

    return (
      <div>
        <div className="row">
          <div className="col-xl-4 col-lg-6">
            <h6>Technical</h6>

            { technicalAtts.map((att, i) => {
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

            { mentalAtts.map((att, i) => {
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

            { physicalAtts.map((att, i) => {

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
        </div>
        <div className="row snapshot-selector">
          <SnapshotSelectField style={{ width: 300 }} attributes={attributes} cursor={currentCursor} handleChange={this.handleChange} />
        </div>
      </div>
    )
  }
};

Attributes.defaultProps = {
    attributes: [{}],
};


export default Attributes;
