import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../services/customer.service'
import { NgForm } from "@angular/forms";
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(public customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  resetForm(form:NgForm){
    console.log("reset")
    form.reset();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(
      res => {
      this.customerService.customers = res;
      },
      err => console.log(err)
    )
  }

  addCostumer(form:NgForm){
    if(form.value._id){
      if( confirm("¿Está seguro de modificar el cliente?")){
        this.customerService.updateCustomer(form.value).subscribe(
          res=>{
            console.log(res);
            this.getCustomers();
            form.reset();
          },
          err => console.log(err)
        )
      }
    }else{
      if(form.value.email){
        if(form.value.dni){
          this.customerService.createCustomer(form.value).subscribe(
            res =>{
              var status = JSON.stringify(res);
              var status2= JSON.parse(status)["status"];
              if(status2==1){
                this.getCustomers();
                form.reset();
              }else{
                console.log(JSON.parse(status)["message"])
                alert(JSON.parse(status)["message"]);
              }              
            },
            err => console.log(err)
          )
        }else{
          alert("El atributo DNI es necesario");
        }
      }else{
        alert("El atributo E-mail es necesario");
      }
    }
  }

  deleteCustomer(customer:Customer){
    if( confirm("¿Está seguro de eliminar el cliente?")){
      this.customerService.deleteCustomer(customer._id!)
      .subscribe(
        res => this.getCustomers(),
        err => console.log(err)
        );
    }
  }

  editCustomer(customer:Customer){
    this.customerService.selectedCustomer._id = customer._id;
    this.customerService.selectedCustomer.nombres = customer.nombres;
    this.customerService.selectedCustomer.apellido = customer.apellido;
    this.customerService.selectedCustomer.dni = customer.dni;
    this.customerService.selectedCustomer.email = customer.email;
    this.customerService.selectedCustomer.telefono = customer.telefono;
  }
}
