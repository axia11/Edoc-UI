import {
  Directive,
  ElementRef,
  Input,
  SimpleChanges,
  Renderer2,
  HostBinding,
  HostListener
} from '@angular/core';
import { CommonService } from '../_services/common.service';

export interface PermissionData {
  tabName: string;
  btnType: string;
}

@Directive({
  selector: '[appRoleAccess]'
})
export class AccessControlDirective {
  @Input('permissionData') permissionData: PermissionData;
  btnType: any;
  tabData: any;
  @HostBinding('disabled') disabled: boolean = true;
  tabDataflag: any;

  constructor(
    private elementRef: ElementRef,
    private cs: CommonService,
    private renderer: Renderer2
  ) {}

  permissionList: any = {
    1: {
      READ: false,
      CREATE: false,
      UPDATE: false,
      DELETE: false,
      EDIT: false,
      ADD: false,
      SAVE: false
    },
    2: {
      READ: false,
      CREATE: true,
      UPDATE: false,
      DELETE: false,
      EDIT: false,
      ADD: true,
      SAVE: true
    },
    3: {
      READ: false,
      CREATE: true,
      UPDATE: true,
      DELETE: false,
      EDIT: true,
      ADD: true,
      SAVE: true
    },
    4: {
      READ: true,
      CREATE: true,
      UPDATE: true,
      DELETE: true,
      EDIT: true,
      ADD: true,
      SAVE: true
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    const [tabName, btnType] = changes.permissionData.currentValue;
    this.btnType = btnType;
    this.checkPermission(tabName, btnType);
  }

  private checkPermission(currentTab, btnType) {
    let tabData;
    this.cs.getAllTabData.subscribe(data => {
      if (data.length > 0) {
        tabData = data.find(item => item.url === currentTab); 
        this.setPermission(tabData, btnType);
      }
    });
  }

  setPermission(tabData, btnType) {
    if (tabData != undefined) {
      this.tabDataflag = tabData.flag;
      if (this.permissionList[tabData.flag][btnType]) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
  
  @HostListener('click', ['$event'])
  clickEvent(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.permissionList[this.tabDataflag][this.btnType]) {
      // this.renderer.setAttribute(
        this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
        // this.elementRef.nativeElement,'disabled','true');
    } else {
      this.renderer.setAttribute(this.elementRef.nativeElement,'disabled','true');
      // this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
    }
  }
}
