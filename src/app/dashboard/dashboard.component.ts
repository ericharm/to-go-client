import { Component, OnInit } from '@angular/core'
import { Todo } from './todo'
import { MatTableDataSource } from '@angular/material'
import { MatSnackBar } from '@angular/material'
import { TodoResource } from './todo.service'

@Component({
  selector: 'app-dashboard',
  providers: [TodoResource],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todos: Todo[] = []
  archived: Todo[] = []
  newTodo: Todo
  todosDataSource: MatTableDataSource<Todo>
  archivedDataSource: MatTableDataSource<Todo>
  displayedColumns: string[] = ['title', 'description', 'due', 'edit', 'delete', 'complete']
  archivedColumns: string[] = ['title', 'description', 'due', 'delete', 'put back']
  createFormEnabled: boolean = false
  now: Date = new Date()

  constructor(public snackBar: MatSnackBar, private todoResource: TodoResource) {
    this.todosDataSource = new MatTableDataSource<Todo>(this.todos)
    this.archivedDataSource = new MatTableDataSource<Todo>(this.archived)
    this.newTodo = this.resetNewTodo()
  }

  ngOnInit() {
    this.todoResource.index().then(res => {
      this.todos = res.filter((todo) => {
        return !todo.completed
      })
      this.archived = res.filter((todo) => {
        return todo.completed
      })
      this.formatDates()
      this.todosDataSource = new MatTableDataSource<Todo>(this.todos)
      this.archivedDataSource = new MatTableDataSource<Todo>(this.archived)
    }).catch(err => {
      console.log(err)
    })
  }

  formatDates() {
    this.todos.forEach((todo) => {
      todo.due = new Date(todo.due).toLocaleString('en-US')
    })
    this.archived.forEach((todo) => {
      todo.due = new Date(todo.due).toLocaleString('en-US')
    })
  }

  isExpired(dueDate) {
    return new Date() > new Date(dueDate)
  }

  enableCreateForm() {
    this.createFormEnabled = true
  }

  addTask() {
    this.todoResource.save(this.newTodo).then(res => {
      console.log(res)
      this.openSnackBar("'" + this.newTodo.title + "' has been added", 'Success!')
      this.todos.push(Object.assign({}, res))
      this.formatDates()
      this.todosDataSource = new MatTableDataSource<Todo>(this.todos)
      this.newTodo = this.resetNewTodo()
      this.createFormEnabled = false
    }).catch(err => {
      console.log(err)
      this.openSnackBar('Unable to create new task', 'ERROR')
    })
  }

  edit(todo) {
    todo.editing = true
  }

  update(todo) {
    todo.editing = false
    this.todoResource.update(todo).then(res => {
      console.log(res)
      this.formatDates()
      this.openSnackBar("'" + todo.title + "' has been updated", 'Success!')
    }).catch(err => {
      console.log(err)
      this.openSnackBar('Could not update ' + todo.title + '.', 'ERROR')
    })
  }

  complete(todo) {
    console.log(todo)
    var completedTodo: any = { id: todo.id, completed: true }
    this.todoResource.update(completedTodo).then(res => {
      console.log(res)
      this.todos = this.todos.filter((todo_) => { return todo_.id !== res.id })
      this.archived.push(todo)
      this.todosDataSource = new MatTableDataSource<Todo>(this.todos)
      this.archivedDataSource = new MatTableDataSource<Todo>(this.archived)
      this.openSnackBar("'" + todo.title + "' has been marked complete", 'Success!')
    }).catch(err => {
      console.log(err)
      this.openSnackBar('Unable to set ' + todo.title + ' as complete', 'ERROR')
    })
  }

  putBack(todo) {
    console.log(todo)
    var returnedTodo: any = { id: todo.id, completed: false }
    this.todoResource.update(returnedTodo).then(res => {
      console.log(res)
      this.archived = this.todos.filter((todo_) => { return todo_.id !== res.id })
      this.todos.push(todo)
      this.todosDataSource = new MatTableDataSource<Todo>(this.todos)
      this.archivedDataSource = new MatTableDataSource<Todo>(this.archived)
      this.openSnackBar("'" + todo.title + "' has been put back", 'Success!')
    }).catch(err => {
      console.log(err)
      this.openSnackBar('Unable to put back task ' + todo.title, 'ERROR')
    })
  }

  delete(todo) {
    console.log(todo)
    this.todoResource.delete(todo).then(res => {
      console.log(res)
      this.todos = this.todos.filter((todo_) => { return todo_.id !== res.id })
      this.archived = this.archived.filter((todo_) => { return todo_.id !== res.id })
      this.formatDates()
      this.todosDataSource = new MatTableDataSource<Todo>(this.todos)
      this.archivedDataSource = new MatTableDataSource<Todo>(this.archived)
      this.openSnackBar("'" + todo.title + "' has been removed", 'Success!')
    }).catch(err => {
      console.log(err)
      this.openSnackBar('Unable to remove ' + todo.title, 'ERROR')
    })
  }

  getFormHeight() {
    return this.createFormEnabled ? '200px' : '100px'
  }

  private resetNewTodo() {
    return {
      title: '',
      description: '',
      due: Date(),
      completed: false,
      id: null,
      editing: false
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
