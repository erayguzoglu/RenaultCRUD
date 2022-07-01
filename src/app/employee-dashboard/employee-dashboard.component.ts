import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel ();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder ,
    private api : ApiService) { } 

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      userName : [''],
      email : [''],
      phone : [''],
    })
    this.getAllEmployee();
  }
  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.userName = this.formValue.value.userName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;

    this.api.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Kullanıcı Ekleme Başarılı")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Bir Hata Oluştu")
    })
  }
   getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
   }

   deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Kullanıcı Silindi");
      this.getAllEmployee();
    })
   }

   onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['userName'].setValue(row.userName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['phone'].setValue(row.phone)

   }

   updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.userName = this.formValue.value.userName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.phone = this.formValue.value.phone;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Başarıyla Güncellendi");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })

   }
}
