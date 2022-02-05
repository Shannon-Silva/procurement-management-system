

export class ApplicationUser {

  constructor(

    public emp_ID: string,
    public emp_type: string,
    public firstname: string,
    public lastname: string,
    public address: string,
    public email: string,
    public phone: string,
    public username: string,
    public password: string,
    public authorities: any[]
  ) { }
}
