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

export const fetchListsByType = (type, token, uriRoot = baseUri) => {

    const url = `${uriRoot}/lists/${type}`;

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

// individual player rank update (deprecated)
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

// batch player rank updates
export const putPlayerRanks = (listId, players, token, uriRoot = baseUri) => {

    const url = `${uriRoot}/list/${listId}/rank_batch`;

    return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(players),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
            },
        })
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const putPlayerData = (listId, data, token, uriRoot = baseUri) => {

    const url = `${uriRoot}/list/${listId}/add_data`;

    return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
            },
        })
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const createList = (list, token, uriRoot = baseUri) => {

    const url = `${uriRoot}/lists`;

    return fetch(url, {
            method: 'POST',
            body: JSON.stringify(list),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`,
            },
        })
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};
