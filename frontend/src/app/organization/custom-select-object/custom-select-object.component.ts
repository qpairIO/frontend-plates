import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'custom-select-object',
  templateUrl: './custom-select-object.component.html',
  styleUrls: ['./custom-select-object.component.scss']
})
export class CustomSelectObjectComponent implements OnInit {

	@Input() items: any;
	@Input() model: any;
	@Input() staticText: string = '';
	@Input() valueField: string = '';
	@Input() textField: string = '';
	@Input() shortName: string = '';
	@Input() nameField: string = '';

	@Output() update: EventEmitter<any> = new EventEmitter<any>();

	selectedItem: any;

  constructor() { }

  ngOnInit() {
  	this.nameField = this.nameField || 'name';
    this.valueField = this.valueField || 'value';
  }

  selectItem(item) {
  	console.log(item);
    setTimeout(() => {
      this.update.emit(item);
    });
  }

  ngOnChanges() {
  	this.selectedItem = _.find(this.items, (item) => {
      return item[this.valueField] === this.model[this.valueField];
    });
  }

}
