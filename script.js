const uploadInput = document.getElementById('upload');
const originalImg = document.getElementById('original-img');
const resultImg = document.getElementById('result-img');
const loading = document.getElementById('loading');
const downloadBtn = document.getElementById('download-btn');

uploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Mostrar prévia
    originalImg.src = URL.createObjectURL(file);
    
    loading.classList.remove('hidden');
    resultImg.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    try {
        // Tenta encontrar a função de remoção no objeto global
        // No bundle atual, ela geralmente fica em window.imglyRemoveBackground
        const removeFn = window.imglyRemoveBackground;

        if (!removeFn) {
            throw new Error("A biblioteca ainda está carregando ou o celular bloqueou o script. Tente recarregar a página.");
        }

        // Executa a remoção (pode ser a função direta ou um método interno)
        let blob;
        if (typeof removeFn === 'function') {
            blob = await removeFn(file);
        } else if (typeof removeFn.removeBackground === 'function') {
            blob = await removeFn.removeBackground(file);
        }

        const url = URL.createObjectURL(blob);
        resultImg.src = url;
        resultImg.classList.remove('hidden');
        
        downloadBtn.href = url;
        downloadBtn.download = "sem-fundo.png";
        downloadBtn.classList.remove('hidden');

    } catch (error) {
        console.error("Erro detalhado:", error);
        alert("Erro: " + error.message);
    } finally {
        loading.classList.add('hidden');
    }
});
