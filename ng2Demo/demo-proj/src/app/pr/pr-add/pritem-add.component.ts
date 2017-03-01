import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer, Observable } from "rxjs/Rx";
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalModule, ModalDirective } from 'ng2-bootstrap';

import { PRItemModel } from '../model/pritem.model'

@Component({
    selector: 'pritem-add',
    templateUrl: './pritem-add.component.html'
})
export class PrItemAddComponent implements OnInit {
    public mainForm: FormGroup;
    public currentitem: PRItemModel = new PRItemModel();
    @ViewChild('dlg') dlg: ModalDirective;

    public formErrors = {
        'Name': '',
        'Price': '',
        'Count': '',
        'Remark': '',
    };

    validationMessages = {
        'Name': {
            'required': '商品名称必须输入。',
            'minlength': '商品名称2到30个字符。'
        },
        'Price': {
            'required': '单价必须输入。',
            'minlength': '请输入正确的单价。'
        },
        'Count': {
            'required': '数量必须输入。',
            'pattern': '请输入正确的数量。'
        },
        'Remark': {
            'maxlength': '备注最多200个字符。'
        }
    };

    constructor(
        public router: Router,
        public activeRoute: ActivatedRoute,
        public fb: FormBuilder
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm(): void {
        this.mainForm = this.fb.group({
            "Name": [
                this.currentitem.Name,
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ]
            ],
            "Price": [
                this.currentitem.Price,
                [
                    Validators.required,
                    Validators.pattern("/^\d+$/")
                ]
            ],
            "Count": [
                this.currentitem.Count,
                [
                    Validators.required,
                    Validators.pattern("/^\d+$/")
                ]
            ],
            "Remark": [
                this.currentitem.Remark,
                [
                    Validators.maxLength(200)
                ]
            ],
        });
        this.mainForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
    }

    onValueChanged(data?: any) {
        if (!this.mainForm) { return; }
        const form = this.mainForm;
        for (const field in this.formErrors) {
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    public showChildModal(): void {
        this.dlg.show();
    }

    public hideChildModal(): void {
        this.dlg.hide();
    }

    doSave() {
        // if (this.userForm.valid) {
        //   this.userInfo = this.userForm.value;
        //   this.userRegisterService.register(this.userInfo)
        //     .subscribe(
        //       data => {
        //         this.router.navigateByUrl("home");
        //       },
        //       error => {
        //         this.formErrors.formError = error.message;
        //         console.error(error);
        //       }
        //     );
        // }else{
        //    this.formErrors.formError = "存在不合法的输入项，请检查。";
        // }
        // console.log(this.userInfo);
    }


}