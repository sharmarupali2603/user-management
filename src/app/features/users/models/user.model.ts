export type JobRole = 'tech' | 'id' | 'gd' | 'qa';

export interface User {
  id: number;
  username: string;
  email: string;
  'job-role': JobRole;
}

export interface CreateUser {
  username: string;
  email: string;
  'job-role': JobRole;
}