import tar from 'tar';
import mkdirp from 'mkdirp';

export default async (source: string, dest: string): Promise<void> => {
  await mkdirp(dest);
  await tar.x({
    file: source,
    C: dest,
  });
};