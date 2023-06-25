export interface addressType  {
    readonly address: string;
    readonly neighborhood: string;
    readonly city: string;
    readonly state: string;
}

export interface addressTypeCadaster extends addressType {
    readonly cep: string;
    readonly number: number;
    readonly complement: string;
}