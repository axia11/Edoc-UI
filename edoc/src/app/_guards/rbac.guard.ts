// import { Injectable } from '@angular/core';
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
//   NavigationExtras
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { MenuService } from '../_services/menu.service';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class RBACGuard implements CanActivate {
//   constructor(private router: Router, private menuservice: MenuService) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const userId = route.queryParams.userId || localStorage.userId;
//     let defaultRoleId = localStorage.getItem('RLId');

//     // this.menuservice.getAllPlant(+userId).subscribe((data: any) => {
//     //   if (data['result'].rows.length > 0) {
//     //     for (var i = 0; i < data['result'].rows.length; i++) {
//     //       if (
//     //         data['result'].rows[i].isDefault == true &&
//     //         data['result'].rows[i].PLId != null
//     //       ) {
//     //         localStorage.setItem('RLId', data['result'].rows[i].RLId);
//     //         defaultRoleId = data['result'].rows[i].RLId || localStorage.RLId;
//     //       }
//     //     }
//     //   }
//     // });
//     console.log(state);
//     const currMTModId = route.firstChild.data.screenId;
//     let currUrl = state.url
//       .substring(1)
//       .split('/')
//       .slice(0, 2)
//       .join('/');
//     if (defaultRoleId) {
//       return this.menuservice.getMenuList(+defaultRoleId).pipe(
//         map(data => {
//           let menuData = Object.assign([], ...data.response.userScreens);
//           let mainList = [];

//           menuData.map(item => {
//             mainList.push(item);
//             if (item.UM_Modules.length > 0) {
//               let childNode = item.UM_Modules.map(elem => {
//                 let url = elem.UM_Screens[0].url;
//                 elem.Modurl = url;
//                 return elem;
//               });
//               mainList = [...mainList, ...childNode];
//             }
//           });
//           let entityNameList = mainList.find(
//             item => item.MTModId === currMTModId || item.MODId === currMTModId
//           );
//           console.log(mainList, 'collectAllChildRouteData');
//           if (entityNameList && entityNameList !== undefined) {
//             if (entityNameList.hasAccess) {
//               return true;
//             } else {
//               this.navigateTo();
//               return false;
//             }
//           } else {
//             this.navigateTo();
//             return false;
//           }
//         })
//       );
//     }
//   }

//   trimURL(url) {
//     return url
//       .substring(0)
//       .split('/')
//       .slice(0, 2)
//       .join('/');
//   }

//   navigateTo() {
//     if (window.location.host.includes('localhost')) {
//       window.location.href = `http://${window.location.host}/notAuthorised`; // cannot be implemented using router.navigate() due to multi level child route page is not rendering after navigation
//     } else {
//       window.location.href = `https://${window.location.host}/notAuthorised`; // cannot be implemented using router.navigate() due to multi level child route page is not rendering after navigation
//     }
//     return false;
//   }
// }
