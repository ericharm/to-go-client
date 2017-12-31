import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { MatTableDataSource } from '@angular/material';
import { TodoResource } from './todo.service';

@Component({
    selector: 'app-dashboard',
    providers: [TodoResource],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    todos: Todo[] = [];
    dataSource: MatTableDataSource<Todo>;
    displayedColumns = ['title', 'description', 'due', 'edit'];

    constructor(private todoResource: TodoResource) {
        this.todos = [];
        this.dataSource = new MatTableDataSource<Todo>(this.todos);
    }

    ngOnInit() {
        this.todoResource.index().then(res => {
            this.todos = res;
            this.dataSource = new MatTableDataSource<Todo>(this.todos);
        }).catch(err => {
            console.log(err);
        });
    }

}

