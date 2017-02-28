import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from "rxjs/Rx";
import { Subject } from 'rxjs/Subject';

import { PRService } from '../pr.service';
import { PRModel } from '../model/pr.model';

@Component({
  moduleId: module.id,
  selector: 'app-prlist',
  templateUrl: './prlist.component.html',
  styleUrls: ['./prlist.component.css'],
  providers: [PRService]
})
export class PrlistComponent implements OnInit {
  public Total: number = 0;
  public PageIndex: number = 1;
  public List: Array<PRModel>;

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public prService: PRService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      // 这里可以从路由里面获取URL参数
      console.log(params);
      this.loadData('', this.PageIndex);
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
    this.loadData('', this.PageIndex);
  }

}
