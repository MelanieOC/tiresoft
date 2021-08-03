import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss']
})
export class SelectCustomerComponent implements OnInit {

  listCustomer:any = []
  customerForm = new FormControl('')

  constructor(
    private dbs: DatabaseService,
    private auth: AuthService,
    public router: Router
  ) { 
    
  }

  ngOnInit(): void {
    let user = this.auth.user.value
    const formUser = new FormData();
    formUser.append('user_id', user.id);
    this.dbs.getClientList(formUser).subscribe(res => {
      this.listCustomer = res['data']
    })
  }

  selectCustomer(){
    this.dbs.customerSelect.next(this.customerForm.value)
    this.router.navigate(['/main/home'])
    localStorage.setItem('client_tiresoft', JSON.stringify(this.customerForm.value));
  }

}
