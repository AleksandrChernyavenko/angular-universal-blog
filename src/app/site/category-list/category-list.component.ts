import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories: any[] = [
    {id: 1, name: 'Home'},
    {id: 2, name: 'Health'},
    {id: 3, name: 'Travels and life'},
    {id: 1, name: 'Home'},
    {id: 2, name: 'Health'},
    {id: 3, name: 'Travels and life'},
    {id: 1, name: 'Home'},
    {id: 2, name: 'Health'},
    {id: 3, name: 'Travels and life'},
    ];

  constructor() {
  }

  ngOnInit() {
  }

}
