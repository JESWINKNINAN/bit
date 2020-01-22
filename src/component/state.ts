import Config from './config';
import ComponentFS from './component-fs';
import ConsumerComponent from '../consumer/component';
import { ComponentGraph } from './component-graph';

export default class State {
  constructor(
    /**
     * component configuration which is later generated to a component `package.json` and `bit.json`.
     */
    readonly config: Config,

    /**
     * in-memory representation of the component current filesystem.
     */
    readonly filesystem: ComponentFS,

    /**
     * dependency graph of the component current. ideally package dependencies would be also placed here.
     */
    readonly dependencies: Dependencies
  ) {}

  get graph() {
    return new ComponentGraph();
  }

  /**
   * calculate the hash of this state
   */
  get hash() {
    return '';
  }

  static fromLegacy(consumerComponent: ConsumerComponent) {
    const extensions = [];

    return new State(
      new Config(consumerComponent.mainFile, extensions),
      ComponentFS.fromVinyls(consumerComponent.files),
      consumerComponent.dependencies
    );
  }
}