import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Customer } from "../models/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL_API = "http://192.168.1.67:3000/api/clientes/";
  selectedCustomer: Customer = {
    nombres:'',
    apellido:'',
    email:'',
  };
  
  customers: Customer[] = [];

  constructor(private http:HttpClient){
    
  }

  getCustomers(){
    return this.http.get<Customer[]>(this.URL_API);
  }

  createCustomer(customer: Customer){
    return this.http.post(this.URL_API,customer);
  }

  deleteCustomer(_id:string){
    return this.http.delete(this.URL_API+_id);
  }

  updateCustomer(customer:Customer){
    return this.http.put(this.URL_API+customer._id,customer);
  }
}
