import { Component, OnInit } from '@angular/core';
import { Resource } from '../shared/resource.service';

@Component({
    selector: 'app-dashboard',
    providers: [Resource],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    todos = [];
    constructor(private resource: Resource) {
    }

    ngOnInit() {
        this.resource.get("todos").then(res => {
            //this.todos = res.data;
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

}
