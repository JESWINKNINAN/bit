import { Command } from './command';
import CommandRegistry from './registry';
import commander from 'commander';
import { render } from 'ink';
import { execAction, register } from '../cli/command-registry';
import R from 'ramda';
import registerCommands from 'cli/command-registry-builder';
export default class Paper {
  constructor(
    /**
     * paper's command registry
     */
    private registry: CommandRegistry
  ) {}

  /**
   * registers a new command in to `Paper`.
   */
  register(command: Command) {
    this.registry.register(command);
    return this;
  }

  /**
   * list of all registered commands.
   */
  get commands() {
    return this.registry.commands;
  }

  /**
   * execute commands registered to `Paper` and the legacy bit cli.
   *
   */
  async run(): Promise<void> {
    Object.entries(this.commands).reduce(function(acc, [key, paperCommand]) {
      register(paperCommand as any, acc);
      return acc;
    }, commander);
    const [params, packageManagerArgs] = R.splitWhen(R.equals('--'), process.argv);
    commander.packageManagerArgs = packageManagerArgs;
    commander.parse(params);
  }
}