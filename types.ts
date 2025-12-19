export enum RsvpStatus {
    HADIR = 'Hadir',
    TIDAK = 'Tidak',
    RAGU = 'Belum Tahu'
  }
  
  export enum SessionType {
    AKAD = 'Akad',
    RESEPSI = 'Resepsi',
    BOTH = 'Keduanya'
  }
  
  export interface GuestMessage {
    id: string;
    name: string;
    message: string;
    date: string;
  }
  
  export interface NavItem {
    id: string;
    label: string;
  }