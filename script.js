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

    const formData = new FormData();
    formData.append('image', file);

    try {
        // ⚠️ Chamada para SEU backend
        const response = await fetch('/remove-bg', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Erro ao remover fundo');

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        resultImg.src = url;
        resultImg.classList.remove('hidden');

        downloadBtn.href = url;
        downloadBtn.download = 'imagem-sem-fundo.png';
        downloadBtn.classList.remove('hidden');

    } catch (err) {
        alert(err.message);
    } finally {
        loading.classList.add('hidden');
    }
});