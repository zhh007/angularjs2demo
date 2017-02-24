import { Component, OnInit  } from '@angular/core';
import { PRModel } from './prmodel';
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
    public currentPage: number = 4;
    list: PRModel[];

    constructor(private prService: PRService) { 

    }

    ngOnInit(): void {
        this.getlist();
    }

    getlist(): void {
        var resp = this.prService.list(this.currentPage);
        resp.forEach(p => {
            this.list = p.List;
        });
    }

    public pageChanged(event: any): void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    }

    SupplierList: string[] = ['', '淘宝', '京东'];

    // list : PRModel[] = [
    //     new PRModel(1, "市场1部", "张三", "13800001111", "2017-2-22", false, "淘宝", "杭州", 500, []),
    //     new PRModel(1, "市场1部", "张三", "13800001111", "2017-2-22", false, "京东", "杭州", 500, [])
    // ];

    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];
    //model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
    submitted = false;
    onSubmit() { this.submitted = true; }
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

}