import { leagues } from 'config/index.json';
import { parseJson } from 'utils';
import get from 'lodash.get';

const leagueId = 'ESL'; // localStorage.getItem('league_id');
const league = leagues[leagueId];
const address = get(league, 'address', 'localhost:5151');
const baseUri = `http://${address}`;


export const fetchAttributes = (payload, uriRoot = baseUri) => {

    const url = `${uriRoot}/attributes?where=boidId:${payload.id}`;

    return fetch(url)
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};
