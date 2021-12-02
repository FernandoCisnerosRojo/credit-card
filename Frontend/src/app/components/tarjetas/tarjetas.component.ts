import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  tarjetas: TarjetaCredito[];

  constructor(
    private tarjetaService: TarjetaService
  ) { }

  ngOnInit(): void {
    this.mostrarTarjetas();
  }

  mostrarTarjetas() {
    this.tarjetaService.obtenerTarjetas().subscribe((res: TarjetaCredito[]) => {
      this.tarjetas = res;
    });    
  }

  actualizarListaTajetas(mensaje: string) {
    this.mostrarTarjetas();
  }

}
