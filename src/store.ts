import { UserPost, UserProfile } from "./types/store";

export default class Store {
  #token: string;
  #userProfile: UserProfile | null;
  #userPosts: UserPost[] | null;

  constructor() {
    this.#token = '';
    this.#userProfile = null;
    this.#userPosts = null;
  }
  set userProfile(profile) {
    this.#userProfile = profile;
  }

  get userProfile() {
    return this.#userProfile;
  }

  set userPosts(posts) {
    this.#userPosts = posts;
  }

  get userPosts() {
    return this.#userPosts;
  }

  set token(token) {
    this.#token = token;
  }

  get token() {
    return this.#token;
  }
}
