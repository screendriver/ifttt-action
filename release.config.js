'use strict';

module.exports = {
  branches: ['releases/v1'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'target/dist/**/*.js',
          'CHANGELOG.md',
          'package.json',
          'package-lock.json',
        ],
      },
    ],
    '@semantic-release/github',
  ],
};
