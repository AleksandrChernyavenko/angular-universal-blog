import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
