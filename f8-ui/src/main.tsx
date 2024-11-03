import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App.tsx';
import GlobalStyles from '~/components/GlobalStyles';
import { StoreProvider } from '~/store/StoreProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    // </React.StrictMode>,

    <GlobalStyles>
        <StoreProvider>
            <App />
        </StoreProvider>
    </GlobalStyles>,
);
