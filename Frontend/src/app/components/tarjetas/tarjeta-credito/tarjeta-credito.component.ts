import { Output, EventEmitter, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})

export class TarjetaCreditoComponent implements OnInit, OnDestroy {

  form: FormGroup;
  @Output() tarjetaAgregadaEvento = new EventEmitter<string>();
  subscription: Subscription;
  tarjeta: TarjetaCredito;
  idTarjeta = 0;

  constructor(
    private formBuilder: FormBuilder,
    private tarjetaService: TarjetaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.subscription = this.tarjetaService.obtenerTarjeta$().subscribe(data => {
      this.tarjeta = data;
      this.form.patchValue({
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cvv: this.tarjeta.cvv
      });
      this.idTarjeta = this.tarjeta.id || 0;
    })
  }

  ngOnDestroy() {
    console.log('???');
    this.subscription.unsubscribe();
  }

  inicializarFormulario() {
    this.form = this.formBuilder.group({
      id: 0,
      titular: ['', [Validators.required]],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }

  crearTarjeta(): TarjetaCredito {
    const tarjeta: TarjetaCredito = {
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value
    }
    return tarjeta;
  }

  agregarTarjeta() {
    const tarjeta = this.crearTarjeta();
    this.tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
      this.tarjetaAgregadaEvento.emit('');
      this.toastr.success('Registro agregado', 'La tarjeta fue agregada.');
      this.form.reset();
    })
  }

  editarTarjeta() {
    const tarjeta: TarjetaCredito = {
      id: this.idTarjeta,
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cvv: this.form.get('cvv').value
    }
    this.tarjetaService.actualizarTarjeta(tarjeta.id, tarjeta).subscribe(data => {
      this.tarjetaAgregadaEvento.emit('');
      this.toastr.success('Registro actualizado', 'La tarjeta fue modificada.');
      this.form.reset();
      this.idTarjeta = 0;
    })
  }

  guardarTarjeta() {
    if (this.idTarjeta === 0) {
      this.agregarTarjeta();
    } else {
      this.editarTarjeta();
    }
  }

}
