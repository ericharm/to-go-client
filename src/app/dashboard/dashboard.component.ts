import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { MatTableDataSource } from '@angular/material';
import { Resource } from '../resource/resource.service';

@Component({
    selector: 'app-dashboard',
    providers: [Resource],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    todos: Todo[] = [];
    dataSource: MatTableDataSource<Todo>;
    displayedColumns = ['title', 'description', 'due', 'edit'];

    constructor(private resource: Resource) {
        this.todos = [];
        this.dataSource = new MatTableDataSource<Todo>(this.todos);
    }

    ngOnInit() {
        this.resource.get("todos").then(res => {
            this.todos = res;
            this.dataSource = new MatTableDataSource<Todo>(this.todos);
        }).catch(err => {
            console.log(err);
        })
    }

}

