import axios from 'axios';

const LandingPage = ({ currentUser }) => {
    // console.log('current=>', currentUser);
    return (
        <h1>Landing page {currentUser}</h1>
    );
}

LandingPage.getInitialProps = async () => {
    try {
        const response = await axios.get('/api/users/currentuser');
        console.log("WHAT=>", response);
        return { currentUser: '=>' + JSON.stringify(response.body) };
    } catch (e) {
        console.log('errpr => ', e);
    }
    
    return { currentUser: '' }
}

export default LandingPage;