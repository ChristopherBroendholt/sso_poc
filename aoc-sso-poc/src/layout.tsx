import { useMsal } from "@azure/msal-react";
import { ReactNode } from "react";
import { loginRequest } from "./authConfig";

interface LayoutProps{
    children:ReactNode;
}

const Layout = ({children} : LayoutProps) => {

    const { instance } = useMsal();

    // let activeAccount;

    // if (instance) {
    //     activeAccount = instance.getActiveAccount();
    // }

    // const handleLoginPopup = () => {
    //     /**
    //      * When using popup and silent APIs, we recommend setting the redirectUri to a blank page or a page
    //      * that does not implement MSAL. Keep in mind that all redirect routes must be registered with the application
    //      * For more information, please follow this link: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md#redirecturi-considerations
    //      */
    //     instance
    //         .loginPopup({
    //             ...loginRequest,
    //             redirectUri: '/redirect',
    //         })
    //         .catch((error) => console.log(error));
    // };

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    };

    // const handleLogoutPopup = () => {
    //     instance
    //         .logoutPopup({
    //             mainWindowRedirectUri: '/', // redirects the top level app after logout
    //             account: instance.getActiveAccount(),
    //         })
    //         .catch((error) => console.log(error));
    // };

    const handleLogoutRedirect = () => {
        instance.logoutRedirect().catch((error) => console.log(error));
    };

    return(
        <div>
            <button
                onClick={() => handleLoginRedirect()}
            >
                SIGN IN
            </button>
            <button
                onClick={() => handleLogoutRedirect()}
            >
                SIGN OUT
            </button>

            <h1>Layout</h1>
            {children}
        </div>
    )
}

export default Layout;