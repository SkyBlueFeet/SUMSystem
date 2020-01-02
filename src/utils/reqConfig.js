import axios from '@/utils/axios';

export default async function(name) {
    const res = await axios({
        url: '/app/json',
        method: 'get',
        params: {
            name: name
        }
    });
    return res;
}