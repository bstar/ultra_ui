import { leagues } from 'config';
import { parseJson } from 'utils';
import get from 'lodash.get';

const league = leagues['ESL'];
const address = get(league, 'address', 'localhost:5151');
const baseUri = `http://${address}`;


export const fetchLists = (token, uriRoot = baseUri) => {

    const url = `${uriRoot}/lists`;

    return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `JWT ${token}`, 
            },
        })
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const fetchList = (id, token, uriRoot = baseUri) => {

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
