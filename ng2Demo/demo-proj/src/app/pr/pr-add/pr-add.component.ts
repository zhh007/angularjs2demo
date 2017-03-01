import { Component,ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer, Observable } from "rxjs/Rx";
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

import { PRService } from '../pr.service';
import { PRModel } from '../model/pr.model';
import { PRItemModel } from '../model/pritem.model'

import {PrItemAddComponent} from './pritem-add.component'

@Component({
  selector: 'app-pr-add',
  templateUrl: './pr-add.component.html',
  styleUrls: ['./pr-add.component.css'],
  providers: [PRService],
  //directives:[PrItemAddComponent]
})
export class PrAddComponent implements OnInit {
  @ViewChild('dlg') dlg:PrItemAddComponent;
  public mainForm: FormGroup;
  public prInfo: PRModel = new PRModel();
  public currentitem: PRItemModel = new PRItemModel();
  public Items: PRItemModel[] = new Array<PRItemModel>();

  public formErrors = {
    'Deptment': '',
    'User': '',
    'Phone': '',
    'Supplier': '',
    'SupplierAddress': ''
  };
  validationMessages = {
    'Deptment': {
      'required': '申请人部门必须输入。',
      'minlength': '申请人部门2到20个字符。'
    },
    'User': {
      'required': '申请人必须输入。',
      'minlength': '申请人2到20个字符。'
    },
    'Phone': {
      'required': '联系电话必须输入。',
      'pattern': '请输入正确的联系电话。'
    },
    'Supplier': {
      'required': '供应商必须输入。',
      'minlength': '供应商2到20个字符。'
    },
    'SupplierAddress': {
      'required': '供应商地址必须输入。',
      'minlength': '供应商地址2到50个字符。'
    }
  };

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public fb: FormBuilder,
    //private dlg: PrItemAddComponent
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.mainForm = this.fb.group({
      "Deptment": [
        this.prInfo.Deptment,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      "User": [
        this.prInfo.User,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      "Phone": [
        this.prInfo.Phone,
        [
          Validators.required,
          Validators.pattern("/^1\d{10}$/")
        ]
      ],
      "Supplier": [
        this.prInfo.Supplier,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      "SupplierAddress": [
        this.prInfo.SupplierAddress,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ]
      ],
      "IsPrePay": 'True',
      "Goods": this.fb.array([])
    });
    this.setItems(this.Items);
    this.mainForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  setItems(items: PRItemModel[]) {
    const item_group = items.map(item => this.fb.group(item));
    const formArray = this.fb.array(item_group);
    this.mainForm.setControl('Goods', formArray);
  }

  getItems(): FormArray {
    return this.mainForm.get('Goods') as FormArray;
  };

  delItem(index: number): void {
    const arrayControl = <FormArray>this.mainForm.controls['Goods'];
    arrayControl.removeAt(index);
  }

  showAddItemDlg(): void {
    this.dlg.showChildModal();
      // const arrayControl = <FormArray>this.mainForm.controls['Goods'];
      // let newGroup = this.fb.group({
      //     // Fill this in identically to the one in ngOnInit
      // }
      // arrayControl.push(newGroup);
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
