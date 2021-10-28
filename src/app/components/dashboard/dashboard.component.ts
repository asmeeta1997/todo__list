import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskModel, ListNameModel } from './dashboard.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todaytask = "../../../assets/images/todo-tasks.png";
  upcommingtasks = "../../../assets/images/upcomingtasks.png";
  overduetasks = "../../../assets/images/overduetasks.png";
  todaytas = "todays task image";
  upcommingtask = "upcomming image";
  overduetask = "overduetask image";

  currentDate: Date = new Date();

  formList !: FormGroup;
  formValue !: FormGroup;
  listModelObj: ListNameModel = new ListNameModel();
  taskModelObj: TaskModel = new TaskModel();
  listData !: any;
  taskData !: any;
  priorityList = [
    { id: 1, name: 'High' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Low' }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private toastr: ToastrService,
    private authService:AuthService,
  ) { }

  
  ngOnInit(): void {

    //choose list name
    this.formList = this.formBuilder.group({
      listname: new FormControl("", [Validators.required])
    })
    this.getAllListName();

    //task list 

    this.formValue = this.formBuilder.group({
      taskname: new FormControl("", [Validators.required]),
      chooselist: new FormControl("", [Validators.required]),
      choosepriority: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),

    })
    this.getAllTask();
  }

  //choose list name details

  postListnameDetails() {
    if (this.formList.invalid) {
      return;
    }
    this.listModelObj.listname = this.formList.value.listname;
    this.api.postList(this.listModelObj)
      .subscribe(res => {
        this.toastr.success('List Added Successfully');
        let ref = document.getElementById('close')
        ref?.click();
        this.formList.reset();
        this.getAllListName();
      },
        err => {
          this.toastr.error('Something went wrong', 'Main error',{
            timeOut: 3000,
          });
        })
  }
  getAllListName() {
    this.api.getList()
      .subscribe(res => {
        this.listData = res;
      })
  }

  // task detils

  postTaskDetails() {
    if (this.formValue.invalid) {
      return;
    }
    this.taskModelObj.taskname = this.formValue.value.taskname;
    this.taskModelObj.chooselist = this.formValue.value.chooselist;
    this.taskModelObj.choosepriority = this.formValue.value.choosepriority;
    this.taskModelObj.date = this.formValue.value.date;

    this.api.postTask(this.taskModelObj)
      .subscribe(res => {
        this.toastr.success('Task Added Successfully');
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllTask();
      },
        err => {
          this.toastr.error('Something went wrong', 'Main error',{
            timeOut: 3000,
          });
        })

  }
  getAllTask() {
    this.api.getTask()
      .subscribe(res => {
        this.taskData = res;
      })
  }
  deleteTask(row: any) {
    this.api.deleteTask(row)
      .subscribe(res => {
        this.toastr.success('Task Deleted Successfully');
        this.getAllTask();
      })
  }
  loggedOut(){
    this.authService.logout();
   }  
}



