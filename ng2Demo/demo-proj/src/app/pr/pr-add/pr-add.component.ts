import { Component, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer, Observable } from "rxjs/Rx";
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

import { PRService } from '../pr.service';
import { PRModel } from '../model/pr.model';
import { PRItemModel } from '../model/pritem.model'

import { PrItemAddComponent } from './pritem-add.component'

@Component({
  selector: 'app-pr-add',
  templateUrl: './pr-add.component.html',
  styleUrls: ['./pr-add.component.css'],
  providers: [PRService],
  //directives:[PrItemAddComponent]
})
export class PrAddComponent implements OnInit {
  @ViewChild('dlg') dlg: PrItemAddComponent;
  public mainForm: FormGroup;
  public prInfo: PRModel = new PRModel();
  public itemIndex: number = -1;
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
    private location: Location,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public fb: FormBuilder,
    public prService: PRService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      var prid = params["id"];
      if (prid) {
        this.loadData(prid);
      }
    });
    this.buildForm();
  }

  buildForm(): void {
    this.mainForm = this.fb.group({
      "ID": [
        '0', []
      ],
      "Deptment": [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      "User": [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      "Phone": [
        '',
        [
          Validators.required,
          //Validators.pattern("/^1\d{10}$/")
        ]
      ],
      "Supplier": [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      "SupplierAddress": [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50)
        ]
      ],
      "IsPrePay": 'true',
      //"Goods": this.fb.array([])
    });
    //this.setItems(this.Items);
    this.mainForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  loadData(id: number) {
    return this.prService.get(id).subscribe(
      res => {
        this.mainForm.reset({
          ID: res.ID,
          Deptment: res.Deptment,
          User: res.User,
          Phone: res.Phone,
          //CreateTime: res.CreateTime,
          IsPrePay: res.IsPrePay ? 'true' : 'false',
          Supplier: res.Supplier,
          SupplierAddress: res.SupplierAddress,
        });
        this.Items = res.Items;
      },
      error => { console.log(error) },
      () => { }
    );
  }

  // setItems(items: PRItemModel[]) {
  //   const item_group = items.map(item => this.fb.group(item));
  //   const formArray = this.fb.array(item_group);
  //   this.mainForm.setControl('Goods', formArray);
  // }

  // getItems(): FormArray {
  //   return this.mainForm.get('Goods') as FormArray;
  // };

  // delItem(index: number): void {
  //   const arrayControl = <FormArray>this.mainForm.controls['Goods'];
  //   arrayControl.removeAt(index);
  // }

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
    if (this.mainForm.valid) {
      const formModel = this.mainForm.value;
      formModel.Items = this.Items.map(
        (item: PRItemModel) => Object.assign({}, item)
      );

      console.log(formModel);
      this.prService.save(formModel).subscribe(
        data => {
          this.router.navigateByUrl("pr/list/1");
        },
        error => {
          //this.formErrors.formError = error.message;
          console.error(error);
        }
      );
    } else {
      //this.formErrors.formError = "存在不合法的输入项，请检查。";
      console.log(this.prInfo);
    }

  }

  addItem(): void {
    this.itemIndex = -1;
    this.dlg.show();
  }

  editItem(index: number): void {
    this.itemIndex = index;
    var cur = this.Items[index];
    this.dlg.edit(cur);
  }

  delItem(index: number): void {
    this.Items.splice(index, 1);
  }

  onPRItemSave(item: PRItemModel): void {
    if (this.itemIndex == -1) {
      this.Items.push(item);
    } else {
      this.Items[this.itemIndex] = item;
      this.itemIndex = -1;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
