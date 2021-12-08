declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
    };
  }
}

// https://pt.stackoverflow.com/questions/484434/typescript-error-property-user-does-not-exist-on-type-requestparamsdictionar
// nova forma de declarar e sobrescrever os types do express
