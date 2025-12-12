export interface Student {
  id: string;
  nisn: string;
  name: string;
  email: string;
  birth_date: string;
  class: string;
  created_at?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  created_at?: string;
}