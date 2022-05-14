import type { Configuration } from 'webpack';

type CLIValues = boolean | string;

type EnvValues = Record<string, CLIValues | Record<string, Env>>;
interface Env extends EnvValues {}

type Argv = Record<string, CLIValues>;

export interface WebpackConfigFunction {
  (env?: Env, argv?: Argv): Configuration | Promise<Configuration>;
}
