import { Medecin } from './medecin.model'; // Assure-toi que le chemin est correct

describe('Medecin', () => {
  it('should create a valid Medecin object', () => {
    const medecin: Medecin = {
      id: 0,
      nom: '',
      prenom: '',
      email: '',
      specialite: ''
    };
    expect(medecin).toBeTruthy();
  });
});