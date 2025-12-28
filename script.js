const uploadInput = document.getElementById('upload');
const originalImg = document.getElementById('original-img');
const resultImg = document.getElementById('result-img');
const loading = document.getElementById('loading');
const downloadBtn = document.getElementById('download-btn');

uploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Mostrar prévia da original
    originalImg.src = URL.createObjectURL(file);
    
    loading.classList.remove('hidden');
    resultImg.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    // FormData para enviar a imagem
    const formData = new FormData();
    formData.append('image', file);

    try {
        // Usaremos uma API pública de remoção de fundo (ex: Remove.bg ou similar)
        // Nota: Para fins de teste, você pode usar o remove.bg (requer API KEY gratuita)
        const response = await fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': 'SUA_API_KEY_AQUI' // Cadastre-se em remove.bg e cole a chave aqui
            },
            body: formData
        });

        if (!response.ok) throw new Error("Falha na conexão com o servidor de IA");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        resultImg.src = url;
        resultImg.classList.remove('hidden');
        downloadBtn.href = url;
        downloadBtn.download = "resultado.png";
        downloadBtn.classList.remove('hidden');

    } catch (error) {
        alert("Erro: " + error.message);
    } finally {
        loading.classList.add('hidden');
    }
});
