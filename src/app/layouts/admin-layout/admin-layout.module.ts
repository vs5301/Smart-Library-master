import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes,  } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../Member Plan/tables.component';
import { TypographyComponent } from '../../library/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';


@NgModule({
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,

  ]
})

export class AdminLayoutModule {}
