import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body }) => {
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState(null);

    const doRequest = async () => {
        try {
            setErrors([]);
            setData(null);
            const response = await axios[method](url, body);
            setData(response.data);
            return true;
        } catch (e) {
            setErrors(e.response.data);
        }
        
        return false;
    }

    return [doRequest, errors, data];
}