const axios = require('axios').default;
const qs = require('qs');
const jwt = require('jsonwebtoken');

class KeycloakSami {
	constructor() {}

	config(params) {
		axios.defaults.timeout = params.timeout;
		axios.defaults.baseURL = params.baseURL;
		return this;
	}	

	async sign(realm, params) {
		try {
			const response = await axios.post(`/realms/${realm}/protocol/openid-connect/token`, qs.stringify(params));
	
			return response.data. access_token;
		} catch (error) {
			throw error.message;
		}
	}
	
	verify(token, publicKey) {
		try {
			jwt.verify(token, publicKey);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}	
	}
	
	async createUser(realm, token, payload) {
		try {
			await axios({
				url: `/admin/realms/${realm}/users`,
				method: 'POST',
				headers: { 
					'content-type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				data: JSON.stringify(payload),
			});
		} catch (error) {
			console.error(error.message);
			throw error.message;
		}
	}	
}

module.exports = new KeycloakSami();
