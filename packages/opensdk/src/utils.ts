import path from 'path';

export function friendlyPackageSize(size: number) {
  const de = Math.pow(1024, 2);
  const t = size / de;

  if (t < 1) {
    return t.toFixed(2) + 'MB';
  } else {
    return t.toFixed(1) + 'MB';
  }
}

export function checkSizeIfThrow(size: number, limit: number) {
  if (size > limit) {
    throw new Error(`当前包体积为${friendlyPackageSize(size)}，超出${friendlyPackageSize(limit)}体积限制，请优化包体积`);
  }
}

export function parsePath(src: string) {
  if (src[0] == '~') {
    return path.join(process.env.HOME as string, src.slice(1));
  }

  if (path.isAbsolute(src)) {
    return src;
  } else {
    return path.resolve(src);
  }
}


