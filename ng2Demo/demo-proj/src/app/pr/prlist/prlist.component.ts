import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from "rxjs/Rx";
import { Subject } from 'rxjs/Subject';

import { PRService } from '../pr.service';
import { PRModel } from '../model/pr.model';
import {NameValueItem} from '../model/namevalueitem.model';

@Component({
  //moduleId: module.id,
  selector: 'app-prlist',
  templateUrl: './prlist.component.html',
  styleUrls: ['./prlist.component.css'],
  providers: [PRService]
})
export class PrlistComponent implements OnInit {
  public Total: number = 0;
  public PageIndex: number = 1;
  public List: Array<PRModel>;
  public Supplier:string;
  public SupplierList: NameValueItem[] = null;

  public searchText: string;
  public searchTextStream: Subject<string> = new Subject<string>();

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public prService: PRService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      // 这里可以从路由里面获取URL参数
      console.log(params);
      this.loadData(this.searchText, this.PageIndex);
    });

    this.prService.getsupplier().subscribe(
      res => {
        this.SupplierList = res.List;
        this.SupplierList.unshift(new NameValueItem('', ''));
      },
      error => {console.log(error)},
      () => {}
    );

    this.searchTextStream
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(searchText => {
        console.log(this.searchText);
        this.loadData(this.searchText, 1);
      });
  }

  public loadData(searchText: string, page: number) {
    return this.prService.list(page).subscribe(
      res => {
        this.Total = res.Total;
        this.List = res.List;
      },
      error => { console.log(error) },
      () => { }
    );
  }

  public pageChanged(event: any): void {
    //console.log('Page changed to: ' + event.page);
    //console.log('Number items per page: ' + event.itemsPerPage);
    //this.PageIndex = event.page;
    //this.loadData('', this.PageIndex);
    this.router.navigateByUrl("pr/list/" + event.page);
  }

  public searchChanged($event): void {
    this.searchTextStream.next(this.searchText);
  }

  public gotoAdd():void{
		//TODO：如果没有登录，跳转到登录页，如果已登录，跳往写作页
		this.router.navigateByUrl("pr/add");
	}
}
