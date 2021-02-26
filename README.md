# DingTalk App CLI [![Build Status](https://circleci.com/gh/open-dingtalk/dingtalk-app-cli.svg?style=shield)](https://circleci.com/gh/open-dingtalk/dingtalk-app-cli/tree/develop)  [![Windows Build status](https://ci.appveyor.com/api/projects/status/rkpafdpdwie9lqx0/branch/dev?svg=true)](https://ci.appveyor.com/project/open-dingtalk/dingtalk-app-cli/branch/develop) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

> DingTalk App CLI is the Standard Tooling for DingTalk Application Development.

<br/>

## Installation
<br/>

> **Node Version Requirement**  
DingDing Cli requires Node.js version 12.15.x or above. You can manage multiple versions of Node on the same machine with [n](https://github.com/tj/n), [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

To install the new package, use one of the following commands

```bash
npm install dingtalk-app-cli -g

# OR

yarn global add dingtalk-app-cli
```

After installation, you will have access to the `dd` binary in your command line. You can verify that it is properly installed by simply running `dd`, which should present you with a help message listing all available commands.

You can check you have the right version with this command:
```bash
dd --version
```

### Upgrading
To upgrade the global DingTalk App CLI package, you need to run:
```bash
npm update -g dingtalk-app-cli

# OR
yarn global upgrade --latest dingtalk-app-cli
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
![https://i01.lw.aliimg.com/media/lALPDfmVR79odWTNA8bNBdI_1490_966.png](https://i01.lw.aliimg.com/media/lALPDfmVR79odWTNA8bNBdI_1490_966.png)

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

[MIT](https://github.com/open-dingtalk/dingtalk-app-cli/blob/develop/LICENSE)
