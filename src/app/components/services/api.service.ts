import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { TaskModel, ListNameModel } from "../dashboard/dashboard.model"

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}



  postTask(data: TaskModel){
    return this.http.post<any>("https://617b7a78d842cf001711befc.mockapi.io/taskDetail", data)
    .pipe(map((res: any) => {
        return res ;
      })
    );
  }
  getTask() {
    return this.http.get<any>("https://617b7a78d842cf001711befc.mockapi.io/taskDetail")
    .pipe(map((res: any) => {
        return res;
      })
    );
  }
  deleteTask(id:number){
    return this.http.delete<any>("https://617b7a78d842cf001711befc.mockapi.io/taskDetail/"+id)
    .pipe(map((res: any) => {
        return res;
      })
    );

  }

  //for list name api call

  postList(data: ListNameModel){
    return this.http.post<any>("https://617b7a78d842cf001711befc.mockapi.io/listNames", data)
    .pipe(map((res: any) => {
        return res ;
      })
    );
  }
  getList() {
    return this.http.get<any>("https://617b7a78d842cf001711befc.mockapi.io/listNames")
    .pipe(map((res: any) => {
        return res;
      })
    );
  }
}
