import { Router } from "express";
import  ContenedorRandom  from "./ContenedorRandom.js";

const randomRouter = Router();
const apiRandom = new ContenedorRandom();
import { fork } from 'child_process';
const forkedProcess = fork('./calculo-bloq.js');

randomRouter.get('/:id', (req, res)=>{
    const id = req.params.id;
    
    let listado=[];
    if(id >0 && id<1000){
    listado=conteoAleatorios(1, 1000, cantidad);
    }else{
        listado=conteoAleatorios(1, 1000000, cantidad);

    }
    forkedProcess.send('INICIA');
        forkedProcess.on('message', msg => 
        {
        console.log('mensaje desde el procesos secundario:');
        console.log(msg);
        });
        
    res.status(200).json(apiRandom.guardar(listado));
})

randomRouter.post('/', (req, res)=>{
     res.status(200).send(apiRandom.getAll());
})



export default randomRouter;