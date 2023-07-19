export default {
	files: ['./test/**/*.test.ts'],
	typescript: {
		rewritePaths: {
			'src/': 'target/src/',
			'test/': 'target/test/',
		},
		compile: false,
	},
};
