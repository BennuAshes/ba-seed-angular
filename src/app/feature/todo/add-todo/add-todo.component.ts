import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { todoQuery } from '../todo.query';
const addTodoMutation = gql`
    mutation addTodo($addTodo: AddTodoInput!) {
        addTodo(addTodo: $addTodo) {
            id
            name
            description
            isCompleted
        }
    }
`;
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
    todos: Todo[];
    form: FormGroup;
    selectedId = '';
    constructor(private apollo: Apollo, private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            isCompleted: [false]
        });
    }
  ngOnInit(): void {
  }
  add(name: string, description: string, isCompleted: boolean) {
    console.log(name, description, isCompleted);
    this.apollo.mutate({
        mutation: addTodoMutation,
        variables: {
            addTodo: {
                name,
                description,
                isCompleted
            }
        },
        refetchQueries: [{query: todoQuery}]
    }).subscribe();
}
}
