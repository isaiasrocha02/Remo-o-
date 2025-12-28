const uploadInput = document.getElementById('upload');
const startBtn = document.getElementById('startBtn');
const originalImg = document.getElementById('original-img');
const resultImg = document.getElementById('result-img');
const loading = document.getElementById('loading');
const downloadBtn = document.getElementById('download-btn');

let selectedFile = null;

uploadInput.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (!selectedFile) return;

    originalImg.src = URL.createObjectURL(selectedFile);
});

startBtn.addEventListener('click', async () => {
    if (!selectedFile) {
        alert('Selecione uma imagem primeiro');
        return;
    }

    loading.classList.remove('hidden');
    resultImg.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    try {
        if (!window.removeBackground) {
            throw new Error('IA não suportada neste navegador');
        }

        const resultBlob = await window.removeBackground(selectedFile);
        const url = URL.createObjectURL(resultBlob);

        resultImg.src = url;
        resultImg.classList.remove('hidden');

        downloadBtn.href = url;
        downloadBtn.download = 'imagem-sem-fundo.png';
        downloadBtn.classList.remove('hidden');

    } catch (err) {
        alert(
            'Erro ao remover fundo.\n\n' +
            '👉 No celular e GitHub Pages, essa IA pode falhar.\n' +
            '👉 Tente Chrome atualizado ou outra solução.'
        );
        console.error(err);
    } finally {
        loading.classList.add('hidden');
    }
});