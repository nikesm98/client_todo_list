import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TaskListComponent } from './task-list/task-list.component';

export const routes: Routes = [
    {
        path: '', component: TodoComponent
    },
    {
        path: 'app-task-list', component: TaskListComponent
    }
];
