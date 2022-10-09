interface Address {
    cep: string,
    number: string,
    street: string
}
  
export class User {
    public name!: string
    public email!: string
    public password!: string
    public phone?: Array<string>
    public score?: number
    public address?: Array<Address>
    public t_admin?: boolean
    public t_adop?: boolean
    public t_volunt?: boolean

    constructor(props: User) {
        Object.assign(this, props)
        this.score = props.score || 0
        this.t_admin = props.t_admin || false
        this.t_adop = props.t_adop || false
        this.t_volunt = props.t_volunt || false
    }

}