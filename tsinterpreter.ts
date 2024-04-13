import fsp from 'fs/promises';

let file_name: string = process.argv[2]
let program:   string = await fsp.readFile(file_name, 'utf8')


// turn program into instructions

console.log(program)

let memory: Array<number> = new Array(30000).fill(0)
let pointer = 0

// execute the instructions
