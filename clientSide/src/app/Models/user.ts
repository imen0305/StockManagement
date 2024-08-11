export class User {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public taxNumber: string;
    public role: string;
    public password: string;

    constructor() {
      this.userId = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.taxNumber = '';
      this.role = '';
      this.password = '';

    }
  }