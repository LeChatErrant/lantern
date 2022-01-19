enum Command {
  DEFAULT = 'default',
  INIT = 'init',
  CREATE = 'create',
  EDIT = 'edit',
  PUBLISH = 'publish',
}

export const CommandsDescription: { [key in Command]: string } = {
  [Command.DEFAULT]: 'List available commands',
  [Command.INIT]: 'Start a new project (coming soon)',
  [Command.CREATE]: 'Create a new API resource',
  [Command.EDIT]: 'Edit an API resource (coming soon)',
  [Command.PUBLISH]: 'Publish types to npm registry',
};

export default Command;
