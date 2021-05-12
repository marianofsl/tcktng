import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => { 
    const { email } = currentUser || {} ;
    if (currentUser)
        return (<h1>You are: {email}</h1>);
    else
        return <><h1>You are not signed in</h1></>
}

LandingPage.getInitialProps = async (context) => {
    const httpClient = buildClient(context);
    try {
        const { data } = await httpClient.get('/api/users/currentuser');
        return { currentUser: data };
    }
    catch(e) {
        return { currentUser: undefined };
    }

    // context.Component.getInitialProps
}

export default LandingPage;