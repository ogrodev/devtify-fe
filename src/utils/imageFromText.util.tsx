/**
 * Generate a random color HEX
 * @returns {string}
 */
export const getRandomColor = () => {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
};

const getInitials = (name: string): string => {
	let initials;
	const nameSplit = name.split(" ");
	const nameLength = nameSplit.length;
	if (nameLength > 1) {
		initials = nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
	} else {
		initials = nameSplit[0].substring(0, 1);
	}

	return initials.toUpperCase();
};

/**
 * Create an image with the initials from a full name, returning a base64 url to be used in <img src="HERE" />
 * @param {number} size Size in px to generate the image
 * @param {string} name Full name to be used ex: 'John Doe'
 * @param {string} color Color in HEX ex: "#FFFFFF" if you want to generate a random color, use getRandomColor()
 * @param {profile_types} profileType OPTIONAL - company, user or influencer
 * @returns {URL}
 */
export const createImageFromInitials = (size: number, name: string, color?: string): string => {
	if (name === null) return "";
	name = getInitials(name);

	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");
	canvas.width = canvas.height = size;

	context!.fillStyle = "#ffffff";
	context!.fillRect(0, 0, size, size);
	if (color) {
		context!.fillStyle = color;
	}
	context!.fillRect(0, 0, size, size);

	context!.fillStyle = "#ffffff";
	context!.textBaseline = "middle";
	context!.textAlign = "center";
	context!.font = `${size / 2.5}px "Montserrat"`;
	context!.fillText(name, size / 2, size / 2);

	return canvas.toDataURL();
};
