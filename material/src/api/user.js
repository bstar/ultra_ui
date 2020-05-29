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
