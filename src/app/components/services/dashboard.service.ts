import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { TaskModel, ListNameModel } from "../dashboard/dashboard.model"
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) { }



  postTask(data: TaskModel):Observable<TaskModel> {
    return this.http.post<TaskModel>("https://617b7a78d842cf001711befc.mockapi.io/taskDetail", data)
      .pipe(map((res) => {
        return res;
      })
      );
  }
  getTask():Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>("https://617b7a78d842cf001711befc.mockapi.io/taskDetail")
      .pipe(map((res) => {
        return res;
      })
      );
  }
  deleteTask(id: number):Observable<TaskModel> {
    return this.http.delete<TaskModel>("https://617b7a78d842cf001711befc.mockapi.io/taskDetail/" + id)
      .pipe(map((res) => {
        return res;
      })
      );

  }

  //for list name api call

  postListName(data: ListNameModel):Observable<ListNameModel> {
    return this.http.post<ListNameModel>("https://617b7a78d842cf001711befc.mockapi.io/listNames", data)
      .pipe(map((res) => {
        return res ;
      })
      );
  }
  getListName():Observable<ListNameModel[]> {
    return this.http.get<ListNameModel[]>("https://617b7a78d842cf001711befc.mockapi.io/listNames")
      .pipe(map((res) => {
        return res;
      })
      );
  }
}
