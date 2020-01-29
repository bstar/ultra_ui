import { leagues } from 'config/index.json';
import { parseJson } from 'utils';

const leagueId = localStorage.getItem('league_id');
const league = leagues[leagueId];
const baseUri = `http://${league.address}`;


export const fetchPlayer = (payload, uriRoot = baseUri) => {

    const url = `${uriRoot}/boid/${payload.id}?noatts=true`;

    return fetch(url)
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};
