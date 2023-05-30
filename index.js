const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, console.log('servidor levantado'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})



app.post('/canciones', ( req, res ) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    canciones.push(cancion);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 2));
    res.send('cancion agregada correctamente');
})

app.get('/canciones', ( req, res ) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    res.json(canciones);
})

app.put('/canciones/:id', ( req, res ) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex( c => c.id == id);
    canciones[index] = cancion;
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('cancion modificada con exito');


} );

app.delete('/canciones/:id', ( req, res ) => {
    const { id } = req.params;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex(c => c.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send(' cancion eliminada')
})


