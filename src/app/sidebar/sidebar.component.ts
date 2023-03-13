import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/manageBooks', title: 'Manage Books',  icon: 'pe-7s-notebook', class: '' },
    { path: '/Books', title: 'Books',  icon: 'pe-7s-notebook', class: '' },
    { path: '/upgrade', title: 'Subscription',  icon:'pe-7s-lock', class: '' },
    { path: '/MemberPlan', title: 'Edit Subscription',  icon:'pe-7s-note2', class: '' },
    { path: '/library', title: 'My Library',  icon:'pe-7s-news-paper', class: '' },
    { path: '/maps', title: 'Issue Book',  icon:'pe-7s-note2', class: '' },
    { path: '/user', title: 'Member Profile',  icon:'pe-7s-user', class: '' },
    { path: '/editPlan', title: 'Users',icon:'pe-7s-user', class: '' },
    { path: '/icons', title: 'Edit Tags',  icon:'pe-7s-science', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
