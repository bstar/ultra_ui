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

const getGrowthColor = growth => {

  if (growth < 0) {
      return 'red';
  }
  if (growth === 0) {
      return 'white';
  }
  if (growth < 10) {
      return 'green';
  }
  if (growth < 25) {
      return 'blue';
  }
  return 'iridium';
};

const getAOColor = ao => {

  if (ao < 12) {
      return 'red';
  }
  if (ao < 14) {
      return 'orange';
  }
  if (ao < 15) {
      return 'green';
  }
  if (ao < 20) {
      return 'blue';
  }

  return 'iridium';
};

const getCOMColor = com => {

  if (com < 250) {
      return 'red';
  }
  if (com < 300) {
      return 'orange';
  }
  if (com < 380) {
      return 'green';
  }
  if (com < 430) {
      return 'blue';
  }

  return 'iridium';
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

const getRatingColor = rating => {

  if (rating < 9) {
    return 'red';
  }

  if (rating < 12) {
    return 'orange';
  }

  if (rating < 16) {
    return 'green';
  }

  if (rating < 20) {
    return 'blue';
  }

  return 'iridium';
};

const convertCombined = (val, type) => {

  const map = {
    technical: 10,
    mental: 13.5,
    physical: 19.5,
  };

  return ((val * .01) * map[type]).toFixed(1);
};

const convertWeighted = val => ((val * .01) * 20).toFixed(1);

const teamColors = {
  ana: {
    color1: '#F47A38', // orange
    color2: '#B9975B', // gold
    color3: '#C1C6C8', // silver
    color4: '#000000', // black
    highlight: 1,
  },
  ari: {
    color1: '#8C2633', // brick red
    color2: '#E2D6B5', // desert sand
    color3: '#111111', // black
    highlight: 1,
  },
  bos: {
    color1: '#FFB81C', // gold
    color2: '#000000', // black
    highlight: 1,
  },
  buf: {
    color1: '#002654', // navy blue
    color2: '#FCB514', // yellow
    color3: '#ADAFAA', // silver
    color4: '#C8102E', // red
    highlight: 2,
  },
  cgy: {
    color1: '#C8102E', // red
    color2: '#F1BE48', // gold
    color3: '#111111', // black
    highlight: 1,
  },
  car: {
    color1: '#CC0000', // red
    color2: '#000000', // black
    color3: '#A2AAAD', // silver
    color4: '#76232F', // burgundy
    highlight: 1,
  },
  chi: {
    color1: '#CF0A2C', // red
    color2: '#FF671B', // orange
    color3: '#00833E', // green
    color4: '#FFD100', // yellow
    highlight: 1,
  },
  col: {
    color1: '#6F263D', // burgundy
    color2: '#236192', // blue
    color3: '#A2AAAD', // silver
    color4: '#000000', // black
    highlight: 2,
  },
  clb: {
    color1: '#002654', // union blue
    color2: '#CE1126', // goal red
    color3: '#A4A9AD', // capital silver
    highlight: 2,
  },
  dal: {
    color1: '#006847', // victory green
    color2: '#8F8F8C', // silver
    color3: '#111111', // black
    highlight: 1,
  },
  det: {
    color1: '#CE1126', // red
    color2: '#ffffff', // white
    highlight: 1,
  },
  edm: {
    color1: '#041E42', // blue
    color2: '#FF4C00', // orange
    highlight: 2,
  },
  fla: {
    color1: '#041E42', // navy
    color2: '#C8102E', // red
    color3: '#B9975B', // tan
    highlight: 3,
  },
  lak: {
    color1: '#111111', // black
    color2: '#A2AAAD', // silver
    color3: '#ffffff', // white
    highlight: 2,
  },
  min: {
    color1: '#A6192E', // IRON RANGE RED
    color2: '#154734', // FOREST GREEN
    color3: '#EAAA00', // GOLD
    color4: '#DDCBA4', // MINNESOTA WHEAT
    highlight: 1,
  },
  mon: {
    color1: '#AF1E2D', // red
    color2: '#192168', // blue
    highlight: 1,
  },
  nsh: {
    color1: '#FFB81C', // gold
    color2: '#041E42', // navy blue
    color3: '#ffffff', // white
    highlight: 1,
  },
  njd: {
    color1: '#CE1126', // red
    color2: '#000000', // black
    color3: '#ffffff', // white
    highlight: 1,
  },
  nyi: {
    color1: '#00539B', // blue
    color2: '#F47D30', // orange
    highlight: 2,
  },
  nyr: {
    color1: '#0038A8', // blue
    color2: '#CE1126', // red
    color3: '#ffffff', // white
    highlight: 2,
  },
  ott: {
    color1: '#C52032', // red
    color2: '#C2912C', // gold
    color3: '#000000', // black
    color4: '#ffffff', // white
    highlight: 1,
  },
  phi: {
    color1: '#F74902', // flyers orange
    color2: '#000000', // black
    color3: '#ffffff', // white
    highlight: 1,
  },
  pit: {
    color1: '#000000', // black
    color2: '#CFC493', // gold
    color3: '#FCB514', // yellow
    color4: '#ffffff', // white
    highlight: 3,
  },
  stl: {
    color1: '#002F87', // blue
    color2: '#FCB514', // yellow
    color3: '#041E42', // navy blue
    color4: '#ffffff', // white
    highlight: 2,
  },
  sjs: {
    color1: '#006D75', // teal
    color2: '#EA7200', // orange
    color3: '#000000', // black
    color4: '#ffffff', // white
    highlight: 1,
  },
  sea: {
    color1: '#001628', // deep sea blue
    color2: '#99D9D9', // ice blue
    color3: '#355464', // boundless blue
    color4: '#68A2B9', // shadow blue
    color5: '#E9072B', // red alert
    highlight: 2,
  },
  tbl: {
    color1: '#002868', // blue
    color2: '#ffffff', // white
    highlight: 1,
  },
  tor: {
    color1: '#00205B', // blue
    color2: '#ffffff', // white
    highlight: 1,
  },
  van: {
    color1: '#00205B', // blue
    color2: '#00843D', // green
    color3: '#041C2C', // dark blue
    color4: '#99999A', // gray
    color5: '#ffffff', // white
    highlight: 2,
  },
  vgk: {
    color1: '#B4975A', // gold
    color2: '#333F42', // steel gray
    color3: '#C8102E', // red
    color4: '#000000', // black
    highlight: 1,
  },
  wsh: {
    color1: '#041E42', // navy
    color2: '#C8102E', // red
    highlight: 2,
  },
  wpg: {
    color1: '#041E42', // navy
    color2: '#004C97', // blue
    color3: '#AC162C', // red
    color4: '#7B303E', // maroon
    color5: '#55565A', // dark gray
    color6: '#8E9090', // silver
    color7: '#ffffff', // white
    highlight: 1,
  },
};

const hasAccess = (user, list) => {
  const isAdmin = ['admin', 'super'].includes(user.role);
  const isOwner = user.id === list.userName;
  if (isAdmin || isOwner) return true;

  return false;
};

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
  getCOMColor,
  getAOColor,
  getGrowthColor,
  convertCombined,
  convertWeighted,
  getRatingColor,
  teamColors,
  hasAccess,
};
