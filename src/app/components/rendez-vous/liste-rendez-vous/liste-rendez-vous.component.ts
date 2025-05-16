import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RendezVousService } from '../../../services/rendez-vous.service';
import { AuthService } from '../../../services/auth.service';
import { RendezVous } from '../../../rendez-vous.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// Removed duplicate import of Swal
@Component({
  selector: 'app-liste-rendez-vous',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-rendez-vous.component.html',
  styleUrls: ['./liste-rendez-vous.component.css']
})
export class ListeRendezVousComponent implements OnInit {
  rendezVousList: RendezVous[] = [];
  newRendezVousCount: number = 0;
  selectedRdvId: number | null = null;
  
  newConsultationCount: number = 0; // Counter for new consultations
  hasViewedConsultations: boolean = false; // Tracks if the user has viewed consultations
  
  showCalendar: boolean = false;
  newDate: string = '';
  statusFilter: string = '';
  selectedDate: string = '';
  page: number = 0;
  size: number = 5;
  totalPages: number = 0;
  currentRole: string | null = null;
  filteredRendezVous = [...this.rendezVousList];
  dateRange = {
    startDate: '',
    endDate: ''
  };
  filter = {
    searchName: '',
    searchPrenom: '',
    searchDate: ''
  };
  constructor(
    private rendezVousService: RendezVousService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRole = this.authService.getUserRole();
    console.log('Role brut issu du token:', this.currentRole);
    this.loadRendezVous();

    // Reset the counter when the user opens the page
    this.resetConsultationCount();
  
    // Vérifiez les nouveaux rendez-vous toutes les 30 secondes
    setInterval(() => {
      this.loadRendezVous();
    }, 30000);
  }
  
  loadRendezVous(): void {
  this.rendezVousService.getRendezVousForLoggedMedecin().subscribe({
    next: (data) => {
      this.rendezVousList = data;


      console.log('Fetched consultations:', this.rendezVousList);


      // Update the filtered list for display
      this.filteredRendezVous = [...this.rendezVousList];
      console.log('Filtered consultations:', this.filteredRendezVous); // Debugging

      // Count the number of new consultations (e.g., EN_ATTENTE status)
      this.newRendezVousCount = this.rendezVousList.filter(
        (rdv) => rdv.statutrdv === 'EN_ATTENTE'
      ).length;

      console.log('New consultations:', this.newRendezVousCount); // Debugging
    },
    error: (err) => {
      console.error('Error loading consultations:', err);
    },
  });
 }

  resetConsultationCount(): void {
  // Reset the counter when the user views the page
  this.newConsultationCount = 0;
}

  filterRendezVous(): void {
    this.filteredRendezVous = this.rendezVousList.filter(rendezVous => {
      const rdvDate = new Date(rendezVous.date);
      const startDate = this.dateRange.startDate ? new Date(this.dateRange.startDate) : null;
      const endDate = this.dateRange.endDate ? new Date(this.dateRange.endDate) : null;
  
      const isWithinDateRange =
        (!startDate || rdvDate >= startDate) &&
        (!endDate || rdvDate <= endDate);
  
      const matchesName = !this.filter.searchName || 
        (rendezVous.patient?.nom && rendezVous.patient.nom.toLowerCase().includes(this.filter.searchName.toLowerCase()));
  
      const matchesPrenom = !this.filter.searchPrenom || 
        (rendezVous.patient?.prenom && rendezVous.patient.prenom.toLowerCase().includes(this.filter.searchPrenom.toLowerCase()));
  
      return isWithinDateRange && matchesName && matchesPrenom;
    });
  }
  applyFilters(): void {
    let result = [...this.rendezVousList];

    if (this.statusFilter) {
      result = result.filter(rdv => rdv.statutrdv === this.statusFilter);
    }

    if (this.selectedDate) {
      const selected = new Date(this.selectedDate).toDateString();
      result = result.filter(rdv => new Date(rdv.date).toDateString() === selected);
    }

    this.totalPages = Math.ceil(result.length / this.size);
    this.filteredRendezVous = result.slice(this.page * this.size, (this.page + 1) * this.size);
  }

  onPageChange(delta: number): void {
    const newPage = this.page + delta;
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.applyFilters();
    }
  }

  onDateChange(date: string): void {
    this.selectedDate = date;
    this.page = 0;
    this.applyFilters();
  }



acceptRendezVous(id: number): void {
    this.rendezVousService.updateStatutRendezVous(id, 'CONFIRMÉ').subscribe({
      next: () => {
        // Met à jour le statut du rendez-vous dans la liste locale
        const rdv = this.rendezVousList.find(r => r.id === id);
        if (rdv) {
          rdv.statutrdv = 'CONFIRMÉ';
        }
  
        // Applique les filtres après la mise à jour
        this.applyFilters();
  
        // Affiche une alerte de succès
        alert('Rendez-vous accepté avec succès.');
  
        // Redirection vers la page de diagnostic
        this.router.navigate(['dashboard/appointments/diagnostic', id]);
      },
      error: (err) => {
        console.error('Erreur lors de l\'acceptation du rendez-vous', err);
        alert('Une erreur est survenue lors de l\'acceptation du rendez-vous.');
      }
    });
  }


 

refuserRendezVous(id: number): void {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: 'Voulez-vous vraiment refuser ce rendez-vous ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, refuser',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.rendezVousService.supprimerRendezVous(id).subscribe({
        next: () => {
          // Update the status locally instead of removing the item
          const rdv = this.rendezVousList.find(r => r.id === id);
          if (rdv) {
            rdv.statutrdv = 'REFUSE';
          }
          this.applyFilters(); // Refresh filtered list if needed
          Swal.fire(
            'Refusé !',
            'Le rendez-vous a été refusé avec succès.',
            'success'
          );
        },
        error: (err) => {
          console.error('Erreur lors du refus du rendez-vous :', err);
          Swal.fire(
            'Erreur',
            'Une erreur est survenue lors du refus du rendez-vous.',
            'error'
          );
        }
      });
    }
  });
}

  onReportClick(rdvId: number): void {
    this.selectedRdvId = rdvId; // Identifie le rendez-vous à reporter
    this.showCalendar = true; // Affiche le formulaire de report
  }
  submitNewDate(): void {
    if (!this.newDate || this.selectedRdvId === null) {
      alert('Veuillez sélectionner une nouvelle date.');
      return;
    }

    else {
      this.reportRendezVous(this.selectedRdvId, this.newDate);
    }

  }
reportRendezVous(id: number, newDate: string): void {
  this.rendezVousService.reportRendezVous(id, newDate).subscribe({
    next: (updatedRendezVous) => {
      console.log('Rendez-vous reporté avec succès:', updatedRendezVous);
      const rdv = this.rendezVousList.find(r => r.id === id);
      if (rdv) {
        rdv.date = updatedRendezVous.date;
        rdv.statutrdv = updatedRendezVous.statutrdv;
      }
    },
    error: (err) => {
      console.error('Erreur lors du report du rendez-vous:', err);
    }
  });
}

}
