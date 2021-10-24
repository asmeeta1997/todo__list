import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { TaskModel } from './dashboard.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todaytask = "../../../assets/images/todo-tasks.png";
  upcommingtasks = "../../../assets/images/upcomingtasks.png";
  overduetasks = "../../../assets/images/overduetasks.png";

  formValue !: FormGroup;
  taskModelObj: TaskModel = new TaskModel();
  taskData !: any;

  listNames = [
    { id: 1, name: 'Personal'},
    { id: 2, name: 'Work'},
    { id: 3, name: 'College work' },
    { id: 4, name: 'Shopping' },
    { id: 5, name: 'Birthday' },
    { id: 6, name: 'Tour' }
  ];
  priorityList = [
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' }
  ];


  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      taskname: [''],
      chooselist: [''],
      choosepriority: [''],
      date: ['']

    })
    this.getAllTask();
  }

  postTaskDetails() {
    this.taskModelObj.taskname = this.formValue.value.taskname;
    this.taskModelObj.chooselist = this.formValue.value.chooselist;
    this.taskModelObj.choosepriority = this.formValue.value.choosepriority;
    this.taskModelObj.date = this.formValue.value.date;
    

    this.api.postTask(this.taskModelObj)
      .subscribe(res => {
        console.log(res)
        alert("List Added Succesfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllTask();
      },
        err => {
          alert("Someting went wrong")
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
        alert("Task Deleted");
        this.getAllTask();
      })
  }


}
