import { Output, EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css']
})

export class ListTarjetaCreditoComponent implements OnInit {

  @Input('tarjetasCredito') tarjetas: TarjetaCredito[];
  @Output() tarjetaEliminadaEvento = new EventEmitter<string>();

  constructor(
    private tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

  }

  editarTarjeta(tarjeta: TarjetaCredito) {
    this.tarjetaService.actualizar(tarjeta);
  }

  eliminarTarjeta(id: number) {
    if (confirm('¿Estás seguro que desea eliminar el registro?')) {
      this.tarjetaService.eliminarTarjeta(id).subscribe(res => {
        this.tarjetaEliminadaEvento.emit('');
        this.toastr.warning('Registro eliminado', 'La tarjeta fue eliminada.');
      });
    }
  }

  trackByFn(index, item) {
    return item.id;
  }
}
