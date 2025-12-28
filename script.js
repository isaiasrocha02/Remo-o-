const uploadInput = document.getElementById('upload');
const originalImg = document.getElementById('original-img');
const resultImg = document.getElementById('result-img');
const loading = document.getElementById('loading');
const downloadBtn = document.getElementById('download-btn');

uploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Mostrar prévia da original
    originalImg.src = URL.createObjectURL(file);
    
    // 2. Preparar Interface
    loading.classList.remove('hidden');
    resultImg.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    try {
        // CORREÇÃO AQUI: 
        // No bundle atual, a função costuma estar dentro de imglyRemoveBackground.removeBackground
        // ou diretamente como a própria variável imglyRemoveBackground se for uma função.
        
        let blob;
        if (typeof imglyRemoveBackground === 'function') {
            blob = await imglyRemoveBackground(file);
        } else if (imglyRemoveBackground && typeof imglyRemoveBackground.removeBackground === 'function') {
            blob = await imglyRemoveBackground.removeBackground(file);
        } else {
            throw new Error("Biblioteca não carregada corretamente.");
        }
        
        // 3. Exibir Resultado
        const url = URL.createObjectURL(blob);
        resultImg.src = url;
        resultImg.classList.remove('hidden');
        
        // 4. Configurar Download
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
