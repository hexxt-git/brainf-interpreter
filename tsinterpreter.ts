import fsp from 'fs/promises';
import fs from 'fs';

let file_name: string = process.argv[2];
let program:   string = await fsp.readFile(file_name, 'utf8');

program = program.split('').filter(char => '<>+-[],.'.includes(char)).join('');

let memory: Array<number> = new Array(30000).fill(0);
let pointer: number = 0;

let instruction: number = 0;
let history: Array<number> = [];

// console.log(program)
while(instruction < program.length){
    
    // await new Promise(res => setTimeout(res, 500))
    // console.log('state before', {instruction, executing: program[instruction], pointer, history, memory})

    switch (program[instruction]){
        case '<': pointer--;
            break
        case '>': pointer++;
            break
        case '+': memory[pointer]++;
            break
        case '-': memory[pointer]--;
            break
        case '[': history.push(instruction);
            break
        case ']':
            if (memory[pointer] != 0){
                instruction = history[history.length-1];
            } else {
                history.pop();
            }
            break
        case '.':
            process.stdout.write(String.fromCodePoint(memory[pointer]));
            break
        case ',':
            let buf: Buffer = Buffer.alloc(2);
            let len: number = fs.readSync(0, buf, 0, 2, 0);
            let input: string = buf.toString('utf8', 0, len - 1); // -1 to remove the newline character
            let int: number = input.charCodeAt(0);
            memory[pointer] = int;
    }

    instruction++;
}
