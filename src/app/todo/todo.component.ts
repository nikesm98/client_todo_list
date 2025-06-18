import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  newTask: string = '';
  newTaskId: string= '';
  newTaskDone: boolean = false;
  tasks: { id: string, title: string, completed: boolean }[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.todoService.getTodos().subscribe(data => this.tasks = data);
  }

  addTask(): void {
    if (this.newTask.trim() !== '' && this.newTaskId.trim() !== '') {
      const newTodo: Todo = {
        id: this.newTaskId,
        title: this.newTask,
        completed: this.newTaskDone,
        // description: '',
        // completed: false
      };
      this.todoService.addTodo(newTodo).subscribe(todo => {
        this.tasks.push(todo);
        this.newTask = '';
        this.newTaskId = '';
        this.newTaskDone = false;
      });
    }
  }

  toggleTask(index: number): void {
    // const updated = { ...this.tasks[index], completed: !this.tasks[index].completed };
    // this.todoService.updateTodo(updated).subscribe(todo => this.tasks[index] = todo);
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  deleteTask(index: number): void {
    const taskId = this.tasks[index].id;
    console.log("Deleting task with ID:", taskId);

    this.todoService.deleteTodo(taskId).subscribe({
      next: () => {
        this.tasks.splice(index, 1);
        console.log("Task deleted from frontend list");
      },
      error: (err) => {
        console.error("Failed to delete task:", err);
      }
    });

  }
  
}