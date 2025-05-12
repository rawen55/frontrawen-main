import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RendezVousService } from '../../../services/rendez-vous.service';

@Component({
  selector: 'app-stats',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  weeklyStats: any;
  monthlyStats: any;
  yearlyStats: any;
  
  constructor(private rendezVousService: RendezVousService) {
    Chart.register(...registerables); // Enregistrer les composants nécessaires de Chart.js
  }

  ngOnInit(): void {
    this.loadWeeklyStats();
    this.loadMonthlyStats();
    this.loadYearlyStats();
  }

  loadWeeklyStats(): void {
    this.rendezVousService.getWeeklyStats().subscribe({
      next: (data) => {
        this.weeklyStats = data;
        this.renderChart('weeklyChart', data, 'Statistiques Hebdomadaires');
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques hebdomadaires :', err);
      }
    });
  }

  loadMonthlyStats(): void {
    this.rendezVousService.getMonthlyStats().subscribe({
      next: (data) => {
        this.monthlyStats = data;
        this.renderChart('monthlyChart', data, 'Statistiques Mensuelles');
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques mensuelles :', err);
      }
    });
  }

  loadYearlyStats(): void {
    this.rendezVousService.getYearlyStats().subscribe({
      next: (data) => {
        this.yearlyStats = data;
        this.renderChart('yearlyChart', data, 'Statistiques Annuelles');
      },
      error: (err) => {
        console.error('Erreur lors du chargement des statistiques annuelles :', err);
      }
    });
  }
  renderChart(chartId: string, data: any, title: string): void {
    const ctx = document.getElementById(chartId) as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels, // Days, weeks, or months
        datasets: [
          {
            label: 'Acceptés',
            data: data.accepted,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Total Patients',
            data: data.totalPatients,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
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
            text: title
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