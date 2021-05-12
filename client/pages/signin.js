import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../hooks/use-request';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signup, signupErrors] = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body : {
            email, password
        }
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        if (await signup()) {
            Router.push('/');
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign in</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
            </div>
            {signupErrors.length > 0 &&
                <div className="alert alert-danger">
                    <h4>Ooops...</h4>
                    <ul className="my-0">
                        {
                            signupErrors.map((e) => {
                                return (<li key={e.message}>{e.message}</li>);
                            })
                        }
                    </ul>
                </div>
            }
            <button className="btn btn-primary">Signin</button>
        </form>
    );
}