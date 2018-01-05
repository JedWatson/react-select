module.exports = {
	filename: 'HISTORY.md',
	message: ({ pr, user }) =>
		`* ${pr.title}, thanks [${user.name ||
			user.login}](${user.url}) - [see PR](${pr.url})`,
};
