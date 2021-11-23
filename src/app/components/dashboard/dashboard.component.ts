import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TaskModel, ListNameModel } from "./dashboard.model";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../services/auth.service";
import { DashboardService } from "../services/dashboard.service";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  todaytask = "../../../assets/images/todo-tasks.png";
  upcommingtasks = "../../../assets/images/upcomingtasks.png";
  overduetasks = "../../../assets/images/overduetasks.png";
  todaytas = "todays task image";
  upcommingtask = "upcomming image";
  overduetask = "overduetask image";

  formList!: FormGroup;
  formValue!: FormGroup;
  listModelObj: ListNameModel = new ListNameModel();
  taskModelObj: TaskModel = new TaskModel();
  listData!: ListNameModel[];
  taskData!: TaskModel[];
  listTotalCount: number | any = [];
  countList: number = 0;
  countTask: number = 0;

  priorityList = [
    { id: 1, name: "High" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Low" },
  ];
  taskDate: string = "";
  todayTask: number = 0;
  commingTask: number = 0;
  overDueTask: number = 0;
  totalCountTask: number = 0;
  currentDate = formatDate(new Date(), "yyyy-M-d", "en_US");

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeListName();
    this.initializeTaskList();
    this.totalCount();
  }

  initializeListName(): void {
    this.formList = this.formBuilder.group({
      listname: new FormControl("", [Validators.required]),
    });
    this.getAllListName();
  }
  initializeTaskList(): void {
    this.formValue = this.formBuilder.group({
      taskname: new FormControl("", [Validators.required]),
      chooselist: new FormControl("", [Validators.required]),
      choosepriority: new FormControl("", [Validators.required]),
      dateTime: new FormControl("", [Validators.required]),
    });
    this.getAllTask();
  }

  //choose list name details

  postListnameDetails(): void {
    if (this.formList.invalid) {
      return;
    }
    this.listModelObj.listname = this.formList.value.listname;
    this.dashboardService.postListName(this.listModelObj).subscribe(
      () => {
        this.formList.reset();
        this.toastr.success("List Added Successfully");
        this.getAllListName();
      },
      (err) => {
        this.toastr.error("Something went wrong", "Main error", {
          timeOut: 3000,
        });
      }
    );
  }
  getAllListName(): void {
    this.dashboardService.getListName().subscribe((ListNameModel) => {
      this.listData = ListNameModel;
    });
  }

  // task detils
  postTaskDetails(): void {
    if (this.formValue.invalid) {
      return;
    }
    this.taskModelObj.taskname = this.formValue.value.taskname;
    this.taskModelObj.chooselist = this.formValue.value.chooselist;
    this.taskModelObj.choosepriority = this.formValue.value.choosepriority;
    this.taskModelObj.dateTime = this.formValue.value.dateTime;
    this.dashboardService.postTask(this.taskModelObj).subscribe(
      () => {
        this.formValue.reset();
        this.toastr.success("Task Added Successfully");
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.getAllTask();
      },
      (err) => {
        this.toastr.error("Something went wrong", "Main error", {
          timeOut: 3000,
        });
      }
    );
  }
  getAllTask(): void {
    this.dashboardService.getTask().subscribe((TaskModel) => {
      this.taskData = TaskModel;
      for (let task of this.taskData) {
        this.taskDate = formatDate(task.dateTime, "yyyy-M-d", "en_US");
        if (this.taskDate === this.currentDate) {
          this.todayTask++;
        }
        if (this.taskDate > this.currentDate) {
          this.commingTask++;
        }
        if (this.taskDate < this.currentDate) {
          this.overDueTask++;
        }
      }
    });
  }
  deleteTask(row: number): void {
    this.dashboardService.deleteTask(row).subscribe(() => {
      this.toastr.success("Task Deleted Successfully");
      this.getAllTask();
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }
  totalCount() {
    this.dashboardService.getTask().subscribe((res) => {
      this.taskData = res;
      this.dashboardService.getListName().subscribe((ListNameModel) => {
        this.listData = ListNameModel;
        for (let list of this.listData) {
          this.countList = 0;
          for (let task of this.taskData) {
            this.countTask = 0;
            if (list.listname === task.chooselist) {
              this.countTask++;
            }
            this.countList = this.countList + this.countTask;
          }
          this.listTotalCount.push(this.countList);
        }
      });
    });
  }
  loggedOut(): void {
    this.authService.logout();
  }
}
