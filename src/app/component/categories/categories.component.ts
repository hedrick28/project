import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Output() actionEmitter = new EventEmitter<string>();
  image_url = "assets/images/categories";
  
  constructor() { }

  ngOnInit(): void {
  }
  filter(category: string){
    this.actionEmitter.emit(category)
  }
}
