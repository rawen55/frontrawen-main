export interface UserProfile {
    photoUrl(arg0: string, photoUrl: any): unknown;
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: 'PATIENT' | 'MEDECIN' | string;
    specialite?: string;  // n’existe que pour MEDECIN
  }
  