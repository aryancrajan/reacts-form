const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/data', (req, res) => {
    console.log(req.query)
    const id = req.query.id;
    const data = fs.readFileSync(id + '.json');
    res.send(data);
});

app.post('/submit', (req, res) => {
    const body = req.body;
    console.log({body});
    const id=uuidv4();
    fs.writeFileSync(id+'.json', JSON.stringify(body));
    res.send({success: true, id: id});
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
