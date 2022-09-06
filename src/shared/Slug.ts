import slugify from 'slugify';
import { Result } from './Result.js';

export class Slug {
  private name: string;

  private constructor(name: string) {
    this.name = name;
  }
  get slugName(): string {
    return this.name;
  }

  static create(name: string): Result<Slug> {
    const nameSlug = slugify.default(name);

    if (!nameSlug) {
      return Result.fail<Slug>(new Error('Invalid slug'));
    }
    return Result.ok(new Slug(nameSlug));
  }
}
