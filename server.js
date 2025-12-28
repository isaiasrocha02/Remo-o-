import express from 'express';
import multer from 'multer';
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/remove-bg', upload.single('image'), async (req, res) => {
    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(req.file.path));
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': 'SUA_API_KEY_AQUI'
        },
        body: formData
    });

    if (!response.ok) {
        return res.status(500).send('Erro na API');
    }

    const buffer = await response.arrayBuffer();
    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(buffer));

    fs.unlinkSync(req.file.path);
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
