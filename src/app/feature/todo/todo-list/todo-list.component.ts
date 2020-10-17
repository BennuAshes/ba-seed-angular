import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Todo } from '../todo.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { todoQuery } from '../todo.query';

const updateTodoMutation = gql`
    mutation updateTodo($updateTodo: UpdateTodoInput!) {
        updateTodo(updateTodo: $updateTodo) {
            id
            name
            description
            isCompleted
        }
    }
`;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    todos: Todo[];
    selectedId = '';
    form: FormGroup;

    constructor(private apollo: Apollo, private fb: FormBuilder) { }
    ngOnInit(): void {
        this.form = this.fb.group({
            name: '',
            description: '',
            isCompleted: false
        });
        this.apollo.watchQuery({query: todoQuery})
            .valueChanges
            .subscribe((response: any) => {
                this.todos = response.data.todos as Todo[];
        });
    }
    markAsTrue(todo) {
        this.todos.forEach(t => t.isEditMode = false);
        todo.isEditMode = true;
        this.form.controls.name.setValue(todo.name);
        this.form.controls.description.setValue(todo.description);
        this.form.controls.isCompleted.setValue(todo.isCompleted);
    }

    update(id: string, name: string, description: string, isCompleted: boolean) {
        console.log('update', id, isCompleted, description, isCompleted);
        this.apollo.mutate({
            mutation: updateTodoMutation,
            variables: {
                updateTodo: {
                    id,
                    name,
                    description,
                    isCompleted
                }
        }}).subscribe();
    }

    get isCompleted() {
        return this.form.controls.isCompleted.value;
    }

    get name() {
        return this.form.controls.name.value;
    }

    get description() {
        return this.form.controls.description.value;
    }
}
