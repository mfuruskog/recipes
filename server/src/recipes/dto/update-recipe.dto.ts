export class UpdateRecipeDto {
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly rating: number;
  readonly types: string[];
}
