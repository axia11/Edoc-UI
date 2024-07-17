import {
  Component,
  Input,
  OnInit,
  ElementRef,
  HostListener,
  Renderer2,
  OnDestroy,
  HostBinding,
  Inject,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy,
  ContentChild,
  forwardRef,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { FileUploadControl } from './../helpers/control.class';
import { IsNullOrEmpty } from './../helpers/helpers.class';
import { FileUploadService } from './../services/file-upload.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrMsgComponent } from '../../_components/errMsg.component';
// import { MatDialog } from '@angular/material/dialog';
// import { ErrMsgComponent } from '../../_components/errMsg.component';
// import { MatDialog } from '@angular/material';
// import { ErrMsgComponent } from '../../../../shared/errMsg.component';

export const DRAGOVER = 'dragover';
export const TOUCHED = 'ng-touched';

@Component({
  selector: `file-upload`,
  templateUrl: `./file-upload.component.html`,
  styleUrls: [`./file-upload.component.scss`],
  providers: [
    FileUploadService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input()
  public control: FileUploadControl = null;
  @Input() isView: boolean;
  @Input() apiService;
  @Input() isEdit: boolean;
  @Input() isSingleFileUpload: boolean = true;

  @Output() delFile: EventEmitter<any> = new EventEmitter();
  @Output() upFile: EventEmitter<any> = new EventEmitter();
  @Output() dlFile: EventEmitter<any> = new EventEmitter();
  @Output() updtFile: EventEmitter<any> = new EventEmitter();
  @Output() inpChange: EventEmitter<any> = new EventEmitter();

  @ContentChild('placeholder')
  public templateRef: TemplateRef<any> = null;

  @ContentChild('item')
  public listItem: TemplateRef<any> = null;

  @ViewChild('inputRef')
  public input: ElementRef<HTMLInputElement>;

  public templateContext = {
    $implicit: this.fileUploadService.isFileDragDropAvailable(),
    isFileDragDropAvailable: this.fileUploadService.isFileDragDropAvailable()
  };

  private hooks: Array<Function> = [];

  private subscriptions: Array<Subscription> = [];

  @HostListener('click', ['$event.target'])
  onClick(evt) {
    // console.log(evt.className.match('upload-list'), 'Fileupload evt');
    // if (!evt.className.match('upload-list') && !this.isView) {

    // }
  }

  constructor(
    private dialog: MatDialog,
    public fileUploadService: FileUploadService,
    private hostElementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    if (IsNullOrEmpty(this.control)) {
      this.control = new FileUploadControl();
    }

    this.setEvents();
    this.checkAndMarkAsDisabled();
    this.connectToForm();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.isView) {
        this.control.disable();
      }
    }, 0);
  }

  public ngOnDestroy(): void {
    this.cdr.detach();
    this.hooks.forEach((hook) => hook());
    this.hooks.length = 0;
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions.length = 0;
  }

  @HostBinding('class.has-files')
  public get hasFiles(): boolean {
    return this.control.isListVisible && this.control.size > 0;
  }

  @HostBinding('class.ng-invalid')
  public get isInvalid(): boolean {
    return !this.control.disabled && this.control.invalid;
  }

  private setEvents(): void {
    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((eventName) => {
      this.hooks.push(
        this.renderer.listen(this.document, eventName, (event: any) => this.preventDragEvents(event))
      );
    });

    ['dragover', 'dragenter'].forEach((eventName) => {
      this.hooks.push(
        this.renderer.listen(this.hostElementRef.nativeElement, eventName, (event: any) => this.onDragOver(event))
      );
    });

    ['dragleave', 'dragend', 'drop'].forEach((eventName) => {
      this.hooks.push(
        this.renderer.listen(this.hostElementRef.nativeElement, eventName, (event: any) => this.onDragLeave(event))
      );
    });

    this.subscriptions.push(
      this.control.statusChanges.subscribe((status) => this.checkAndMarkAsDisabled())
    );

    this.subscriptions.push(
      this.control.valueChanges.subscribe((files) => this.cdr.markForCheck())
    );
  }

  private checkAndMarkAsDisabled(): void {
    if (this.control.disabled) {
      this.renderer.addClass(this.hostElementRef.nativeElement, 'disabled');
      // this.renderer.setProperty(this.input.nativeElement, 'disabled', true);
    } else {
      this.renderer.removeClass(this.hostElementRef.nativeElement, 'disabled');
      // this.renderer.setProperty(this.input.nativeElement, 'disabled', false);
    }
  }

  private preventDragEvents(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * on file over add class name
   */
  private onDragOver(event: DragEvent): void {
    this.renderer.addClass(this.hostElementRef.nativeElement, DRAGOVER);
  }

  /**
   * on mouse out remove class name
   */
  private onDragLeave(event: DragEvent): void {
    this.renderer.removeClass(this.hostElementRef.nativeElement, DRAGOVER);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {
    if (this.control.disabled) {
      return;
    }
    const files = event.dataTransfer.files as FileList;
    this.addFiles(files);
    this.onTouch();
  }

  public onInputChange(event: Event): void {

    const input = (event.target) as HTMLInputElement;
    const files = input.files;


    if (!this.control.disabled) {
      this.addFiles(files);
    }
    this.clearInputEl();
    this.onTouch();
  }

  inpChangeEvt(event: Event) {
    this.inpChange.emit(event);
  }
  addedFiles() {
    const filesAdded = [];
    this.control.files.forEach(item => {
      filesAdded.push(item['file']['name']);
    });
    return filesAdded;
  }

  addFiles(files) {
    const addedFiles = this.addedFiles();
    const removedFiles = [];
    if (this.isSingleFileUpload && this.control.files.size == 0){
      if (addedFiles.indexOf(files[0].name) === -1) {
        this.control.addFile({
          item: {},
          file: files[0]
        });
      } else {
        removedFiles.push(files[0].name);
      }
    }
   else if(!this.isSingleFileUpload){
    for (let i = 0; i < files.length; i++) {
      if (addedFiles.indexOf(files[i].name) === -1) {
        this.control.addFile({
          item: {},
          file: files[i]
        });
      } else {
        removedFiles.push(files[i].name);
      }
    }
    if (removedFiles.length) {
      this.dialog.open(ErrMsgComponent, {
        width: '400px',
        data: {
          message: `${removedFiles.join()} already exist!,<br><br>Please rename the file!`
        }
      });
    }
  }else{
    this.dialog.open(ErrMsgComponent, {
      width: '400px',
      data: {
        message: `${removedFiles.join()} Message required!`
      }
    });

  }
}


  private clearInputEl(): void {
    this.input.nativeElement.value = null;
  }

  /**
   * ControlValueAccessor implementation
   */
  private connectToForm(): void {
    this.subscriptions.push(
      this.control.valueChanges.subscribe((v) => this.onChange(v))
    );
  }

  /**
   * model -> view changes
   */
  public writeValue(files: any): void {
    if (files != null) {
      this.control.setValue(files);
    }
  }

  private onChange: (v: Array<File>) => void = () => { };

  /**
   * register function which will be called on UI change
   * to update view -> model
   */
  public registerOnChange(fn: (v: Array<File>) => void): void {
    this.onChange = fn;
  }

  private onTouch: () => void = () => {
    this.renderer.addClass(this.hostElementRef.nativeElement, TOUCHED);
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.control.disable(isDisabled);
  }
}
