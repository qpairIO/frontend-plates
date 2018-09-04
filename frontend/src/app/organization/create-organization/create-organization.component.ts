import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import  { UserStore } from './../../user/user.store';
import  { OrganizationService } from './../organization-service';

@Component({
  selector: 'app-create-organization.layout-column.flex',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {
	item: { name: string, description: string };
	user: any;

  constructor(
  	private userStore: UserStore, 
  	private organizationService: OrganizationService,
  	private router: Router) {
  	this.item = {
  		name: '',
  		description: ''
  	};

  	this.userStore.user.subscribe(user => {
  		this.user = user;
  	});

  }

  ngOnInit() {
  }

  create() {
  	this.organizationService.createOrgByUser(this.user.id, this.item).subscribe(user => {
  		this.userStore.setUser(user);
  		this.router.navigate(['/dashboard']);
  	});
  }

}
