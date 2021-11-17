import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'nx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  constructor(
    private router: Router,
  ) { }
  currentModel: any = undefined;

  ngOnInit(): void {
    this.items = [
      {id: '1', label: 'Reports', icon: 'pi pi-fw pi-chart-bar'},
      {id: '2', label: 'Products', icon: 'pi pi-fw pi-shopping-cart', routerLink:['/products'], styleClass: '.p-menuitem-link-active'},
      {id: '3', label: 'Logs', icon: 'pi pi-fw pi-server'},
      {id: '4', label: 'Logout', icon: 'pi pi-fw pi-times-circle', routerLink:['/login']}
    ];
  }

  clickHandler(event: any){
    console.log(event.target.id);
  }

}
