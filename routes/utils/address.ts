import axios from "axios";

export async function getAddressByCep(value: string): Promise< any | string> {
    try {
        
        const cep = value.replace("-", "")
        if (cep.length != 8)
            return "O CEP informado é inválido. O CEP deve conter exatamente 8 caracteres";

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const addressData = response.data;
        if(addressData.erro)
            return "Desculpe, mas o CEP informado não foi encontrado.";

        const address = {
            address: addressData.logradouro,
            neighborhood: addressData.bairro,
            city: addressData.localidade,
            state: addressData.uf
        }
        return address;

    } catch (error) {
        return `Error retrieving address: ${error}`; 
    }
}