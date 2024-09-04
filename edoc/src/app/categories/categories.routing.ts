import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'goblaldoc',
    // canActivate: [IsAuthGuard, RBACGuard],
    loadChildren: () => import('../categories/upload-document/upload-document.module').then(m => m.UploadDocumentModule)
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
