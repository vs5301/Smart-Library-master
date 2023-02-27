import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/Books', title: 'Books',  icon: 'pe-7s-notebook', class: '' },
    { path: '/user', title: 'Member Profile',  icon:'pe-7s-user', class: '' },
    { path: '/MemberPlan', title: 'Subscription',  icon:'pe-7s-note2', class: '' },
    { path: '/library', title: 'My Library',  icon:'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: '/maps', title: 'Review',  icon:'pe-7s-note2', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    // { path: '/register', title: 'Sign up',  icon:'pe-7s-lock', class: '' },
    // { path: '/login', title: 'Sign in',  icon:'', class: '' },


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
