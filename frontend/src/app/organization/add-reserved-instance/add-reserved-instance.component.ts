import * as moment from 'moment';
import * as _ from 'lodash';
import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-reserved-instance',
  templateUrl: './add-reserved-instance.component.html',
  styleUrls: ['./add-reserved-instance.component.scss']
})
export class AddReservedInstanceComponent implements OnInit {
	@Input() name;
	@Input() instance;
	data: { 
		packages: Array<any>, 
		months: Array<any> 
	} = { packages: [], months: [] };
	model: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  	this.data = {
  		packages: [
        {
          id: 1,
          title: '1-year All Upfront',
          discount: '47%',
          description: 'Break-even on 6 months 15 days'
        },
        {
          id: 2,
          title: '1-year Partial Upfront',
          discount: '45%',
          description: 'Break-even on 6 months 19 days'
        },
        {
          id: 3,
          title: '1-year No Upfront',
          discount: '36%',
          description: 'Break-even on 7 months 22 days'
        },
        {
          id: 4,
          title: '3-year All Upfront',
          discount: '65%',
          description: 'Break-even on 12 months 17 days'
        },
        {
          id: 5,
          title: '3-year Partial Upfront',
          discount: '63%',
          description: 'Break-even on 13 months 12 days'
        }
      ],
      months: moment.months()
  	};
  	this.model = {
      packageId: this.data.packages[0].id,
      package: this.data.packages[0],
      quantity: this.instance.quantity,
      instance: _.omit(this.instance, ['quantity']),
      startMonth: this.data.months[0]
    };
  }

  selectPackage(pkg) {
    this.model.packageId = pkg.id;
    this.model.package = pkg;
  }

  submit() {
    this.activeModal.close(this.model);
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

}
