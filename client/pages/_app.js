import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return <div>
        <Header currentUser={currentUser} />
        <Component {...pageProps} currentUser={currentUser} />
    </div>
}

AppComponent.getInitialProps = async (context) => {
    const httpClient = buildClient(context.ctx);
    let currentUser = null;
    
    try {
        const { data } = await httpClient.get('/api/users/currentuser');
        currentUser = data;
    }
    catch {
    }
    
    let pageProps = {};
    if (context.Component.getInitialProps) {
        pageProps = await context.Component.getInitialProps(context.ctx);
    }
    return { pageProps, currentUser: currentUser };
}

export default AppComponent;