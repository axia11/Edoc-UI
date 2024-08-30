import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MenuBarService } from './_service/menu-bar.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackbarService } from '../shared/_services/snackbar.service';
import { AlldocumentService } from '../activites/alldocument/_service/alldocument.service';
import { CreateCategoriesComponent } from './create-categories/create-categories.component';
import { CreateFoldersComponent } from './create-folder/create-folders.component';
import { UploadDocumentService } from '../categories/upload-document/_service/upload-document.service';
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  dropdownOpen: boolean = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  options = [
    { label: 'Create Categories', imgSrc: '../../assets/menu-icons/categ.svg' },
    { label: 'Create Folder', imgSrc: '../../assets/menu-icons/folder.svg' },
    { label: 'Upload File', imgSrc: '../../assets/menu-icons/upl-file.svg' }
  ];

  selectOption(option: { label: string; imgSrc: string }, index: number) {
    this.dropdownOpen = false;
    if (option.label === 'Create Categories') {
      this.createCategories();
    } else if (option.label === 'Upload File') {
      this.openOverlay();
    } else if (option.label === 'Create Folder') {
      this.createFolders();
    }
  }


  dataSource;
  respMenus = [];
  expandedMenu: any = '';
  menuSubscription = new Subscription();
  fovouriteList = [];
  @ViewChild(MatAccordion) accordion: MatAccordion;
  isEdit: boolean = false;
  isExpandedSide: boolean = false;
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource1;

  constructor(
    public apiService: MenuBarService,
    private router: Router,
    public dialog: MatDialog,
    private uploadservice: UploadDocumentService,
  ) { }

  ngOnInit(): void {
    this.apiService.notifyParentObservable$.subscribe(() => {
      this.getMenus();
    });
    this.getMenus();
  }

  primaryMenuItems = [
    { route: '/activites', icon: '../../assets/menu-icons/home.svg', text: 'Home' },
    { route: '/activites/alldoc', icon: '../../assets/menu-icons/allcatego.svg', text: 'My Files' },
    { route: '/activites/favorites', icon: '../../assets/menu-icons/fav.svg', text: 'Favorite' },
    { route: '/activites/recyclebin', icon: '../../assets/menu-icons/bin.svg', text: 'Recycle Bin' }
  ];
  getMenus() {
    this.apiService.getcatgList().subscribe(res => {
      if (res.response) {
        this.respMenus = res.response;
        this.apiService.mainMenuList = res.response;
        this.dataSource = this.apiService.mainMenuList
      }
    });
  }

  updateMenus() {
    this.menuSubscription = this.apiService.menus.subscribe(status => {
      if (status === true) {
        this.getMenus();
      }
    });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  fetchFavouritesList() {
    this.fovouriteList = localStorage.getItem('favouriteLists') ? JSON.parse(localStorage.getItem('favouriteLists')) : [];
    // console.log(this.fovouriteList);
  }

  enableEditMode() {
    if (this.isExpandedSide) this.isEdit = !this.isEdit;
  }

  checkNode(node) {
    let checkNodeElement = this.fovouriteList.find(obj => obj.MasterModule === node.MasterModule);
    //console.log(checkNodeElement);
    if (checkNodeElement != undefined) {
      return true;
    }
    else {
      return false;
    }
  }

  getLevel(data, node) {
    let path = data.find(branch => {
      return this.treeControl
        .getDescendants(branch)
        .some(n => n.MasterModule === node.MasterModule);
    });
    return path ? this.getLevel(path.children, node) + 1 : 0;
  }


  ngAfterViewInit() {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
      }
      if (evt instanceof NavigationEnd) {
        setTimeout(() => {
          if (this.router.url === '/activites/recent') {
            this.expandedMenu = location.pathname
          } else {
            let routePath = location.pathname.split('/');
            this.expandedMenu = routePath[0] == '' ? location.pathname.slice(1) : location.pathname;
            this.expandedMenu = location.pathname
          }
        }, 500);
      }
    });
  }

  openOverlay() {
    const data = { message: 'Hello from SomeComponent' };
    this.uploadservice.open(data);
  }

  createCategories() {
    let dialogRef = this.dialog.open(CreateCategoriesComponent, {
      width: '440px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  createFolders() {
    let dialogRef = this.dialog.open(CreateFoldersComponent, {
      width: '440px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
