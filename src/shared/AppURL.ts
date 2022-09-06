import { URL } from 'node:url';
import slugify from 'slugify';

export class AppURL {
  static PLENUS_HOST = 'plenus.app';
  static IMAGE_HOST =
    process.env.DO_SPACE_HOST! ||
    'https://rapimatest.sfo2.digitaloceanspaces.com';
  url: string;
  host: string;
  path: string | undefined;

  private constructor(url: string, host: string, path?: string) {
    this.url = url;
    this.host = host;
    this.path = path;
  }

  private static isValidURL(url: string, protocols: string[]): boolean {
    try {
      const newUrl = new URL(url);
      return protocols
        ? newUrl.protocol
          ? protocols
              .map((x) => `${x.toLowerCase()}:`)
              .includes(newUrl.protocol)
          : false
        : true;
    } catch (err) {
      return false;
    }
  }
  private static buildEntityURL(s: string): string[] {
    let url: any;
    let host: any;

    if (AppURL.isValidURL(s, ['http', 'https'])) {
      url = new URL(s);
      host = url.hostname;
      return [url.href, host];
    }

    url = `https://${slugify.default(s.toLowerCase())}.${this.PLENUS_HOST}`;
    const newUrl = new URL(url);

    return [newUrl.href, newUrl.hostname];
  }

  private static buildImageURL(path?: string | null): string[] | null {
    let url: any;
    if (!path) {
      return null;
    }
    url = `${this.IMAGE_HOST}/${path}`;
    const newUrl = new URL(url);

    return [newUrl.href, newUrl.hostname, newUrl.pathname];
  }

  public static createEntityURL(url: string): AppURL {
    const [newUlr, host] = AppURL.buildEntityURL(url);

    return new AppURL(newUlr, host);
  }

  public static createImageURL(url: string | null): AppURL | null {
    const newUrl = AppURL.buildImageURL(url);
    if (newUrl) return new AppURL(newUrl[0], newUrl[1], newUrl[2]);
    return newUrl;
  }
}
