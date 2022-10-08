interface Address {
    cep: string,
    number: string,
    street: string
}
  
export class User {
    public name!: string;
    public email!: string;
    public password!: string
    public phone?: Array<string>
    public score?: number
    public address?: Array<Address>

    constructor(props: User) {
        Object.assign(this, props)
    }

}