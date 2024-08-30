import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider } from '@azure/msal-react';
import './App.css'
import { IPublicClientApplication } from '@azure/msal-browser';
import Layout from './layout';
import { useState } from 'react';
import { protectedResources } from './authConfig';
import useFetchWithMsal from './useFetchWithMsal';

function Content() {
  
  const { execute } = useFetchWithMsal({
    scopes: [...protectedResources.AocSsoPoc.scopes.read, ...protectedResources.AocSsoPoc.scopes.write]
  });

  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const [apiResponse, setApiResponse] = useState<string>("");
  
  const handleClick = () => {
    console.log("TEST")
    execute("GET", protectedResources.AocSsoPoc.endpoint)
    .then((res) => res?.text())
    .then((text) => setApiResponse(text!));
  }

  return (
    <>
      <AuthenticatedTemplate>
        { activeAccount ? (
          <>
            <h1>Azure single sign on (SSO)</h1>
            <div>
              <p>{JSON.stringify(activeAccount)}</p>
            </div>

            <button
              onClick={() => handleClick()}
            >
              Call api (Authenticated)
            </button>
            <p>{apiResponse}</p>
          </>
        ): null}
      </AuthenticatedTemplate>  
      <UnauthenticatedTemplate>
        <h1>Please sign in!</h1>
        <button
          onClick={() => handleClick()}
        >
          Call api (Unauthenticated)
        </button>
        <p>{apiResponse}</p>
      </UnauthenticatedTemplate>
    </>
  )
}



interface AppProps{
  instance: IPublicClientApplication
}

const App = ({instance} : AppProps) => {
  return (
      <MsalProvider instance={instance}>  
        <Layout>
          <Content />
        </Layout>
      </MsalProvider>
  );
};

export default App
