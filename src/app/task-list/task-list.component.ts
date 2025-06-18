import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TodoService } from '../todo/todo.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient,
     private todoService: TodoService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.todoService.getTodos().subscribe(data => {
      this.tasks = data;
    });
  }

  deleteTask(taskId: string) {
  console.log("Deleting task with ID:", taskId);
  this.todoService.deleteTodo(taskId).subscribe();  
  }
}
