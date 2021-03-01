# DingTalk Fe CLI [![Build Status](https://circleci.com/gh/open-dingtalk/dingtalk-fe-cli.svg?style=shield)](https://circleci.com/gh/open-dingtalk/dingtalk-fe-cli/tree/develop)  [![Windows Build status](https://ci.appveyor.com/api/projects/status/hi7uu5rnbs4x9vas/branch/develop?svg=true)](https://ci.appveyor.com/project/lou1swu/dingtalk-fe-cli/branch/develop) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

> DingTalk Fe CLI is the Standard Tooling for DingTalk Application Development.

<br/>

## Installation
<br/>

> **Node Version Requirement**  
DingDing Cli requires Node.js version 12.15.x or above. You can manage multiple versions of Node on the same machine with [n](https://github.com/tj/n), [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

To install the new package, use one of the following commands

```bash
npm install dingtalk-fe-cli -g

# OR

yarn global add dingtalk-fe-cli
```

After installation, you will have access to the `dd` binary in your command line. You can verify that it is properly installed by simply running `dd`, which should present you with a help message listing all available commands.

You can check you have the right version with this command:
```bash
dd --version
```

### Upgrading
To upgrade the global DingTalk Fe CLI package, you need to run:
```bash
npm update -g dingtalk-fe-cli

# OR
yarn global upgrade --latest dingtalk-fe-cli
```
## Quick Start
<br/>

To create a new project, run:
```bash
dd init myapp
```

You will be prompted to pick a appType to create:
![https://i01.lw.aliimg.com/media/lALPDgCwRQjFyV3NA8bNBdI_1490_966.png](https://i01.lw.aliimg.com/media/lALPDgCwRQjFyV3NA8bNBdI_1490_966.png)


Then you will be prompted to pick a template:
![https://i01.lw.aliimg.com/media/lALPDetfTSxLX5_NA8bNBdI_1490_966.png](https://i01.lw.aliimg.com/media/lALPDetfTSxLX5_NA8bNBdI_1490_966.png)

Finally you will be prompted to pick a language:
![https://i01.lw.aliimg.com/media/lALPDf0ixn4LtVbNBKTNBbQ_1460_1188.png](https://i01.lw.aliimg.com/media/lALPDf0ixn4LtVbNBKTNBbQ_1460_1188.png)

And you have completed all the initial steps, after installing dependencies, 
the new project will be initialated to the directory - `myapp`.

The `dd init` command has a number of options and you can explore them all by running:
```bash
dd init --help
```
```
Usage: dd init [options] [outDir]

Create a new project

Arguments:
  outDir                         Type where to create the project

Options:
  -a, --appType [appType]        Skip prompts and use specified appType
  -t, --template [template]      Skip prompts and use specified template, default etc.
  -l, --language [language]      Skip prompts and use specified language, js, ts etc.
  --skip-install [skip-install]  Skip install the dependencies.
  -h, --help                     display help for command
```
## License

[MIT](https://github.com/open-dingtalk/dingtalk-fe-cli/blob/develop/LICENSE)
