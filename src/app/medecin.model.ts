
// medecin.model.ts
export interface Medecin {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  specialite: string;
  adresse: string;
}

// Si tu utilises une classe pour implémenter l'interface, tu peux aussi l'exporter ici
export class MedecinClass implements Medecin {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public email: string,
    public specialite: string,
   public adresse: string,
  ) {}
}
