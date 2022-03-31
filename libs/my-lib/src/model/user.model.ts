export class User {
  id!: string;
  username: string;
  password?: string;
  permissions: string[];

  constructor(base?: Partial<User>) {
    Object.assign(this, base);
  }
}
