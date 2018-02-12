import { Component, OnInit } from '@angular/core'
import { Todo } from './todo'
import { MatTableDataSource } from '@angular/material'
import { TodoResource } from './todo.service'

@Component({
  selector: 'app-dashboard',
  providers: [TodoResource],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todos: Todo[] = []
  newTodo: Todo
  dataSource: MatTableDataSource<Todo>
  displayedColumns: string[] = ['title', 'description', 'due', 'edit']
  createFormEnabled: boolean = false
  now: Date = new Date()

  constructor(private todoResource: TodoResource) {
    this.dataSource = new MatTableDataSource<Todo>(this.todos)
    this.newTodo = { title: '', description: '', due: Date() }
  }

  ngOnInit() {
    this.todoResource.index().then(res => {
      this.todos = res
      this.formatDates()
      this.dataSource = new MatTableDataSource<Todo>(this.todos)
    }).catch(err => {
      console.log(err)
    })
  }

  formatDates() {
    this.todos.forEach((todo) => {
      todo.due = new Date(todo.due).toDateString()
    })
  }

  enableCreateForm() {
    this.createFormEnabled = true
  }

  addTask() {
    this.todoResource.save(this.newTodo).then(res => {
      console.log(res)
      this.todos.push(Object.assign({}, this.newTodo))
      this.formatDates()
      this.dataSource = new MatTableDataSource<Todo>(this.todos)
      this.newTodo = { title: '', description: '', due: Date() }
      this.createFormEnabled = false
    }).catch(err => {
      console.log(err)
    })

  }

}

