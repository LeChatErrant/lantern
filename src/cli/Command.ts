enum Command {
  DEFAULT = 'default',
  INIT = 'init',
  ADD = 'add',
  EDIT = 'edit',
  PUBLISH = 'publish',
}

export const CommandsDescription: { [key in Command]: string } = {
  [Command.DEFAULT]: 'List available commands',
  [Command.INIT]: 'Start a new project',
  [Command.ADD]: 'Add a new API resource',
  [Command.EDIT]: 'Edit an API resource (coming soon)',
  [Command.PUBLISH]: 'Publish types to npm registry (coming soon)',
};

export default Command;
