import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment.dev';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `
})
export class AppMenu {
  model: MenuItem[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Dashboard',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
      },
      {
        label: 'User Management',
        items: [
          { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/admin/users'] },
          { label: 'Messages', icon: 'pi pi-fw pi-comments', routerLink: ['/messages'] }
        ]
      },
      {
        label: 'Diet Assistant',
        items: [
          { label: 'Meal Planner', icon: 'pi pi-fw pi-calendar', routerLink: ['/meal-planner'] },
          { label: 'Meal Templates', icon: 'pi pi-fw pi-clone', routerLink: ['/admin/meal-plan-templates'] },
          { label: 'Nutrition Tracker', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/nutrition-tracker'] },
          { label: 'Recipes', icon: 'pi pi-fw pi-book', routerLink: ['/recipes'] }
        ]
      },
      {
        label: 'Settings',
        items: [
          { label: 'Preferences', icon: 'pi pi-fw pi-cog', routerLink: ['/preferences'] }
        ]
      }
    ];

    // Only add demo section in development
    if (!environment.production) {
      this.model.push({
        label: 'Development',
        items: [
          {
            label: 'Demo Components',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/demo']
          }
        ]
      });
    }
  }
}
