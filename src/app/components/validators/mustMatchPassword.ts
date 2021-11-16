import { FormGroup } from "@angular/forms";

export function MustMatchPassword(controlName:string,matchingControlName:string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if(matchingControl.errors && !matchingControl.errors){
        return;
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch:true})
      }
      else{
        matchingControl.setErrors(null);
      }
    }
  
  }