export class AuthService {
  static async loginUser(email: string, password: string) {
    // Return a token if everything is alright
    // otherwise trough a meaningful error.

    return "someDummyToken";
  }

  static async registerUser(email: string, password: string) {
    // Return the user id of the user if successfully registered
    // Otherwise throw an error.

    return "someDummyToken";
  }
}
