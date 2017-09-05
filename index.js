#!/usr/bin/env node
const request = require('./lib/index')
const argv = process.argv;
let word = argv.slice(2)[0]
request(word)