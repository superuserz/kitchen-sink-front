export interface User {
  id?: number;
  username: string;
  email: string;

  password: string;
  // Add any additional fields as necessary
}

export interface RegisterMemberRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}