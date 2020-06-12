import { leagues } from 'config';
import { parseJson } from 'utils';
import get from 'lodash.get';

const league = leagues['ESL'];
const address = get(league, 'address', 'localhost:5151');
const baseUri = `http://${address}`;


export const fetchPlayer = (payload, uriRoot = baseUri) => {

    const url = `${uriRoot}/boid/${payload.id}?noatts=true`;

    return fetch(url)
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const fetchPlayers = (query, uriRoot = baseUri) => {

    const url = `${uriRoot}/boids?${query}`;

    return fetch(url)
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const postPlayersToList = ({ listId, boidIds }, uriRoot = baseUri) => {

    const url = `${uriRoot}/list/${listId}/boids/add`;

    return fetch(url, {
            method: 'POST',
            body: JSON.stringify({ boidIds }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
};
