export type status = 'online' | 'offline' | 'busy' | 'away' ;
export interface User {
  nick: string;
  subnick?: string;
  age?: number;
  email: string;
  friend: boolean;
  uid: any;
  status?: status;
  avatar?: string;
}
