import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core'; // Adicionado 'inject'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VinInfos } from '../../models/car';
import { DashboardService } from '../../services/dashboard.service'; // <--- Importar DashboardService

@Component({
  selector: 'app-car-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.css'
})
export class CarTable implements OnInit, OnChanges {
 
  dashboardService = inject(DashboardService); 

  @Input() allVinData: VinInfos[] = [];

  searchTerm: string = '';
  filteredVinData: VinInfos[] = [];

  
  searchResultVinData: VinInfos[] = [];

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allVinData']) {
     
      this.searchTerm = ''; 
      this.searchResultVinData = [...this.allVinData]; 
      this.filteredVinData = [...this.allVinData]; 
      console.log('CarTable: allVinData mudou. Exibindo:', this.filteredVinData);
    }
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) { 
      this.filteredVinData = [...this.allVinData];
      this.searchResultVinData = [...this.allVinData];
      return; 
    }

    
    this.dashboardService.getVinfos(this.searchTerm.trim()).subscribe({
      next: (vinInfo) => {
        
        const vinInfoCompleto: VinInfos = {
          ...vinInfo,
          vin: this.searchTerm.trim()
        };
        this.filteredVinData = [vinInfoCompleto]; 
        this.searchResultVinData = [vinInfoCompleto];
        console.log('Busca VIN bem-sucedida:', this.filteredVinData);
      },
      error: (err) => {
        console.error('Erro na busca por VIN:', err);
        this.filteredVinData = []; 
        this.searchResultVinData = [];
        
      }
    });
  }
}