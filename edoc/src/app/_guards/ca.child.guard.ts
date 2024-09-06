import { Router, CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class CanActivateChildGuard implements CanActivateChild {

  constructor(
    private readonly router: Router,
    private dialog: MatDialog
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    if (this.dialog.openDialogs.length > 0) {
      const currentUrlTree = this.router.createUrlTree([], route);
      const currentUrl = currentUrlTree.toString();
      this.router.navigate([currentUrl]);
      this.dialog.closeAll();
      return false;
    } else {
      return true;
    }
  }
}
