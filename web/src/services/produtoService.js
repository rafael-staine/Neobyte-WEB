const API_BASE_URL = 'http://localhost:4000'; // Remove a barra final

export async function getProdutos() {
    try {
        const response = await fetch(`${API_BASE_URL}/product`); // Corrigido o endpoint
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const data = await response.json();
        return data.products; // Acessa a propriedade 'products' da resposta
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}