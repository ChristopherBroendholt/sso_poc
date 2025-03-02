/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-finally */
import {
    useState,
    useCallback,
} from 'react';

import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

/**
 * Custom hook to call a web API using bearer token obtained from MSAL
 * @param {PopupRequest} msalRequest 
 * @returns 
 */
const useFetchWithMsal = (msalRequest: PopupRequest) => {
    const { instance } = useMsal();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>();
    const [data, setData] = useState<any>(null);

    const { result, error: msalError } = useMsalAuthentication(InteractionType.Redirect, {
        ...msalRequest,
        account: instance.getActiveAccount()!,
        redirectUri: '/'
    });

    /**
     * Execute a fetch request with the given options
     * @param {string} method: GET, POST, PUT, DELETE
     * @param {String} endpoint: The endpoint to call
     * @param {Object} data: The data to send to the endpoint, if any 
     * @returns JSON response
     */
    const execute = async (method: string, endpoint: string, data: any = null) => {
        if (msalError) {
            console.log(msalError)

            setError(msalError);
            return;
        }

        if (result) {
            try {
                let response = null;

                const headers = new Headers();
                const bearer = `Bearer ${result.accessToken}`;
                headers.append("Authorization", bearer);

                if (data) headers.append('Content-Type', 'application/json');

                const options = {
                    method: method,
                    headers: headers,
                    body: data ? JSON.stringify(data) : null,
                };

                setIsLoading(true);
                response = (await fetch(endpoint, options));

                if ((response.status === 200 || response.status === 201)) {
                    let responseData = response;

                    try {
                        responseData = await response.json();
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setData(responseData);
                        setIsLoading(false);
                        return responseData;
                    }
                }

                setIsLoading(false);
                return response;
            } catch (e) {
                setError(e);
                setIsLoading(false);
                throw e;
            }
        }
    };

    return {
        isLoading,
        error,
        data,
        execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
    };
};

export default useFetchWithMsal;