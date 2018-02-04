import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserva-filtro',
  templateUrl: './reserva-filtro.component.html',
  styleUrls: ['./reserva-filtro.component.scss']
})
export class ReservaFiltroComponent implements OnInit {

  recursos: any = [];
  docentes: any = [];
  filtro: any = {
    pagina: 1,
    quantidade: 10,
  };

  constructor() { }

  ngOnInit() {
  }

}
