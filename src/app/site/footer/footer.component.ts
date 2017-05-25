import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'in-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
