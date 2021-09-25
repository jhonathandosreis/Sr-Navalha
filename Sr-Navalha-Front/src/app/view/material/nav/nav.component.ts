import { NavService } from './../../../controllers/nav.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navMaterial',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavMaterialComponent implements OnInit {

  side_buttons: any[] = [
    { path: "/category-list", name: "Categorias", icon: "bookmark", visible: true },
    { path: "/product-list", name: "Produtos", icon: "shopping_cart", visible: true }
  ]

  @ViewChild('sidenav', { static: true })
  private sidenav!: MatSidenav;

  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.navService.setSidenav(this.sidenav);
  }
}
