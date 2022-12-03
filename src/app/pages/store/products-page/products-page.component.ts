import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  public products$!: Observable<any[]>; // operador de dammit (!) e ele indicará que você, programador, garante para o compilador que aquele valor não será nulo.

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.products$ = this.data.getProducts();
  }

}
