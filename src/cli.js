import { program } from 'commander';
import genDiff from '../index.js';

export default () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filepath1, filepath2) => {
      const { format } = program.opts();
      const diff = genDiff(filepath1, filepath2, format);
      console.log(diff);
    });

  program.parse();
};
