interface Message{
    readonly message: string;
    readonly error: boolean;
}


export interface CompanyRequest {
    abertura: string;
    situacao: string;
    tipo: string;
    nome: string;
    fantasia: string;
    porte: string;
    logradouro: string;
    numero: string;
    complemento: string;
    municipio: string;
    bairro: string;
    uf: string;
    cep: string;
    email: string;
    telefone: string;
    cnpj: string;
    status: string;
    capital_social: string;
}

export default Message;