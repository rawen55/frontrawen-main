import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RendezVousService } from '../../../services/rendez-vous.service';

@Component({
  selector: 'app-stats',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  constructor(private rendezVousService: RendezVousService) {
    Chart.register(...registerables); // Enregistrer les composants nécessaires de Chart.js
  }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.rendezVousService.getWeeklyStats().subscribe({
      next: (data) => {
        this.renderChart(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques :', err);
      }
    });
  }

  renderChart(data: any): void {
    const ctx = document.getElementById('statsChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels, // Les jours ou semaines
        datasets: [
          {
            label: 'Acceptés',
            data: data.accepted,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Reportés',
            data: data.rescheduled,
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          },
          {
            label: 'Refusés',
            data: data.refused,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Statistiques des rendez-vous par semaine'
          }
        },
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}