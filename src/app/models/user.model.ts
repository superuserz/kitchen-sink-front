export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  roles: UserRole[];
  registeredOn: string;
  // Add any additional fields as necessary
}

export interface RegisterMemberRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}