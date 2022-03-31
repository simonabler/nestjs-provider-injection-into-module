import { User as UserLib } from '../../../libs/my-lib/src/model/user.model';

export class User extends UserLib {
  salt: string;
}
