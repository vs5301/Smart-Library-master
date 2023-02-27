import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'app/home/home.component';
import { IconsComponent } from 'app/icons/icons.component';
import { TypographyComponent } from 'app/library/typography.component';
import { MapsComponent } from 'app/maps/maps.component';
import { TablesComponent } from 'app/Member Plan/tables.component';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { UpgradeComponent } from 'app/upgrade/upgrade.component';
import { UserComponent } from 'app/user/user.component';

const routes: Routes = [
    { path: 'Books',          component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'MemberPlan',     component: TablesComponent },
    { path: 'library',        component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
