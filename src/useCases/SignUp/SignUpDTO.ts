interface Address {
  cep: string,
  number: string,
  street: string
}


export interface ICreateUserRequestDTO {
  name: string
  password: string
  email: string
  phone: string
  score?: number | null
  street?: string
  homeNumber?: string
}
