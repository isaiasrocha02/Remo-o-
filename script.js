document.addEventListener('DOMContentLoaded', () => {
    const uploadInput = document.getElementById('upload');
    const originalImg = document.getElementById('original-img');
    const resultImg = document.getElementById('result-img');
    const loading = document.getElementById('loading');
    const downloadBtn = document.getElementById('download-btn');

    uploadInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Limpar estados anteriores
        originalImg.src = URL.createObjectURL(file);
        resultImg.classList.add('hidden');
        downloadBtn.classList.add('hidden');
        loading.classList.remove('hidden');

        try {
            // Verificar se a biblioteca existe no objeto window
            const imgly = window.imglyRemoveBackground;

            if (!imgly) {
                throw new Error("A biblioteca de IA ainda está a carregar. Tente novamente em 5 segundos.");
            }

            // Executar a remoção de fundo
            // Dependendo da versão, pode ser imgly(file) ou imgly.removeBackground(file)
            const blob = await (typeof imgly === 'function' ? imgly(file) : imgly.removeBackground(file));
            
            const url = URL.createObjectURL(blob);
            resultImg.src = url;
            resultImg.classList.remove('hidden');
            
            downloadBtn.href = url;
            downloadBtn.download = "foto-sem-fundo.png";
            downloadBtn.classList.remove('hidden');

        } catch (error) {
            console.error("Erro:", error);
            alert(error.message);
        } finally {
            loading.classList.add('hidden');
        }
    });
});
