import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealisationsComponent } from './realisations.component';

const routes: Routes = [{ path: '', component: RealisationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealisationsRoutingModule { }
