import { Document, Model, model, Types, Schema, Query } from 'mongoose';
import crypto from 'crypto';

export interface IUserModel extends Document {
  uid: string;
  username: string;
  email: string;
  created: Date;
  totalSpend: number;
  totalPlays: number;
  credits: number;
  flags: [string];
}

const schema = Schema({
  uid: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
  },
  totalSpend: {
    type: Number,
  },
  totalPlays: {
    type: Number,
  },
  credits: {
    type: Number,
  },
  flags: [
    {
      type: String,
    },
  ],
  badges: [
    {
      type: String,
    },
  ],
}).pre('save', (next) => {
  if (this._doc) {
    const doc = <IUserModel>this._doc;
    const now = new Date();
    if (!doc.created) {
      doc.created = now;
    }
    if (!doc.totalSpend) {
      doc.totalSpend = 0.0;
    }
    if (!doc.totalPlays) {
      doc.totalPlays = 0;
    }
    if (!doc.credits) {
      doc.credits = 50; // bonus credits for signing up, should be a config file
    }
  }
  next();
  return this;
});

export const UserSchema = model<IUserModel>('users', schema);

export class UserModel {
  private _userModel: IUserModel;

  constructor(userModel: IUserModel) {
    this._userModel = userModel;
  }

  get uid(): string {
    return this._userModel.uid;
  }

  get username(): string {
    return this._userModel.username;
  }

  get email(): string {
    return this._userModel.email;
  }

  get created(): Date {
    return this._userModel.created;
  }

  get totalSpend(): number {
    return this._userModel.totalSpend;
  }

  get totalPlays(): number {
    return this._userModel.totalPlays;
  }

  get credits(): number {
    return this._userModel.credits;
  }

  get flags(): [string] {
    return this._userModel.flags;
  }

  static createUser(username: string, email: string) {
    const p = new Promise((resolve, reject) => {
      const repo = new UserRepository();
      const user = <IUserModel>{
        uid: crypto.randomBytes(64).toString('hex'),
        username,
        email,
      };
      repo.create(user, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
    return p;
  }

  static findUserByUid(uid: string) {
    const p = new Promise((resolve, reject) => {
      const repo = new UserRepository();
      repo
        .find({ uid })
        .sort({ created: -1 })
        .limit(1)
        .exec((err, res) => {
          if (err) {
            reject(err);
          } else if (res.length) {
            resolve(res[0]);
          } else {
            resolve(null); // not found
          }
        });
    });
    return p;
  }

  static findUserByUsername(username: string) {
    const p = new Promise((resolve, reject) => {
      const repo = new UserRepository();
      repo
        .find({ username })
        .sort({ created: -1 })
        .limit(1)
        .exec((err, res) => {
          if (err) {
            reject(err);
          } else if (res.length) {
            resolve(res[0]);
          } else {
            resolve(null); // not found
          }
        });
    });
    return p;
  }

  static findUserByEmail(email: string) {
    const p = new Promise((resolve, reject) => {
      const repo = new UserRepository();
      repo
        .find({ email })
        .sort({ created: -1 })
        .limit(1)
        .exec((err, res) => {
          if (err) {
            reject(err);
          } else if (res.length) {
            resolve(res[0]);
          } else {
            resolve(null); // not found
          }
        });
    });
    return p;
  }
}

Object.seal(UserModel);

export interface IRead<T> {
  retrieve: (callback: (error: any, result: any) => void) => void;
  findById: (id: string, callback: (error: any, result: T) => void) => void;
  findOne(cond?: Object, callback?: (err: any, res: T) => void): Query<T>;
  find(cond: Object, fields: Object, options: Object, callback?: (err: any, res: T[]) => void): Query<T[]>;
}

export interface IWrite<T> {
  create: (item: T, callback: (error: any, result: any) => void) => void;
  update: (_id: Types.ObjectId, item: T, callback: (error: any, result: any) => void) => void;
  delete: (_id: string, callback: (error: any, result: any) => void) => void;
}

export class RepositoryBase<T extends Document> implements IRead<T>, IWrite<T> {
  private _model: Model<Document>;

  constructor(schemaModel: Model<Document>) {
    this._model = schemaModel;
  }

  create(item: T, callback: (error: any, result: T) => void) {
    this._model.create(item, callback);
  }

  retrieve(callback: (error: any, result: T) => void) {
    this._model.find({}, callback);
  }

  update(_id: Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
    this._model.update({ _id }, item, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
  }

  findById(_id: string, callback: (error: any, result: T) => void) {
    this._model.findById(_id, callback);
  }

  findOne(cond?: Object, callback?: (err: any, res: T) => void): Query<T> {
    return this._model.findOne(cond, callback);
  }

  find(cond?: Object, fields?: Object, options?: Object, callback?: (err: any, res: T[]) => void): Query<T[]> {
    return this._model.find(cond, options, callback);
  }

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}

export class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}

Object.seal(UserRepository);
