export namespace TypeCheck {
  export const isArray = (obj: any) => {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  export const toArray = <T>(obj: any): Array<T> => {
    if (isArray(obj)) {
      return obj;
    }

    return Array.of(obj);
  }
}
