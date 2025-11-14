export class CreatePostDto {
  // full name
  name?: string;

  // handle (e.g. @elonmusk)
  username?: string;

  content?: string;
  image?: string;
  imageFile?: any;
}
