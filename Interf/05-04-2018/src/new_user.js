const User = require('./bd');
(async () => {
	let newUser = {login: 'Vehova Ksenia', password:'777q'};
	newUser = new User(newUser);
	await newUser.save();
	process.exit(0);
})();