### Hexlet tests and linter status:
[![Actions Status](https://github.com/expant/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/expant/frontend-project-46/actions)

### My tests, linter status and CodeClimate status
[![Actions Status](https://github.com/expant/frontend-project-46/workflows/build/badge.svg)](https://github.com/expant/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/1bd5936d88b6d182799e/maintainability)](https://codeclimate.com/github/expant/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1bd5936d88b6d182799e/test_coverage)](https://codeclimate.com/github/expant/frontend-project-46/test_coverage)

# Difference generation

Difference - a program that determines the difference between two data structures.

* Supports different input formats: `yaml`, `json`
* Generates reports in the form: `plain text`, `stylish` и `json`

## Requirements

* installed latest(fresh) Node.js version
* installed 'make' utility. 
    Setup example:
    `sudo apt install make`

## Installation

1.  Install dependencies: 
    ```sh
    make install
    ```
1.  Install gendiff utility: 
    ```sh
    npm link
    ``` 
    or 
    ```sh
    sudo npm link
    ```

## Usage

#### Help command
`gendiff -h`

#### Gendiff in the plain format
`gendiff -f plain <filepath1> <filepath2>`

#### Gendiff in the stylish format
`gendiff -f stylish <filepath1> <filepath2>`

#### Gendiff in the json format
`gendiff -f json <filepath1> <filepath2>`

#### gendiff
[![gendiff](https://asciinema.org/a/ojH3OASbDK1adGqi7ODWr2paF.svg)](https://asciinema.org/a/ojH3OASbDK1adGqi7ODWr2paF)
