import { Component, OnInit  } from '@angular/core';
import { PRModel } from './prmodel';
import  {PRItemModel} from './pritemmodel'
import { ModalModule } from 'ng2-bootstrap';
import {Observer, Observable} from "rxjs/Rx";

import { PRService } from './prservice';

@Component({
    moduleId: module.id,
    selector: 'pr-list',
    templateUrl: 'pr-list.component.html',
    providers: [PRService]
})
export class PRListComponent implements OnInit {
    public totalItems: number = 64;
    public currentPage: number = 1;
    list: PRModel[];
    SupplierList: string[] = ['', '淘宝', '京东'];

    constructor(private prService: PRService) { 

    }

    ngOnInit(): void {
        this.getlist();
    }

    getlist(): void {
        var resp = this.prService.list(this.currentPage);
        resp.forEach(p => {
            this.list = p.List;
            this.currentPage = p.PageIndex;
            this.totalItems = p.Total;
        });
    }

    public pageChanged(event: any): void {
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
        this.currentPage = event.page;
        this.getlist();
    }

    // TODO: Remove this when we're done
    //get diagnostic() { return JSON.stringify(this.model); }

    Supplier:string;

    showNewDlg : boolean = false;
    PR : PRModel = new PRModel(0, "", "", "", "", false, "", "", 0, []);

    Add() {
        this.list.push(this.PR);

        this.PR = new PRModel(0, "", "", "", "", false, "", "", 0, []);
    }

    DlgClose(){
        this.PR = new PRModel(0, "", "", "", "", false, "", "", 0, []);

    }

    Edit(pr : PRModel){
        this.PR = pr;

    }

    prForDelete : PRModel = null;
    selectForDelete(pr: PRModel){
        this.prForDelete = pr;

    }
    Delete(){
        if(this.prForDelete != null){
            this.list.splice(this.list.indexOf(this.prForDelete), 1);
        }
    }

    currentitem: PRItemModel = new PRItemModel(0, 0, "", 0, 0, 0, "");
    selectPRItem(item: PRItemModel){
        this.currentitem = item;
    }

    AddPRItem(){
        this.PR.Items.push(this.currentitem);
        this.currentitem = new PRItemModel(0, 0, "", 0, 0, 0, "");
    }




}