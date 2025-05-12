export interface UserProfile {
    photoUrl: string;
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: 'PATIENT' | 'MEDECIN' | string;
    specialite?: string;  // n’existe que pour MEDECIN
  }
  