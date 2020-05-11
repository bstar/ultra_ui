import { leagues } from 'config';
import { parseJson } from 'utils';
import get from 'lodash.get';

const leagueId = 'ESL'; // localStorage.getItem('league_id');
const league = leagues[leagueId];
const address = get(league, 'address', 'localhost:5151');
const baseUri = `http://${address}`;


export const fetchLists = (uriRoot = baseUri) => {

    const url = `${uriRoot}/lists`;

    return fetch(url)
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const fetchList = (id, uriRoot = baseUri) => {

    const url = `${uriRoot}/list/${id}`;

    return fetch(url)
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const putPlayerRank = (item, uriRoot = baseUri) => {

    const url = `${uriRoot}/list/${item.listId}/boid/${item.boidId}/rank/${item.rank}`;

    return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};
