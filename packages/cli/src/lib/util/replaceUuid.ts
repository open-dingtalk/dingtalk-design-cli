export default function (url: string, uuid: string): string {
  return url.replace('___uuid___', uuid);
}
