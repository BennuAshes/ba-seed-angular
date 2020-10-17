import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './feature/todo/todo.component';

const routes: Routes = [
    //{ path: '', redirectTo: 'todos', pathMatch: 'full' },
    {
        path: 'todos',
        loadChildren: () => import('./feature/todo/todo.module').then(m => m.TodoModule)
    },
    {
        path: '',
        component: TodoComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
