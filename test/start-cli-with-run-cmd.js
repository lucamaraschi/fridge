'use strict'

const t = require('tap')
const split = require('split2')
const path = require('path')
const childProcess = require('child_process')

t.plan(2)

const args = [
  path.join(__dirname, '..'),
  'run',
  path.join('start', 'fridge.yml')
]

const child = childProcess.spawn(process.execPath, args, {
  cwd: path.join(__dirname),
  env: process.env,
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: false
})

t.tearDown(() => {
  child.kill()
})

const lines = [
  'hello from a',
  'hello from b'
]

child.stderr.pipe(process.stderr)

child
  .stdout
  .pipe(split())
  .on('data', (line) => {
    t.ok(line.indexOf(lines.shift()) > 0, 'there is a prefix')
  })
