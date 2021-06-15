import axios from 'axios';

export default axios.create({
	baseURL: 'https://streamserver.run.goorm.io',
});

