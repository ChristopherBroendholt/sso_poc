/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// import { LogLevel } from "@azure/msal-browser";

// export const msalConfig = {
//   auth: {
//     clientId: "b093cd55-50c0-4997-8dff-a9b15038b96b",
//     authority: "https://login.microsoftonline.com/6f87ac62-1f9b-4d05-99b9-df4cbfd3672f",
//     knownAuthorities: [],
//     redirectUri: "/",
//     postLogoutRedirectUri: "/",
//     navigateToLoginRequestUrl: true,
//   },
//   cache: {
//     cacheLocation: "sessionStorage",
//     storeAuthStateInCookie: false,
//   },
//   system: {
//     loggerOptions: {
//       loggerCallback: (
//         level: LogLevel,
//         message: string,
//         containsPii: boolean
//       ): void => {
//         if (containsPii) {
//           return;
//         }
//         switch (level) {
//           case LogLevel.Error:
//             console.error(message);
//             return;
//           case LogLevel.Info:
//             console.info(message);
//             return;
//           case LogLevel.Verbose:
//             console.debug(message);
//             return;
//           case LogLevel.Warning:
//             console.warn(message);
//             return;
//         }
//       },
//       piiLoggingEnabled: false,
//     },
//     windowHashTimeout: 60000,
//     iframeHashTimeout: 6000,
//     loadFrameTimeout: 0,
//   },
// };

// export const loginRequest = {
//   scopes: [],
// };

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
    auth: {
        clientId: "b093cd55-50c0-4997-8dff-a9b15038b96b",
        authority: "https://login.microsoftonline.com/6f87ac62-1f9b-4d05-99b9-df4cbfd3672f",
        knownAuthorities: [],
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: 'localStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            /**
             * Below you can configure MSAL.js logs. For more information, visit:
             * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
             */
            loggerCallback: (level : LogLevel, message : string, containsPii : boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    AocSsoPoc: {
        endpoint: 'https://localhost:5133/test',
        scopes: {
            read: ['api://93cef022-04e9-4b76-935d-74de60a46e2b/aoc-sso-poc-api.Read'],
            write: ['api://93cef022-04e9-4b76-935d-74de60a46e2b/aoc-sso-poc-api.Write'],
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.AocSsoPoc.scopes.read, ...protectedResources.AocSsoPoc.scopes.write],
};