export interface IUser {
  _id: string;
  email: string;
  username: string;
  image: string;
  fName: string;
  lName: string;
}

export interface PromptData {
  prompt: string;
  tag: string;
  imageUrl: string;
}

export interface IPrompt extends PromptData {
  _id: string;
  creator: IUser;
}
