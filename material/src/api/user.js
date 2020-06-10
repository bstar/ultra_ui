import { leagues } from 'config';
import { parseJson } from 'utils';
import get from 'lodash.get';

const league = leagues['ESL'];
const address = get(league, 'address', 'localhost:5151');
const baseUri = `http://${address}`;


export const fetchJWT = (username, password, uriRoot = baseUri) => {

    const url = `${uriRoot}/login`;

    return fetch(url, {
            method: 'POST',
            body: JSON.stringify({ name: username, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const checkUserName = (name, uriRoot = baseUri) => {

    const url = `${uriRoot}/user/${name}/exists`;

    return fetch(url)
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};

export const postUser = ({ name, email, password }, uriRoot = baseUri) => {

    const url = `${uriRoot}/register`;

    return fetch(url, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(parseJson)
        .then(({ json, response }) => ({ json, response }));
};
