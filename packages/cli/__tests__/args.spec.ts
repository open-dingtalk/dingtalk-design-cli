import * as path from 'path';
import * as execa from 'execa';

describe('Args', ()=>{
  const CLI_PATH = path.resolve(__dirname, '..', 'dist/bin', 'dd.js');
  const runAsync = (args: any[], options?: any): any => execa(CLI_PATH, args, options);
  beforeAll(()=>{
    process.chdir(__dirname);
    execa('chmod', ['755', CLI_PATH]);
  });

  test('suggests matching command1', async () => {
    try {
      await runAsync(['iint']);
    } catch(e) {
      console.error(e);
      expect(e.message).toContain('Did you mean init?');
    }
  }, 50 * 1000);

  test('suggests matching command2', async () => {
    const { stdout, stderr, } = await runAsync(['iint'], {
      reject: false,
    });
    console.log(stdout, stderr);
    // Assertions
    expect(stdout).toContain('Did you mean init?');
  }, 50 * 1000);
});