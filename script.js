const uploadInput = document.getElementById('upload');
const originalImg = document.getElementById('original-img');
const resultImg = document.getElementById('result-img');
const loading = document.getElementById('loading');
const downloadBtn = document.getElementById('download-btn');

uploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    originalImg.src = URL.createObjectURL(file);

    loading.classList.remove('hidden');
    resultImg.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    try {
        const resultBlob = await window.removeBackground(file, {
            output: {
                format: 'image/png'
            }
        });

        const url = URL.createObjectURL(resultBlob);

        resultImg.src = url;
        resultImg.classList.remove('hidden');

        downloadBtn.href = url;
        downloadBtn.download = 'imagem-sem-fundo.png';
        downloadBtn.classList.remove('hidden');

    } catch (err) {
        alert('Erro ao processar a imagem');
        console.error(err);
    } finally {
        loading.classList.add('hidden');
    }
});