# pnpm - Private npm Repository Web Interface
When setting up a private npm repository there is no simple way to create a
private web interface for the repository.  The ui in the github repository for
[npmjs.org][0] is outdated compared to the existing [npmjs.org website][1], and
the github repository for [npm-www][2] doesn't work out of the box (for me) at
the time that I was needing to setup a private npm repository.  In addition, the
[npm-www][2] project has many features to handle a public facing website that an
internal only site does not need.

The goal of this project is to create an internal web interface to a private npm
repository that can be setup quickly without needing to worry about many
security concerns that a site sitting out in the public would need to account
for.


# This is in early development and not in a working state yet.


## Main Dependencies
- Express
- Consolidate
- Dustjs



[0]: https://github.com/isaacs/npmjs.org
[1]: http://npmjs.org
[2]: https://github.com/isaacs/npm-www
