import * as username from 'username';

let me = '';

export default function whoami(): string {
  me = me || username.sync();
  return me || 'N/A';
}