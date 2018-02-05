import { SettingsRoutingModule } from './routing/settings-routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountExporterComponent } from './account-exporter/account-exporter.component';
import { AccountSettingsDashboardComponent } from './account-settings-dashboard/account-settings-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountExporterComponent,
    AccountSettingsDashboardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SettingsModule { }
