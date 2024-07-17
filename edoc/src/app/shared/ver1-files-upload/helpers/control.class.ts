import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ValidatorFn, ValidationErrors } from './validators.class';
import { IsNullOrEmpty } from './helpers.class';

export enum STATUS {
    INVALID,
    VALID,
    DISABLED
}

export class FileUploadControl {

    public files: Set<File> = new Set();

    private listVisible = true;

    private status: STATUS = STATUS.VALID;

    private errors: Array<{[key: string]: any}> = [];

    private validators: Array<ValidatorFn> = [];

    private statusChanged: Subject<STATUS> = new Subject();

    /**
     * track status `VALID`, `INVALID` or `DISABLED`
     */
    public statusChanges: Observable<STATUS> = this.statusChanged.asObservable();

    /**
     * emit an event every time the value of the control
     * changes.
     * Initially returns last value
     */
    public readonly valueChanges: BehaviorSubject<Array<File>> = new BehaviorSubject([]);

    /**
     * @internal
     * used to trigger layout change for list visibility
     */
    public readonly listVisibilityChanges: BehaviorSubject<boolean> = new BehaviorSubject(this.listVisible);

    constructor(validators?: ValidatorFn|Array<ValidatorFn>) {
        this.defineValidators(validators);
    }

    /**
     * set functions that determines the synchronous validity of this control.
     */
    public setValidators(newValidators: ValidatorFn|Array<ValidatorFn>): this {
        this.defineValidators(newValidators);
        this.validate();
        return this;
    }

    private defineValidators(validators: ValidatorFn|Array<ValidatorFn>): void {
        if (!IsNullOrEmpty(validators)) {
            this.validators = Array.isArray(validators) ? [...validators] : [validators];
        }
    }

    public addFile(file): this {
        this.files.add(file);
        this.valueChanges.next(Array.from(this.files.values()));
        this.validate();
        return this;
    }

    public removeFile(file: File): this {
        this.files.delete(file);
        this.valueChanges.next(Array.from(this.files.values()));
        this.validate();
        return this;
    }

    public addFiles(files: FileList): this {
        this.addMultipleFiles(Array.from(files));
        return this;
    }

    /**
     * @internal
     * used to prevent valueChanges emit more times
     * when multiple files are uploaded
     */
    private addMultipleFiles(files: Array<File>): void {
        files.forEach(file => this.files.add(file));
        this.valueChanges.next(Array.from(this.files.values()));
        this.validate();
    }

    public get valid(): boolean {
        return this.errors.length === 0 && this.status !== STATUS.DISABLED;
    }

    public get invalid(): boolean {
        return this.errors.length > 0 || this.status === STATUS.DISABLED;
    }

    public getError(): Array<ValidationErrors> {
        return this.errors;
    }

    /**
     * number of uploaded files
     */
    public get size(): number {
        return this.files.size;
    }

    /**
     * return list of Files
     */
    public get value(): Array<File> {
        return Array.from(this.files.values());
    }

    public setValue(files: Array<File>): this {
        this.files.clear();

        if (files instanceof Array) {
            this.addMultipleFiles(files);
        } else {
            throw Error(`FormControl.setValue was provided with wrong argument type, ${files} was provided instead Array<File>`);
        }

        return this;
    }

    /**
     * reset the control
     */
    public clear(): this {
        this.files.clear();
        this.valueChanges.next(Array.from(this.files.values()));
        return this;
    }

    public get isListVisible(): boolean {
        return this.listVisible;
    }

    public setListVisibility(isVisible: boolean = true): this {
        this.listVisible = isVisible;
        this.listVisibilityChanges.next(this.listVisible);
        return this;
    }

    public get disabled() {
        return this.status === STATUS.DISABLED;
    }

    public enable(isEnabled: boolean = true): this {
        this.status = isEnabled ? STATUS.VALID : STATUS.DISABLED;
        this.validate();
        this.statusChanged.next(this.status);
        return this;
    }

    public disable(isDisabled: boolean = true): this {
        this.status = isDisabled ? STATUS.DISABLED : STATUS.VALID;
        this.validate();
        this.statusChanged.next(this.status);
        return this;
    }

    private validate(): void {
        if (this.status !== STATUS.DISABLED) {
            const currentState = this.valid;
            this.errors = this.validators.map((validator) => validator(this)).filter((isInvalid) => isInvalid);

            if (currentState !== this.valid) {
                this.statusChanged.next(this.valid ? STATUS.VALID : STATUS.INVALID);
            }
        } else {
            this.errors.length = 0;
        }
    }
}
