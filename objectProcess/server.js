import { spawn } from 'child_process';
import express from "express";
const app = express();
import dotenv from 'dotenv';

const ls = spawn('cmd', ['/c', 'dir']);
let mensaje1;
ls.stdout.on('data', (data) => {
  console.log(`stdout: \n`);
  console.log(`${data}`)
  mensaje1=data;
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


const aca = spawn('cmd', ['./', 'dir']);
let mensaje2;
aca.stdout.on('data', (data) => {
  console.log(`stdout: <\n>`);
  console.log(`${data}`)
  mensaje2=data;
});

aca.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

aca.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

const version = spawn('node', ['-v']);
let mensaje;
version.stdout.on('data', (data) => {
  console.log(`stdout: \n`);
  console.log(`${data}`);
  mensaje = data;
});

version.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

version.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
let mensaje3;
const memoria=spawn('cmd',['wmic MemoryChip get BankLabel, Capacity, MemoryType, TypeDetail, Speed, Manufacturer']);
memoria.stdout.on('data', (data) => {
    console.log(`stdout: \n`);
    console.log(`${data}`);
    mensaje3 = data;
  });

  memoria.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  memoria.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
app.get('/info', (req, res)=>{
  
   res.send(`Version: ${process.cwd()}<br>${mensaje}<br> Despliegue directorio: ${mensaje1} <br>Actual directorio: ${mensaje2}<br> Memoria: ${mensaje3}`);
})

/*============================[Servidor]============================*/
//const PORT = 4242;
const PORT = process.env.PORT;


console.log(PORT);

const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});