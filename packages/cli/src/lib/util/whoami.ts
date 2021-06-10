import { execSync, } from 'child_process';

let me: string;

export default function whoami() {
  me = me || execSync('tnpm whoami', { stdio: 'pipe', }).toString().trim();
  return me;
}