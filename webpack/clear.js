import del from 'del';
import chalk from 'chalk';

const paths = del.sync('build');

const { length: pathsLengts } = paths;

if (pathsLengts > 0) {
  console.info(chalk.red('Deleted folders:'));

  paths.forEach(path => console.info(chalk.red(`- ${path}`)));
}
