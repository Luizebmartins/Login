interface Address {
  cep: string,
  number: string,
  street: string
}


export interface ICreateUserRequestDTO {
    name: string,
    email: string,
    password: string,
    phone?: Array<string>,
    score?: number,
    address?: Array<Address>
}
