import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-contact',
  templateUrl: './pages-contact.component.html',
  styleUrls: ['./pages-contact.component.css']
})
export class PagesContactComponent {
  showLoading = false;
  showSentMessage = false;
  showError = false;

  onSubmit(): void {
    this.showLoading = true;

    // Simulation d’un envoi
    setTimeout(() => {
      this.showLoading = false;
      this.showSentMessage = true;
    }, 1500); // 1.5 secondes de chargement simulé
  }
}
