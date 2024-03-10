import md5 from 'md5'

export class ApiService {
	#API_PASSWORD = 'Valantis'

	#makeRequest(action, params) {
		const date = new Date()
		const timestamp = `${date.toISOString().split('T')[0].replaceAll('-', '')}`
		return fetch('https://api.valantis.store:41000/', {
			method: 'POST',
			headers: {
				'X-Auth': md5(this.#API_PASSWORD + '_' + timestamp),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				action,
				params
			})
		})
			.then(res => {
				if (res.ok) {
					return res.json()
				} else {
					return res.text().then(text => {
						throw new Error(text)
					})
				}
			})
			.then(res => res.result)
			.catch(err => {
				console.log(err.message)
				return this.#makeRequest(action, params)
			})
	}
	#getByIds(params) {
		return this.#makeRequest('get_items', params).then(items =>
			items.reduce((acc, item) => {
				if (!acc.some(elem => elem.id == item.id)) {
					acc.push(item)
				}
				return acc
			}, [])
		)
	}

	getByFilter(params) {
		return this.#makeRequest('filter', params).then(itemIds => this.#getByIds({ ids: itemIds }))
	}
	getItems(params) {
		return this.#makeRequest('get_ids', params).then(itemIds => this.#getByIds({ ids: itemIds }))
	}
	getItemFields(params) {
		return this.#makeRequest('get_fields', params)
	}
}
