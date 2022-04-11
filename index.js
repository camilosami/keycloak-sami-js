const axios = require('axios').default;
const qs = require('qs');
const jwt = require('jsonwebtoken');

class KeycloakSami {
	constructor(params) {
		// class attributes
		this.realm = params.realm;
		this.baseUrl = params.baseUrl;
		this.clientId = params.clientId;
		this.clientSecret = params.clientSecret;
		this.publicKey = params.publicKey;
		this.timeout = params.timeout;

		// axios attributes
		axios.defaults.timeout = this.timeout;
		axios.defaults.baseURL = this.baseUrl;
	}

	async sign(username, password) {
		try {
			const response = await axios.post(`/realms/${this.realm}/protocol/openid-connect/token`, qs.stringify({
				grant_type: 'password',
				username,
				password,
				client_id: this.clientId,
				client_secret: this.clientSecret				
			}));
	
			return response.data.access_token;
		} catch (error) {
			console.error(error.message);
			throw error.message;
		}
	}
	
	verify(token) {
		try {
			jwt.verify(token, this.publicKey);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}	
	}
	
	async createUser(token, realm, payload) {
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

module.exports = KeycloakSami;
