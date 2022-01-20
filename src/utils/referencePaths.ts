import path from 'path';

export const projectPath = path.join('.');
export const sourcePath = path.join(projectPath, 'src');
export const middlewaresPath = path.join(projectPath, 'middlewares');
export const routesPath = path.join(sourcePath, 'routes');
export const prismaPath = path.join(projectPath, 'prisma');
