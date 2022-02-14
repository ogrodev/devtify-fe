function localStorageExpires() {
	let toRemove: string[] = [],
		currentDate = new Date().getTime();

	for (let i = 0, j = localStorage.length; i < j; i++) {
		let key: string = localStorage.key(i)!,
			itemValue = localStorage.getItem(key);

		if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {
			let current = JSON.parse(itemValue);

			if (current.expires && current.expires <= currentDate) {
				toRemove.push(key);
			}
		}
	}

	for (let i = toRemove.length - 1; i >= 0; i--) {
		localStorage.removeItem(toRemove[i]);
	}
}

localStorageExpires();

/**
 * Function to add items in localStorage
 * @param {string} key key that will be used to get the value later
 * @param {*} value Almost every value can be added, they just need to not fail JSON.stringify
 * @param {number} minutes Lifetime of item
 */
export function setLocalStorage(key: string, value: any, minutes: number = 10080) {
	let expiry = new Date().getTime() + 60000 * minutes;

	localStorage.setItem(
		key,
		JSON.stringify({
			value: value,
			expires: expiry,
		})
	);
}

/**
 * Function to obtain items from localStorage that not yet expired
 * @param {string} key Key to obtain associated value
 * @return {*} Returns any value, if the item is expired will just return undefined
 */
export function getLocalStorage(key: string) {
	localStorageExpires();

	let itemValue = localStorage.getItem(key);

	if (itemValue && /^\{(.*?)\}$/.test(itemValue)) {
		let current = JSON.parse(itemValue);

		return current.value;
	}
}
