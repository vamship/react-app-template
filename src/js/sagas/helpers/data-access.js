import { call, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

/**
 * Abstract representation of a data access class used to read and manipulate
 * data in the cloud.
 */
export default class DataAccess {
    /**
     * @param {String} url The relative URL of the resource that is being
     *        accessed.
     * @param {String} name The name of the resource that is being accessed.
     */
    constructor(url, name) {
        this._url = `https://tc171wwqld.execute-api.us-east-1.amazonaws.com/dev${url}`;
        this._name = name;
    }

    /**
     * Generator function that ultimately yields resource data or throws an
     * error if the fetch fails.
     *
     * @param {String} [url=''] An optional url token that can be appended
     *        to the base url of the data access object.
     *
     * @return {Object} The data obtained from the resource.
     */
    * fetch(url) {
        if (typeof url !== 'string') {
            url = '';
        }
        try {
            const user = yield select(state => state.user);
            const response = yield call(fetch,
                `${this._url}${url}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': user.authToken
                    }
                }
            );
            if (!response.ok) {
                throw new Error(`Fetch call failed for [${this._title}] with status: [${response.status}]. Message: [${response.statusText}]`);
            }
            const data = yield call(() => {
                return response.json()
            });
            return data;
        } catch (ex) {
            const errorMessage = `Error executing fetch call for [${this._title}]. Details: [${ex.message}]`;
            throw new Error(errorMessage);
        }
    }
}
