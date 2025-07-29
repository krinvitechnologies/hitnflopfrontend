const _document = typeof document !== "undefined" ? document : null
const _localStorage = typeof localStorage !== "undefined" ? localStorage : null
const _sessionStorage = typeof sessionStorage !== "undefined" ? sessionStorage : null

export const Session = {
	set(name: string, value: any) {
		if (!_sessionStorage) return;
		_sessionStorage.setItem(name, JSON.stringify(value))
	},
	get(name: string) {
		if (!_sessionStorage) return;
		const data = _sessionStorage.getItem(name)
		if (data) {
			return JSON.parse(data)
		}

		return null;
	},
	remove(name: string) {
		if (!_sessionStorage) return;
		_sessionStorage.removeItem(name)
	},
}

export const Storage = {
	set(name: string, value: any) {
		if (!_localStorage) return;
		_localStorage.setItem(name, JSON.stringify(value))
	},
	get(name: string) {
		if (!_localStorage) return;
		let data = _localStorage.getItem(name)

		if (data) {
			return JSON.parse(data)
		}

		return null;
	},
	remove(name: string) {
		if (!_localStorage) return;
		_localStorage.removeItem(name)
	},
}

export const Cookie = {
	set(name: string, value: any, exdays = 30) {
		if (!_document) return;

		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		_document.cookie = name + "=" + value + ";" + expires + ";path=/";
	},
	get(name: string) {
		if (!_document) return;

		let cname = name + "=";
		let ca = _document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(cname) == 0) {
				return c.substring(cname.length, c.length);
			}
		}
		return null;
	}
}