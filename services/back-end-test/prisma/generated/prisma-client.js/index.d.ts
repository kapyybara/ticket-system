
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model MasterDataDef
 * 
 */
export type MasterDataDef = {
  id: number
  name: string
  code: string
  description: string
  displayField: string[]
}

/**
 * Model FieldDef
 * 
 */
export type FieldDef = {
  id: number
  name: string
  code: string
  type: Prisma.JsonValue
  onwerId: number
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MasterDataDefs
 * const masterDataDefs = await prisma.masterDataDef.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MasterDataDefs
   * const masterDataDefs = await prisma.masterDataDef.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.masterDataDef`: Exposes CRUD operations for the **MasterDataDef** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MasterDataDefs
    * const masterDataDefs = await prisma.masterDataDef.findMany()
    * ```
    */
  get masterDataDef(): Prisma.MasterDataDefDelegate<GlobalReject>;

  /**
   * `prisma.fieldDef`: Exposes CRUD operations for the **FieldDef** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FieldDefs
    * const fieldDefs = await prisma.fieldDef.findMany()
    * ```
    */
  get fieldDef(): Prisma.FieldDefDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.12.0
   * Query Engine version: 659ef412370fa3b41cd7bf6e94587c1dfb7f67e7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    MasterDataDef: 'MasterDataDef',
    FieldDef: 'FieldDef'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MasterDataDefCountOutputType
   */


  export type MasterDataDefCountOutputType = {
    form: number
  }

  export type MasterDataDefCountOutputTypeSelect = {
    form?: boolean
  }

  export type MasterDataDefCountOutputTypeGetPayload<S extends boolean | null | undefined | MasterDataDefCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? MasterDataDefCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (MasterDataDefCountOutputTypeArgs)
    ? MasterDataDefCountOutputType 
    : S extends { select: any } & (MasterDataDefCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof MasterDataDefCountOutputType ? MasterDataDefCountOutputType[P] : never
  } 
      : MasterDataDefCountOutputType




  // Custom InputTypes

  /**
   * MasterDataDefCountOutputType without action
   */
  export type MasterDataDefCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDefCountOutputType
     */
    select?: MasterDataDefCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model MasterDataDef
   */


  export type AggregateMasterDataDef = {
    _count: MasterDataDefCountAggregateOutputType | null
    _avg: MasterDataDefAvgAggregateOutputType | null
    _sum: MasterDataDefSumAggregateOutputType | null
    _min: MasterDataDefMinAggregateOutputType | null
    _max: MasterDataDefMaxAggregateOutputType | null
  }

  export type MasterDataDefAvgAggregateOutputType = {
    id: number | null
  }

  export type MasterDataDefSumAggregateOutputType = {
    id: number | null
  }

  export type MasterDataDefMinAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    description: string | null
  }

  export type MasterDataDefMaxAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    description: string | null
  }

  export type MasterDataDefCountAggregateOutputType = {
    id: number
    name: number
    code: number
    description: number
    displayField: number
    _all: number
  }


  export type MasterDataDefAvgAggregateInputType = {
    id?: true
  }

  export type MasterDataDefSumAggregateInputType = {
    id?: true
  }

  export type MasterDataDefMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    description?: true
  }

  export type MasterDataDefMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    description?: true
  }

  export type MasterDataDefCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    description?: true
    displayField?: true
    _all?: true
  }

  export type MasterDataDefAggregateArgs = {
    /**
     * Filter which MasterDataDef to aggregate.
     */
    where?: MasterDataDefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterDataDefs to fetch.
     */
    orderBy?: Enumerable<MasterDataDefOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MasterDataDefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterDataDefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterDataDefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MasterDataDefs
    **/
    _count?: true | MasterDataDefCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MasterDataDefAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MasterDataDefSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MasterDataDefMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MasterDataDefMaxAggregateInputType
  }

  export type GetMasterDataDefAggregateType<T extends MasterDataDefAggregateArgs> = {
        [P in keyof T & keyof AggregateMasterDataDef]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMasterDataDef[P]>
      : GetScalarType<T[P], AggregateMasterDataDef[P]>
  }




  export type MasterDataDefGroupByArgs = {
    where?: MasterDataDefWhereInput
    orderBy?: Enumerable<MasterDataDefOrderByWithAggregationInput>
    by: MasterDataDefScalarFieldEnum[]
    having?: MasterDataDefScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MasterDataDefCountAggregateInputType | true
    _avg?: MasterDataDefAvgAggregateInputType
    _sum?: MasterDataDefSumAggregateInputType
    _min?: MasterDataDefMinAggregateInputType
    _max?: MasterDataDefMaxAggregateInputType
  }


  export type MasterDataDefGroupByOutputType = {
    id: number
    name: string
    code: string
    description: string
    displayField: string[]
    _count: MasterDataDefCountAggregateOutputType | null
    _avg: MasterDataDefAvgAggregateOutputType | null
    _sum: MasterDataDefSumAggregateOutputType | null
    _min: MasterDataDefMinAggregateOutputType | null
    _max: MasterDataDefMaxAggregateOutputType | null
  }

  type GetMasterDataDefGroupByPayload<T extends MasterDataDefGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<MasterDataDefGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MasterDataDefGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MasterDataDefGroupByOutputType[P]>
            : GetScalarType<T[P], MasterDataDefGroupByOutputType[P]>
        }
      >
    >


  export type MasterDataDefSelect = {
    id?: boolean
    name?: boolean
    code?: boolean
    description?: boolean
    displayField?: boolean
    form?: boolean | MasterDataDef$formArgs
    _count?: boolean | MasterDataDefCountOutputTypeArgs
  }


  export type MasterDataDefInclude = {
    form?: boolean | MasterDataDef$formArgs
    _count?: boolean | MasterDataDefCountOutputTypeArgs
  }

  export type MasterDataDefGetPayload<S extends boolean | null | undefined | MasterDataDefArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? MasterDataDef :
    S extends undefined ? never :
    S extends { include: any } & (MasterDataDefArgs | MasterDataDefFindManyArgs)
    ? MasterDataDef  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'form' ? Array < FieldDefGetPayload<S['include'][P]>>  :
        P extends '_count' ? MasterDataDefCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (MasterDataDefArgs | MasterDataDefFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'form' ? Array < FieldDefGetPayload<S['select'][P]>>  :
        P extends '_count' ? MasterDataDefCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof MasterDataDef ? MasterDataDef[P] : never
  } 
      : MasterDataDef


  type MasterDataDefCountArgs = 
    Omit<MasterDataDefFindManyArgs, 'select' | 'include'> & {
      select?: MasterDataDefCountAggregateInputType | true
    }

  export interface MasterDataDefDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one MasterDataDef that matches the filter.
     * @param {MasterDataDefFindUniqueArgs} args - Arguments to find a MasterDataDef
     * @example
     * // Get one MasterDataDef
     * const masterDataDef = await prisma.masterDataDef.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MasterDataDefFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MasterDataDefFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'MasterDataDef'> extends True ? Prisma__MasterDataDefClient<MasterDataDefGetPayload<T>> : Prisma__MasterDataDefClient<MasterDataDefGetPayload<T> | null, null>

    /**
     * Find one MasterDataDef that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MasterDataDefFindUniqueOrThrowArgs} args - Arguments to find a MasterDataDef
     * @example
     * // Get one MasterDataDef
     * const masterDataDef = await prisma.masterDataDef.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MasterDataDefFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, MasterDataDefFindUniqueOrThrowArgs>
    ): Prisma__MasterDataDefClient<MasterDataDefGetPayload<T>>

    /**
     * Find the first MasterDataDef that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataDefFindFirstArgs} args - Arguments to find a MasterDataDef
     * @example
     * // Get one MasterDataDef
     * const masterDataDef = await prisma.masterDataDef.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MasterDataDefFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MasterDataDefFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'MasterDataDef'> extends True ? Prisma__MasterDataDefClient<MasterDataDefGetPayload<T>> : Prisma__MasterDataDefClient<MasterDataDefGetPayload<T> | null, null>

    /**
     * Find the first MasterDataDef that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataDefFindFirstOrThrowArgs} args - Arguments to find a MasterDataDef
     * @example
     * // Get one MasterDataDef
     * const masterDataDef = await prisma.masterDataDef.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MasterDataDefFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MasterDataDefFindFirstOrThrowArgs>
    ): Prisma__MasterDataDefClient<MasterDataDefGetPayload<T>>

    /**
     * Find zero or more MasterDataDefs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataDefFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MasterDataDefs
     * const masterDataDefs = await prisma.masterDataDef.findMany()
     * 
     * // Get first 10 MasterDataDefs
     * const masterDataDefs = await prisma.masterDataDef.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const masterDataDefWithIdOnly = await prisma.masterDataDef.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MasterDataDefFindManyArgs>(
      args?: SelectSubset<T, MasterDataDefFindManyArgs>
    ): Prisma.PrismaPromise<Array<MasterDataDefGetPayload<T>>>

    /**
     * Create a MasterDataDef.
     * @param {MasterDataDefCreateArgs} args - Arguments to create a MasterDataDef.
     * @example
     * // Create one MasterDataDef
     * const MasterDataDef = await prisma.masterDataDef.create({
     *   data: {
     *     // ... data to create a MasterDataDef
     *   }
     * })
     * 
    **/
    create<T extends MasterDataDefCreateArgs>(
      args: SelectSubset<T, MasterDataDefCreateArgs>
    ): Prisma__MasterDataDefClient<MasterDataDefGetPayload<T>>

    /**
     * Create many MasterDataDefs.
     *     @param {MasterDataDefCreateManyArgs} args - Arguments to create many MasterDataDefs.
     *     @example
     *     // Create many MasterDataDefs
     *     const masterDataDef = await prisma.masterDataDef.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MasterDataDefCreateManyArgs>(
      args?: SelectSubset<T, MasterDataDefCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MasterDataDef.
     * @param {MasterDataDefDeleteArgs} args - Arguments to delete one MasterDataDef.
     * @example
     * // Delete one MasterDataDef
     * const MasterDataDef = await prisma.masterDataDef.delete({
     *   where: {
     *     // ... filter to delete one MasterDataDef
     *   }
     * })
     * 
    **/
    delete<T extends MasterDataDefDeleteArgs>(
      args: SelectSubset<T, MasterDataDefDeleteArgs>
    ): Prisma__MasterDataDefClient<MasterDataDefGetPayload<T>>

    /**
     * Update one MasterDataDef.
     * @param {MasterDataDefUpdateArgs} args - Arguments to update one MasterDataDef.
     * @example
     * // Update one MasterDataDef
     * const masterDataDef = await prisma.masterDataDef.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MasterDataDefUpdateArgs>(
      args: SelectSubset<T, MasterDataDefUpdateArgs>
    ): Prisma__MasterDataDefClient<MasterDataDefGetPayload<T>>

    /**
     * Delete zero or more MasterDataDefs.
     * @param {MasterDataDefDeleteManyArgs} args - Arguments to filter MasterDataDefs to delete.
     * @example
     * // Delete a few MasterDataDefs
     * const { count } = await prisma.masterDataDef.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MasterDataDefDeleteManyArgs>(
      args?: SelectSubset<T, MasterDataDefDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MasterDataDefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataDefUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MasterDataDefs
     * const masterDataDef = await prisma.masterDataDef.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MasterDataDefUpdateManyArgs>(
      args: SelectSubset<T, MasterDataDefUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MasterDataDef.
     * @param {MasterDataDefUpsertArgs} args - Arguments to update or create a MasterDataDef.
     * @example
     * // Update or create a MasterDataDef
     * const masterDataDef = await prisma.masterDataDef.upsert({
     *   create: {
     *     // ... data to create a MasterDataDef
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MasterDataDef we want to update
     *   }
     * })
    **/
    upsert<T extends MasterDataDefUpsertArgs>(
      args: SelectSubset<T, MasterDataDefUpsertArgs>
    ): Prisma__MasterDataDefClient<MasterDataDefGetPayload<T>>

    /**
     * Count the number of MasterDataDefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataDefCountArgs} args - Arguments to filter MasterDataDefs to count.
     * @example
     * // Count the number of MasterDataDefs
     * const count = await prisma.masterDataDef.count({
     *   where: {
     *     // ... the filter for the MasterDataDefs we want to count
     *   }
     * })
    **/
    count<T extends MasterDataDefCountArgs>(
      args?: Subset<T, MasterDataDefCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MasterDataDefCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MasterDataDef.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataDefAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MasterDataDefAggregateArgs>(args: Subset<T, MasterDataDefAggregateArgs>): Prisma.PrismaPromise<GetMasterDataDefAggregateType<T>>

    /**
     * Group by MasterDataDef.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MasterDataDefGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MasterDataDefGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MasterDataDefGroupByArgs['orderBy'] }
        : { orderBy?: MasterDataDefGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MasterDataDefGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMasterDataDefGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for MasterDataDef.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MasterDataDefClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    form<T extends MasterDataDef$formArgs= {}>(args?: Subset<T, MasterDataDef$formArgs>): Prisma.PrismaPromise<Array<FieldDefGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * MasterDataDef base type for findUnique actions
   */
  export type MasterDataDefFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * Filter, which MasterDataDef to fetch.
     */
    where: MasterDataDefWhereUniqueInput
  }

  /**
   * MasterDataDef findUnique
   */
  export interface MasterDataDefFindUniqueArgs extends MasterDataDefFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MasterDataDef findUniqueOrThrow
   */
  export type MasterDataDefFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * Filter, which MasterDataDef to fetch.
     */
    where: MasterDataDefWhereUniqueInput
  }


  /**
   * MasterDataDef base type for findFirst actions
   */
  export type MasterDataDefFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * Filter, which MasterDataDef to fetch.
     */
    where?: MasterDataDefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterDataDefs to fetch.
     */
    orderBy?: Enumerable<MasterDataDefOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterDataDefs.
     */
    cursor?: MasterDataDefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterDataDefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterDataDefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterDataDefs.
     */
    distinct?: Enumerable<MasterDataDefScalarFieldEnum>
  }

  /**
   * MasterDataDef findFirst
   */
  export interface MasterDataDefFindFirstArgs extends MasterDataDefFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MasterDataDef findFirstOrThrow
   */
  export type MasterDataDefFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * Filter, which MasterDataDef to fetch.
     */
    where?: MasterDataDefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterDataDefs to fetch.
     */
    orderBy?: Enumerable<MasterDataDefOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MasterDataDefs.
     */
    cursor?: MasterDataDefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterDataDefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterDataDefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MasterDataDefs.
     */
    distinct?: Enumerable<MasterDataDefScalarFieldEnum>
  }


  /**
   * MasterDataDef findMany
   */
  export type MasterDataDefFindManyArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * Filter, which MasterDataDefs to fetch.
     */
    where?: MasterDataDefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MasterDataDefs to fetch.
     */
    orderBy?: Enumerable<MasterDataDefOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MasterDataDefs.
     */
    cursor?: MasterDataDefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MasterDataDefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MasterDataDefs.
     */
    skip?: number
    distinct?: Enumerable<MasterDataDefScalarFieldEnum>
  }


  /**
   * MasterDataDef create
   */
  export type MasterDataDefCreateArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * The data needed to create a MasterDataDef.
     */
    data: XOR<MasterDataDefCreateInput, MasterDataDefUncheckedCreateInput>
  }


  /**
   * MasterDataDef createMany
   */
  export type MasterDataDefCreateManyArgs = {
    /**
     * The data used to create many MasterDataDefs.
     */
    data: Enumerable<MasterDataDefCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * MasterDataDef update
   */
  export type MasterDataDefUpdateArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * The data needed to update a MasterDataDef.
     */
    data: XOR<MasterDataDefUpdateInput, MasterDataDefUncheckedUpdateInput>
    /**
     * Choose, which MasterDataDef to update.
     */
    where: MasterDataDefWhereUniqueInput
  }


  /**
   * MasterDataDef updateMany
   */
  export type MasterDataDefUpdateManyArgs = {
    /**
     * The data used to update MasterDataDefs.
     */
    data: XOR<MasterDataDefUpdateManyMutationInput, MasterDataDefUncheckedUpdateManyInput>
    /**
     * Filter which MasterDataDefs to update
     */
    where?: MasterDataDefWhereInput
  }


  /**
   * MasterDataDef upsert
   */
  export type MasterDataDefUpsertArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * The filter to search for the MasterDataDef to update in case it exists.
     */
    where: MasterDataDefWhereUniqueInput
    /**
     * In case the MasterDataDef found by the `where` argument doesn't exist, create a new MasterDataDef with this data.
     */
    create: XOR<MasterDataDefCreateInput, MasterDataDefUncheckedCreateInput>
    /**
     * In case the MasterDataDef was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MasterDataDefUpdateInput, MasterDataDefUncheckedUpdateInput>
  }


  /**
   * MasterDataDef delete
   */
  export type MasterDataDefDeleteArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
    /**
     * Filter which MasterDataDef to delete.
     */
    where: MasterDataDefWhereUniqueInput
  }


  /**
   * MasterDataDef deleteMany
   */
  export type MasterDataDefDeleteManyArgs = {
    /**
     * Filter which MasterDataDefs to delete
     */
    where?: MasterDataDefWhereInput
  }


  /**
   * MasterDataDef.form
   */
  export type MasterDataDef$formArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    where?: FieldDefWhereInput
    orderBy?: Enumerable<FieldDefOrderByWithRelationInput>
    cursor?: FieldDefWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<FieldDefScalarFieldEnum>
  }


  /**
   * MasterDataDef without action
   */
  export type MasterDataDefArgs = {
    /**
     * Select specific fields to fetch from the MasterDataDef
     */
    select?: MasterDataDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MasterDataDefInclude | null
  }



  /**
   * Model FieldDef
   */


  export type AggregateFieldDef = {
    _count: FieldDefCountAggregateOutputType | null
    _avg: FieldDefAvgAggregateOutputType | null
    _sum: FieldDefSumAggregateOutputType | null
    _min: FieldDefMinAggregateOutputType | null
    _max: FieldDefMaxAggregateOutputType | null
  }

  export type FieldDefAvgAggregateOutputType = {
    id: number | null
    onwerId: number | null
  }

  export type FieldDefSumAggregateOutputType = {
    id: number | null
    onwerId: number | null
  }

  export type FieldDefMinAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    onwerId: number | null
  }

  export type FieldDefMaxAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    onwerId: number | null
  }

  export type FieldDefCountAggregateOutputType = {
    id: number
    name: number
    code: number
    type: number
    onwerId: number
    _all: number
  }


  export type FieldDefAvgAggregateInputType = {
    id?: true
    onwerId?: true
  }

  export type FieldDefSumAggregateInputType = {
    id?: true
    onwerId?: true
  }

  export type FieldDefMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    onwerId?: true
  }

  export type FieldDefMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    onwerId?: true
  }

  export type FieldDefCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    type?: true
    onwerId?: true
    _all?: true
  }

  export type FieldDefAggregateArgs = {
    /**
     * Filter which FieldDef to aggregate.
     */
    where?: FieldDefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldDefs to fetch.
     */
    orderBy?: Enumerable<FieldDefOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FieldDefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldDefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldDefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FieldDefs
    **/
    _count?: true | FieldDefCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FieldDefAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FieldDefSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FieldDefMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FieldDefMaxAggregateInputType
  }

  export type GetFieldDefAggregateType<T extends FieldDefAggregateArgs> = {
        [P in keyof T & keyof AggregateFieldDef]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFieldDef[P]>
      : GetScalarType<T[P], AggregateFieldDef[P]>
  }




  export type FieldDefGroupByArgs = {
    where?: FieldDefWhereInput
    orderBy?: Enumerable<FieldDefOrderByWithAggregationInput>
    by: FieldDefScalarFieldEnum[]
    having?: FieldDefScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FieldDefCountAggregateInputType | true
    _avg?: FieldDefAvgAggregateInputType
    _sum?: FieldDefSumAggregateInputType
    _min?: FieldDefMinAggregateInputType
    _max?: FieldDefMaxAggregateInputType
  }


  export type FieldDefGroupByOutputType = {
    id: number
    name: string
    code: string
    type: JsonValue
    onwerId: number
    _count: FieldDefCountAggregateOutputType | null
    _avg: FieldDefAvgAggregateOutputType | null
    _sum: FieldDefSumAggregateOutputType | null
    _min: FieldDefMinAggregateOutputType | null
    _max: FieldDefMaxAggregateOutputType | null
  }

  type GetFieldDefGroupByPayload<T extends FieldDefGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<FieldDefGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FieldDefGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FieldDefGroupByOutputType[P]>
            : GetScalarType<T[P], FieldDefGroupByOutputType[P]>
        }
      >
    >


  export type FieldDefSelect = {
    id?: boolean
    name?: boolean
    code?: boolean
    type?: boolean
    onwerId?: boolean
    onwer?: boolean | MasterDataDefArgs
  }


  export type FieldDefInclude = {
    onwer?: boolean | MasterDataDefArgs
  }

  export type FieldDefGetPayload<S extends boolean | null | undefined | FieldDefArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? FieldDef :
    S extends undefined ? never :
    S extends { include: any } & (FieldDefArgs | FieldDefFindManyArgs)
    ? FieldDef  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'onwer' ? MasterDataDefGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (FieldDefArgs | FieldDefFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'onwer' ? MasterDataDefGetPayload<S['select'][P]> :  P extends keyof FieldDef ? FieldDef[P] : never
  } 
      : FieldDef


  type FieldDefCountArgs = 
    Omit<FieldDefFindManyArgs, 'select' | 'include'> & {
      select?: FieldDefCountAggregateInputType | true
    }

  export interface FieldDefDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one FieldDef that matches the filter.
     * @param {FieldDefFindUniqueArgs} args - Arguments to find a FieldDef
     * @example
     * // Get one FieldDef
     * const fieldDef = await prisma.fieldDef.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FieldDefFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FieldDefFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'FieldDef'> extends True ? Prisma__FieldDefClient<FieldDefGetPayload<T>> : Prisma__FieldDefClient<FieldDefGetPayload<T> | null, null>

    /**
     * Find one FieldDef that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FieldDefFindUniqueOrThrowArgs} args - Arguments to find a FieldDef
     * @example
     * // Get one FieldDef
     * const fieldDef = await prisma.fieldDef.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FieldDefFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FieldDefFindUniqueOrThrowArgs>
    ): Prisma__FieldDefClient<FieldDefGetPayload<T>>

    /**
     * Find the first FieldDef that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDefFindFirstArgs} args - Arguments to find a FieldDef
     * @example
     * // Get one FieldDef
     * const fieldDef = await prisma.fieldDef.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FieldDefFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FieldDefFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'FieldDef'> extends True ? Prisma__FieldDefClient<FieldDefGetPayload<T>> : Prisma__FieldDefClient<FieldDefGetPayload<T> | null, null>

    /**
     * Find the first FieldDef that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDefFindFirstOrThrowArgs} args - Arguments to find a FieldDef
     * @example
     * // Get one FieldDef
     * const fieldDef = await prisma.fieldDef.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FieldDefFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FieldDefFindFirstOrThrowArgs>
    ): Prisma__FieldDefClient<FieldDefGetPayload<T>>

    /**
     * Find zero or more FieldDefs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDefFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FieldDefs
     * const fieldDefs = await prisma.fieldDef.findMany()
     * 
     * // Get first 10 FieldDefs
     * const fieldDefs = await prisma.fieldDef.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fieldDefWithIdOnly = await prisma.fieldDef.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FieldDefFindManyArgs>(
      args?: SelectSubset<T, FieldDefFindManyArgs>
    ): Prisma.PrismaPromise<Array<FieldDefGetPayload<T>>>

    /**
     * Create a FieldDef.
     * @param {FieldDefCreateArgs} args - Arguments to create a FieldDef.
     * @example
     * // Create one FieldDef
     * const FieldDef = await prisma.fieldDef.create({
     *   data: {
     *     // ... data to create a FieldDef
     *   }
     * })
     * 
    **/
    create<T extends FieldDefCreateArgs>(
      args: SelectSubset<T, FieldDefCreateArgs>
    ): Prisma__FieldDefClient<FieldDefGetPayload<T>>

    /**
     * Create many FieldDefs.
     *     @param {FieldDefCreateManyArgs} args - Arguments to create many FieldDefs.
     *     @example
     *     // Create many FieldDefs
     *     const fieldDef = await prisma.fieldDef.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FieldDefCreateManyArgs>(
      args?: SelectSubset<T, FieldDefCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FieldDef.
     * @param {FieldDefDeleteArgs} args - Arguments to delete one FieldDef.
     * @example
     * // Delete one FieldDef
     * const FieldDef = await prisma.fieldDef.delete({
     *   where: {
     *     // ... filter to delete one FieldDef
     *   }
     * })
     * 
    **/
    delete<T extends FieldDefDeleteArgs>(
      args: SelectSubset<T, FieldDefDeleteArgs>
    ): Prisma__FieldDefClient<FieldDefGetPayload<T>>

    /**
     * Update one FieldDef.
     * @param {FieldDefUpdateArgs} args - Arguments to update one FieldDef.
     * @example
     * // Update one FieldDef
     * const fieldDef = await prisma.fieldDef.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FieldDefUpdateArgs>(
      args: SelectSubset<T, FieldDefUpdateArgs>
    ): Prisma__FieldDefClient<FieldDefGetPayload<T>>

    /**
     * Delete zero or more FieldDefs.
     * @param {FieldDefDeleteManyArgs} args - Arguments to filter FieldDefs to delete.
     * @example
     * // Delete a few FieldDefs
     * const { count } = await prisma.fieldDef.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FieldDefDeleteManyArgs>(
      args?: SelectSubset<T, FieldDefDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FieldDefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDefUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FieldDefs
     * const fieldDef = await prisma.fieldDef.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FieldDefUpdateManyArgs>(
      args: SelectSubset<T, FieldDefUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FieldDef.
     * @param {FieldDefUpsertArgs} args - Arguments to update or create a FieldDef.
     * @example
     * // Update or create a FieldDef
     * const fieldDef = await prisma.fieldDef.upsert({
     *   create: {
     *     // ... data to create a FieldDef
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FieldDef we want to update
     *   }
     * })
    **/
    upsert<T extends FieldDefUpsertArgs>(
      args: SelectSubset<T, FieldDefUpsertArgs>
    ): Prisma__FieldDefClient<FieldDefGetPayload<T>>

    /**
     * Count the number of FieldDefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDefCountArgs} args - Arguments to filter FieldDefs to count.
     * @example
     * // Count the number of FieldDefs
     * const count = await prisma.fieldDef.count({
     *   where: {
     *     // ... the filter for the FieldDefs we want to count
     *   }
     * })
    **/
    count<T extends FieldDefCountArgs>(
      args?: Subset<T, FieldDefCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FieldDefCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FieldDef.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDefAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FieldDefAggregateArgs>(args: Subset<T, FieldDefAggregateArgs>): Prisma.PrismaPromise<GetFieldDefAggregateType<T>>

    /**
     * Group by FieldDef.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FieldDefGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FieldDefGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FieldDefGroupByArgs['orderBy'] }
        : { orderBy?: FieldDefGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FieldDefGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFieldDefGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for FieldDef.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FieldDefClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    onwer<T extends MasterDataDefArgs= {}>(args?: Subset<T, MasterDataDefArgs>): Prisma__MasterDataDefClient<MasterDataDefGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * FieldDef base type for findUnique actions
   */
  export type FieldDefFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * Filter, which FieldDef to fetch.
     */
    where: FieldDefWhereUniqueInput
  }

  /**
   * FieldDef findUnique
   */
  export interface FieldDefFindUniqueArgs extends FieldDefFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FieldDef findUniqueOrThrow
   */
  export type FieldDefFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * Filter, which FieldDef to fetch.
     */
    where: FieldDefWhereUniqueInput
  }


  /**
   * FieldDef base type for findFirst actions
   */
  export type FieldDefFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * Filter, which FieldDef to fetch.
     */
    where?: FieldDefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldDefs to fetch.
     */
    orderBy?: Enumerable<FieldDefOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FieldDefs.
     */
    cursor?: FieldDefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldDefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldDefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FieldDefs.
     */
    distinct?: Enumerable<FieldDefScalarFieldEnum>
  }

  /**
   * FieldDef findFirst
   */
  export interface FieldDefFindFirstArgs extends FieldDefFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FieldDef findFirstOrThrow
   */
  export type FieldDefFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * Filter, which FieldDef to fetch.
     */
    where?: FieldDefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldDefs to fetch.
     */
    orderBy?: Enumerable<FieldDefOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FieldDefs.
     */
    cursor?: FieldDefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldDefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldDefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FieldDefs.
     */
    distinct?: Enumerable<FieldDefScalarFieldEnum>
  }


  /**
   * FieldDef findMany
   */
  export type FieldDefFindManyArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * Filter, which FieldDefs to fetch.
     */
    where?: FieldDefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FieldDefs to fetch.
     */
    orderBy?: Enumerable<FieldDefOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FieldDefs.
     */
    cursor?: FieldDefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FieldDefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FieldDefs.
     */
    skip?: number
    distinct?: Enumerable<FieldDefScalarFieldEnum>
  }


  /**
   * FieldDef create
   */
  export type FieldDefCreateArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * The data needed to create a FieldDef.
     */
    data: XOR<FieldDefCreateInput, FieldDefUncheckedCreateInput>
  }


  /**
   * FieldDef createMany
   */
  export type FieldDefCreateManyArgs = {
    /**
     * The data used to create many FieldDefs.
     */
    data: Enumerable<FieldDefCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * FieldDef update
   */
  export type FieldDefUpdateArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * The data needed to update a FieldDef.
     */
    data: XOR<FieldDefUpdateInput, FieldDefUncheckedUpdateInput>
    /**
     * Choose, which FieldDef to update.
     */
    where: FieldDefWhereUniqueInput
  }


  /**
   * FieldDef updateMany
   */
  export type FieldDefUpdateManyArgs = {
    /**
     * The data used to update FieldDefs.
     */
    data: XOR<FieldDefUpdateManyMutationInput, FieldDefUncheckedUpdateManyInput>
    /**
     * Filter which FieldDefs to update
     */
    where?: FieldDefWhereInput
  }


  /**
   * FieldDef upsert
   */
  export type FieldDefUpsertArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * The filter to search for the FieldDef to update in case it exists.
     */
    where: FieldDefWhereUniqueInput
    /**
     * In case the FieldDef found by the `where` argument doesn't exist, create a new FieldDef with this data.
     */
    create: XOR<FieldDefCreateInput, FieldDefUncheckedCreateInput>
    /**
     * In case the FieldDef was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FieldDefUpdateInput, FieldDefUncheckedUpdateInput>
  }


  /**
   * FieldDef delete
   */
  export type FieldDefDeleteArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
    /**
     * Filter which FieldDef to delete.
     */
    where: FieldDefWhereUniqueInput
  }


  /**
   * FieldDef deleteMany
   */
  export type FieldDefDeleteManyArgs = {
    /**
     * Filter which FieldDefs to delete
     */
    where?: FieldDefWhereInput
  }


  /**
   * FieldDef without action
   */
  export type FieldDefArgs = {
    /**
     * Select specific fields to fetch from the FieldDef
     */
    select?: FieldDefSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FieldDefInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const FieldDefScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    type: 'type',
    onwerId: 'onwerId'
  };

  export type FieldDefScalarFieldEnum = (typeof FieldDefScalarFieldEnum)[keyof typeof FieldDefScalarFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const MasterDataDefScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    description: 'description',
    displayField: 'displayField'
  };

  export type MasterDataDefScalarFieldEnum = (typeof MasterDataDefScalarFieldEnum)[keyof typeof MasterDataDefScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type MasterDataDefWhereInput = {
    AND?: Enumerable<MasterDataDefWhereInput>
    OR?: Enumerable<MasterDataDefWhereInput>
    NOT?: Enumerable<MasterDataDefWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    code?: StringFilter | string
    description?: StringFilter | string
    displayField?: StringNullableListFilter
    form?: FieldDefListRelationFilter
  }

  export type MasterDataDefOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    displayField?: SortOrder
    form?: FieldDefOrderByRelationAggregateInput
  }

  export type MasterDataDefWhereUniqueInput = {
    id?: number
    code?: string
  }

  export type MasterDataDefOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    displayField?: SortOrder
    _count?: MasterDataDefCountOrderByAggregateInput
    _avg?: MasterDataDefAvgOrderByAggregateInput
    _max?: MasterDataDefMaxOrderByAggregateInput
    _min?: MasterDataDefMinOrderByAggregateInput
    _sum?: MasterDataDefSumOrderByAggregateInput
  }

  export type MasterDataDefScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MasterDataDefScalarWhereWithAggregatesInput>
    OR?: Enumerable<MasterDataDefScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MasterDataDefScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    code?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    displayField?: StringNullableListFilter
  }

  export type FieldDefWhereInput = {
    AND?: Enumerable<FieldDefWhereInput>
    OR?: Enumerable<FieldDefWhereInput>
    NOT?: Enumerable<FieldDefWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    code?: StringFilter | string
    type?: JsonFilter
    onwerId?: IntFilter | number
    onwer?: XOR<MasterDataDefRelationFilter, MasterDataDefWhereInput>
  }

  export type FieldDefOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    type?: SortOrder
    onwerId?: SortOrder
    onwer?: MasterDataDefOrderByWithRelationInput
  }

  export type FieldDefWhereUniqueInput = {
    id?: number
    code?: string
  }

  export type FieldDefOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    type?: SortOrder
    onwerId?: SortOrder
    _count?: FieldDefCountOrderByAggregateInput
    _avg?: FieldDefAvgOrderByAggregateInput
    _max?: FieldDefMaxOrderByAggregateInput
    _min?: FieldDefMinOrderByAggregateInput
    _sum?: FieldDefSumOrderByAggregateInput
  }

  export type FieldDefScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FieldDefScalarWhereWithAggregatesInput>
    OR?: Enumerable<FieldDefScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FieldDefScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    code?: StringWithAggregatesFilter | string
    type?: JsonWithAggregatesFilter
    onwerId?: IntWithAggregatesFilter | number
  }

  export type MasterDataDefCreateInput = {
    name: string
    code: string
    description: string
    displayField?: MasterDataDefCreatedisplayFieldInput | Enumerable<string>
    form?: FieldDefCreateNestedManyWithoutOnwerInput
  }

  export type MasterDataDefUncheckedCreateInput = {
    id?: number
    name: string
    code: string
    description: string
    displayField?: MasterDataDefCreatedisplayFieldInput | Enumerable<string>
    form?: FieldDefUncheckedCreateNestedManyWithoutOnwerInput
  }

  export type MasterDataDefUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayField?: MasterDataDefUpdatedisplayFieldInput | Enumerable<string>
    form?: FieldDefUpdateManyWithoutOnwerNestedInput
  }

  export type MasterDataDefUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayField?: MasterDataDefUpdatedisplayFieldInput | Enumerable<string>
    form?: FieldDefUncheckedUpdateManyWithoutOnwerNestedInput
  }

  export type MasterDataDefCreateManyInput = {
    id?: number
    name: string
    code: string
    description: string
    displayField?: MasterDataDefCreatedisplayFieldInput | Enumerable<string>
  }

  export type MasterDataDefUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayField?: MasterDataDefUpdatedisplayFieldInput | Enumerable<string>
  }

  export type MasterDataDefUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayField?: MasterDataDefUpdatedisplayFieldInput | Enumerable<string>
  }

  export type FieldDefCreateInput = {
    name: string
    code: string
    type: JsonNullValueInput | InputJsonValue
    onwer: MasterDataDefCreateNestedOneWithoutFormInput
  }

  export type FieldDefUncheckedCreateInput = {
    id?: number
    name: string
    code: string
    type: JsonNullValueInput | InputJsonValue
    onwerId: number
  }

  export type FieldDefUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: JsonNullValueInput | InputJsonValue
    onwer?: MasterDataDefUpdateOneRequiredWithoutFormNestedInput
  }

  export type FieldDefUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: JsonNullValueInput | InputJsonValue
    onwerId?: IntFieldUpdateOperationsInput | number
  }

  export type FieldDefCreateManyInput = {
    id?: number
    name: string
    code: string
    type: JsonNullValueInput | InputJsonValue
    onwerId: number
  }

  export type FieldDefUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: JsonNullValueInput | InputJsonValue
  }

  export type FieldDefUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: JsonNullValueInput | InputJsonValue
    onwerId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type FieldDefListRelationFilter = {
    every?: FieldDefWhereInput
    some?: FieldDefWhereInput
    none?: FieldDefWhereInput
  }

  export type FieldDefOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MasterDataDefCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
    displayField?: SortOrder
  }

  export type MasterDataDefAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MasterDataDefMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
  }

  export type MasterDataDefMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    description?: SortOrder
  }

  export type MasterDataDefSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type MasterDataDefRelationFilter = {
    is?: MasterDataDefWhereInput
    isNot?: MasterDataDefWhereInput
  }

  export type FieldDefCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    type?: SortOrder
    onwerId?: SortOrder
  }

  export type FieldDefAvgOrderByAggregateInput = {
    id?: SortOrder
    onwerId?: SortOrder
  }

  export type FieldDefMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    onwerId?: SortOrder
  }

  export type FieldDefMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    onwerId?: SortOrder
  }

  export type FieldDefSumOrderByAggregateInput = {
    id?: SortOrder
    onwerId?: SortOrder
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type MasterDataDefCreatedisplayFieldInput = {
    set: Enumerable<string>
  }

  export type FieldDefCreateNestedManyWithoutOnwerInput = {
    create?: XOR<Enumerable<FieldDefCreateWithoutOnwerInput>, Enumerable<FieldDefUncheckedCreateWithoutOnwerInput>>
    connectOrCreate?: Enumerable<FieldDefCreateOrConnectWithoutOnwerInput>
    createMany?: FieldDefCreateManyOnwerInputEnvelope
    connect?: Enumerable<FieldDefWhereUniqueInput>
  }

  export type FieldDefUncheckedCreateNestedManyWithoutOnwerInput = {
    create?: XOR<Enumerable<FieldDefCreateWithoutOnwerInput>, Enumerable<FieldDefUncheckedCreateWithoutOnwerInput>>
    connectOrCreate?: Enumerable<FieldDefCreateOrConnectWithoutOnwerInput>
    createMany?: FieldDefCreateManyOnwerInputEnvelope
    connect?: Enumerable<FieldDefWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type MasterDataDefUpdatedisplayFieldInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type FieldDefUpdateManyWithoutOnwerNestedInput = {
    create?: XOR<Enumerable<FieldDefCreateWithoutOnwerInput>, Enumerable<FieldDefUncheckedCreateWithoutOnwerInput>>
    connectOrCreate?: Enumerable<FieldDefCreateOrConnectWithoutOnwerInput>
    upsert?: Enumerable<FieldDefUpsertWithWhereUniqueWithoutOnwerInput>
    createMany?: FieldDefCreateManyOnwerInputEnvelope
    set?: Enumerable<FieldDefWhereUniqueInput>
    disconnect?: Enumerable<FieldDefWhereUniqueInput>
    delete?: Enumerable<FieldDefWhereUniqueInput>
    connect?: Enumerable<FieldDefWhereUniqueInput>
    update?: Enumerable<FieldDefUpdateWithWhereUniqueWithoutOnwerInput>
    updateMany?: Enumerable<FieldDefUpdateManyWithWhereWithoutOnwerInput>
    deleteMany?: Enumerable<FieldDefScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FieldDefUncheckedUpdateManyWithoutOnwerNestedInput = {
    create?: XOR<Enumerable<FieldDefCreateWithoutOnwerInput>, Enumerable<FieldDefUncheckedCreateWithoutOnwerInput>>
    connectOrCreate?: Enumerable<FieldDefCreateOrConnectWithoutOnwerInput>
    upsert?: Enumerable<FieldDefUpsertWithWhereUniqueWithoutOnwerInput>
    createMany?: FieldDefCreateManyOnwerInputEnvelope
    set?: Enumerable<FieldDefWhereUniqueInput>
    disconnect?: Enumerable<FieldDefWhereUniqueInput>
    delete?: Enumerable<FieldDefWhereUniqueInput>
    connect?: Enumerable<FieldDefWhereUniqueInput>
    update?: Enumerable<FieldDefUpdateWithWhereUniqueWithoutOnwerInput>
    updateMany?: Enumerable<FieldDefUpdateManyWithWhereWithoutOnwerInput>
    deleteMany?: Enumerable<FieldDefScalarWhereInput>
  }

  export type MasterDataDefCreateNestedOneWithoutFormInput = {
    create?: XOR<MasterDataDefCreateWithoutFormInput, MasterDataDefUncheckedCreateWithoutFormInput>
    connectOrCreate?: MasterDataDefCreateOrConnectWithoutFormInput
    connect?: MasterDataDefWhereUniqueInput
  }

  export type MasterDataDefUpdateOneRequiredWithoutFormNestedInput = {
    create?: XOR<MasterDataDefCreateWithoutFormInput, MasterDataDefUncheckedCreateWithoutFormInput>
    connectOrCreate?: MasterDataDefCreateOrConnectWithoutFormInput
    upsert?: MasterDataDefUpsertWithoutFormInput
    connect?: MasterDataDefWhereUniqueInput
    update?: XOR<MasterDataDefUpdateWithoutFormInput, MasterDataDefUncheckedUpdateWithoutFormInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type FieldDefCreateWithoutOnwerInput = {
    name: string
    code: string
    type: JsonNullValueInput | InputJsonValue
  }

  export type FieldDefUncheckedCreateWithoutOnwerInput = {
    id?: number
    name: string
    code: string
    type: JsonNullValueInput | InputJsonValue
  }

  export type FieldDefCreateOrConnectWithoutOnwerInput = {
    where: FieldDefWhereUniqueInput
    create: XOR<FieldDefCreateWithoutOnwerInput, FieldDefUncheckedCreateWithoutOnwerInput>
  }

  export type FieldDefCreateManyOnwerInputEnvelope = {
    data: Enumerable<FieldDefCreateManyOnwerInput>
    skipDuplicates?: boolean
  }

  export type FieldDefUpsertWithWhereUniqueWithoutOnwerInput = {
    where: FieldDefWhereUniqueInput
    update: XOR<FieldDefUpdateWithoutOnwerInput, FieldDefUncheckedUpdateWithoutOnwerInput>
    create: XOR<FieldDefCreateWithoutOnwerInput, FieldDefUncheckedCreateWithoutOnwerInput>
  }

  export type FieldDefUpdateWithWhereUniqueWithoutOnwerInput = {
    where: FieldDefWhereUniqueInput
    data: XOR<FieldDefUpdateWithoutOnwerInput, FieldDefUncheckedUpdateWithoutOnwerInput>
  }

  export type FieldDefUpdateManyWithWhereWithoutOnwerInput = {
    where: FieldDefScalarWhereInput
    data: XOR<FieldDefUpdateManyMutationInput, FieldDefUncheckedUpdateManyWithoutFormInput>
  }

  export type FieldDefScalarWhereInput = {
    AND?: Enumerable<FieldDefScalarWhereInput>
    OR?: Enumerable<FieldDefScalarWhereInput>
    NOT?: Enumerable<FieldDefScalarWhereInput>
    id?: IntFilter | number
    name?: StringFilter | string
    code?: StringFilter | string
    type?: JsonFilter
    onwerId?: IntFilter | number
  }

  export type MasterDataDefCreateWithoutFormInput = {
    name: string
    code: string
    description: string
    displayField?: MasterDataDefCreatedisplayFieldInput | Enumerable<string>
  }

  export type MasterDataDefUncheckedCreateWithoutFormInput = {
    id?: number
    name: string
    code: string
    description: string
    displayField?: MasterDataDefCreatedisplayFieldInput | Enumerable<string>
  }

  export type MasterDataDefCreateOrConnectWithoutFormInput = {
    where: MasterDataDefWhereUniqueInput
    create: XOR<MasterDataDefCreateWithoutFormInput, MasterDataDefUncheckedCreateWithoutFormInput>
  }

  export type MasterDataDefUpsertWithoutFormInput = {
    update: XOR<MasterDataDefUpdateWithoutFormInput, MasterDataDefUncheckedUpdateWithoutFormInput>
    create: XOR<MasterDataDefCreateWithoutFormInput, MasterDataDefUncheckedCreateWithoutFormInput>
  }

  export type MasterDataDefUpdateWithoutFormInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayField?: MasterDataDefUpdatedisplayFieldInput | Enumerable<string>
  }

  export type MasterDataDefUncheckedUpdateWithoutFormInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    displayField?: MasterDataDefUpdatedisplayFieldInput | Enumerable<string>
  }

  export type FieldDefCreateManyOnwerInput = {
    id?: number
    name: string
    code: string
    type: JsonNullValueInput | InputJsonValue
  }

  export type FieldDefUpdateWithoutOnwerInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: JsonNullValueInput | InputJsonValue
  }

  export type FieldDefUncheckedUpdateWithoutOnwerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: JsonNullValueInput | InputJsonValue
  }

  export type FieldDefUncheckedUpdateManyWithoutFormInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    type?: JsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}