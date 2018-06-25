const User = require('./bd');
(async () => {
	const userList = await User.find();
	console.log(userList.map(({login, password}) => ({
		login,
		password
	})));
	process.exit(0);
})();