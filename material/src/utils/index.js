import moment from 'moment';


const universalActionCreator = (type, payload, meta = {}, isError = false) => {

    const action = {
        type,
        payload,
        meta,
    };

    if (isError) {
        return {
            ...action,
            meta: {
                ...action.meta,
                timestamp: moment(),
            },
            error: isError,
        };
    }

    return action;
};

const parseJson = response => {

  return response.json()
      .then(json => ({ json, response }))
};

const getCombinedColor = rating => {

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
  
const getTechnicalColor = rating => {

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
  
const getMentalColor = rating => {

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
  
const getPhysicalColor = rating => {

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

const getAttributeColor = rating => {

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
  
  const getPortrait = position => {
    
    if (position === 'G') {
      return 'goalie';
    }
  
    return 'center';
};

const getCategotyValues = atts => {

    return {
        offence: (atts.stickhandling + atts.wristshot + atts.deking + atts.passing + atts.creativity)/5,
        defence: (atts.checking + atts.positioning + atts.slapshot + atts.passing)/4,
        skating: (atts.acceleration + atts.speed + atts.stamina)/3,
        tenacity: (atts.determination + atts.work_rate + atts.bravery + atts.strength)/4,
        leadership: (atts.influence + atts.teamwork + atts.work_rate)/3,
    };
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
};

const roleMapping = {
    primary: 'callout-info',
    secondary: 'callout-success',
    tertiary: 'callout-warning',
    useless: 'callout-danger'
};

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
];
  
const physicalAtts = [
    'acceleration',
    'agility',
    'balance',
    'speed',
    'stamina',
    'strength'
];

export {
  getCombinedColor,
  getTechnicalColor,
  getMentalColor,
  getPhysicalColor,
  getAttributeColor,
  getPortrait,
  getCategotyValues,
  roleMap,
  playerTypeMap,
  roleMapping,
  technicalAttsPlayer,
  technicalAttsGoalie,
  mentalAtts,
  physicalAtts,
  universalActionCreator,
  parseJson,
};
