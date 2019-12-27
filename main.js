const hello = require('./hello')
hello.world()

const ansi = require("ansi")
const cursor = ansi(process.stdout)
cursor.beep()
cursor.red().bg.yellow().write('Hello world!').reset().write('\n')
