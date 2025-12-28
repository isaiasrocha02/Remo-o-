const uploadInput = document.getElementById('upload');
const originalImg = document.getElementById('original-img');
const resultImg = document.getElementById('result-img');
const loading = document.getElementById('loading');
const downloadBtn = document.getElementById('download-btn');

uploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Mostrar prévia da imagem original
    const reader = new FileReader();
    reader.onload = (event) => {
        originalImg.src = event.target.result;
    };
    reader.readAsDataURL(file);
    
    // 2. Preparar Interface
    loading.classList.remove('hidden');
    resultImg.src = "";
    resultImg.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    try {
        // 3. Chamar a biblioteca imgly (Função global disponível pelo bundle.js)
        // O primeiro carregamento baixa os modelos de IA (~80MB)
        const blob = await imglyRemoveBackground(file);
        
        // 4. Exibir Resultado
        const url = URL.createObjectURL(blob);
        resultImg.src = url;
        resultImg.classList.remove('hidden');
        
        // 5. Configurar Download
        downloadBtn.href = url;
        downloadBtn.download = "imagem_sem_fundo.png";
        downloadBtn.classList.remove('hidden');

    } catch (error) {
        console.error("Erro detalhado:", error);
        alert("Erro ao processar. Verifique o console (F12) para detalhes de segurança.");
    } finally {
        loading.classList.add('hidden');
    }
});
