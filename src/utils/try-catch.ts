type Success<T> = [
  error: null,
  data: T,
];

type Failure<E> = [
  error: E,
  data: null,
];

type Result<T, E = Error> = Success<T> | Failure<E>;

export const tryCatch = async <T, E = Error>(
  promise: Promise<T>|(() => Promise<T>),
): Promise<Result<T, E>> => {
  try {
    const data = await (typeof promise === 'function' ? promise() : promise);
    return [null, data];
  } catch (error) {
    // console.warn('try:catch:error :>> ', error);
    return [error as E, null];
  }
};

export default tryCatch;

/** Example usage:
const [error, data] = await tryCatch(Promise.resolve('hello'));

if (error) {
  console.error(error);
} else {
  // data is known to be non-null
  console.log(data);
}
 */
