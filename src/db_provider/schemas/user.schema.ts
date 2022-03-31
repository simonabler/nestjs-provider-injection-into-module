import { Schema, model, Model, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  // Declaring everything that is not in the GraphQL Schema for a User
  username: string;
  email: string;
  password: string;
  salt: string;
  permissions: string[];
  enabled: boolean;
  passwordReset?: {
    token: string;
    expiration: Date;
  };

  /**
   * Checks if the user's password provided matches the user's password hash
   *
   * @param {string} password The password to attempt
   * @returns {Promise<boolean>} result of the match. Will throw an error if one exists from bcrypt
   */
  checkPassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<UserDocument> {
  /**
   * Uses the same method as the schema to validate an email. Matches HTML 5.2 spec.
   *
   * @param {string} email address to validate
   * @returns {boolean} if the email is valid
   * @memberof IUserModel
   */
  validateEmail(email: string): boolean;
}

export const PasswordResetSchema: Schema = new Schema({
  token: { type: String, required: true },
  expiration: { type: Date, required: true },
});

export const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      validate: { validator: validateEmail },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    permissions: {
      type: [String],
      required: true,
    },

    passwordReset: PasswordResetSchema,
    enabled: {
      type: Boolean,
      default: true,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

function validateEmail(email: string) {
  // tslint:disable-next-line:max-line-length
  const expression =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return expression.test(email);
}

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre<UserDocument>('save', function (next) {
  const self = this;

  self.username = self.username.toLowerCase();
  self.email = self.email.toLowerCase();

  // Make sure not to rehash the password if it is already hashed
  if (!self.isModified('password')) {
    return next();
  }

  // Generate a salt and use it to hash the user's password
  bcrypt.genSalt(10, (genSaltError, salt) => {
    if (genSaltError) {
      return next(genSaltError);
    }

    bcrypt.hash(self.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      self.password = hash;
      next();
    });
  });
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const updateFields = await this.model.findOne(this.getQuery());

  if (updateFields.username) {
    this.update(
      {},
      { $set: { lowercaseUsername: updateFields.username.toLowerCase() } },
    );
  }

  if (updateFields.email) {
    this.update(
      {},
      { $set: { lowercaseEmail: updateFields.email.toLowerCase() } },
    );
  }

  // Generate a salt and use it to hash the user's password
  if (updateFields.password) {
    bcrypt.genSalt(10, (genSaltError, salt) => {
      if (genSaltError) {
        return next(genSaltError);
      }

      bcrypt.hash(updateFields.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        updateFields.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = function (
  password: string,
): Promise<boolean> {
  const self = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, self.password, (error, isMatch) => {
      if (error) {
        reject(error);
      }
      resolve(isMatch);
    });
  });
};

// Mongoose Static Method - added so a service can validate an email with the same criteria the schema is using
UserSchema.statics.validateEmail = function (email: string): boolean {
  return validateEmail(email);
};

export const UserModel: IUserModel = model<UserDocument, IUserModel>(
  'User',
  UserSchema,
);
