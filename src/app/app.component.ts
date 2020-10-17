import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
const query = gql`
    query Query {
        hello {
            world {
                fancyData
            }
        }
    }
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private apollo: Apollo) { }
    ngOnInit() {
        this.apollo.watchQuery({query})
            .valueChanges
            .subscribe((response: any) => {});
    }
}
