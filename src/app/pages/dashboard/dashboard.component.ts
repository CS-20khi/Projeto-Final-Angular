

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from "../../components/card/card.component";
import { DashboardService } from '../../services/dashboard.service';
import { Veiculo, VinInfos } from '../../models/car'; 
import { CarTable } from "../../components/car-table/car-table.component";
import {  MenuComponent } from "../../components/menu/menu.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Card, CarTable, MenuComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
errorMessage: any;
alertType: any;
logout() {
throw new Error('Method not implemented.');
}
  dashboardService = inject(DashboardService)

  veiculos: Veiculo[] = []

  veiculoSelecionado: Veiculo = {
    id: -1,
    connected: 0,
    volumetotal: 0,
    softwareUpdates: 0,
    vehicle: "",
    img: "",
    vin: "",
  }

  vinInfos: VinInfos = {
    id: -1,
    lat: 0,
    long: 0,
    nivelCombustivel: 0,
    odometro: 0,
    status: "",
    vin: "" 
  }

  allVehicleTableData: VinInfos[] = []; 

  ngOnInit() {
    this.dashboardService.getVeiculos().subscribe({
      error: (err: any) => {
        console.error('Erro ao carregar lista de veículos:', err);
      },
      next: (veiculos: { [s: string]: Veiculo; } | ArrayLike<Veiculo>) => {
        this.veiculos = Object.values(veiculos) as Veiculo[];

        if (this.veiculos.length > 0) {
          this.veiculoSelecionado = this.veiculos[0];

          
          this.dashboardService.getVinfos(this.veiculoSelecionado.vin).subscribe({
            error: (err: any) => { console.error('Erro ao carregar info VIN inicial:', err); },
            next: (vinInfoRetornado: VinInfos) => {
              
              const vinInfoCompleto: VinInfos = {
                ...vinInfoRetornado, 
                vin: this.veiculoSelecionado.vin 
              };
              this.vinInfos = vinInfoCompleto;
              this.allVehicleTableData = [vinInfoCompleto]; 
              console.log('VinInfos completo para a tabela (ngOnInit):', this.allVehicleTableData);
            }
          });

        } else {
          console.warn('Nenhum veículo encontrado para carregar.');
        }
      }
    });
  }

  onChangeSelect(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    const veiculo = this.veiculos.find((v) => v.id === id);

    if (veiculo) {
      this.veiculoSelecionado = veiculo;
      console.log('Veículo Selecionado (onChangeSelect):', this.veiculoSelecionado);

      this.dashboardService.getVinfos(this.veiculoSelecionado.vin).subscribe({
        error: (err: any) => { console.error('Erro ao carregar info VIN selecionado:', err); },
        next: (vinInfoRetornado: VinInfos) => {
          
          const vinInfoCompleto: VinInfos = {
            ...vinInfoRetornado, 
            vin: this.veiculoSelecionado.vin 
          };
          this.vinInfos = vinInfoCompleto;
          this.allVehicleTableData = [vinInfoCompleto]; 
          console.log('VinInfos completo para a tabela (onChangeSelect):', this.allVehicleTableData);
        }
      });
    }
  }
}