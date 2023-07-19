const config = {
	API_ROOT: 'https://api.themoviedb.org/3',
	API_KEY: '6a3c1b514cca5a0464b97ecc1c766946',
	API_IMAGE: {
		small: 'https://image.tmdb.org/t/p/w185/',
		medium: 'https://image.tmdb.org/t/p/w300/',
		large: 'https://image.tmdb.org/t/p/w500/',
		original: 'https://image.tmdb.org/t/p/original/'
	},
	API_LANGUAGES: [
		{
			id: 1,
			title: 'te',
			code: 'te-IN'
		},
		{
			id: 2,
			title: 'en',
			code: 'en-US'
		}
	]
};

export default config;