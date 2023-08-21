import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { SingleInput } from '../model/SingleInput';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  validateForm!: FormGroup;

  singleInput:SingleInput;
  result: string;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.validateForm.controls);
    console.log(this.validateForm.get("username").value);
    
    this.singleInput = new SingleInput();

    this.singleInput.username = this.validateForm.get("username").value;
    this.singleInput.smiles = this.validateForm.get("smiles").value;
    this.singleInput.remember = this.validateForm.get("remember").value;
    this.singleInput.dataset = this.validateForm.get("dataset").value;

    this.apiService.predictOne(this.singleInput).subscribe((data:{result:string}) =>{
      this.result = data.result
    })
    
  }

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    console.log("input init")
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      smiles: [null, [Validators.required]],
      remember: [true],
      dataset: ["BACE"]
    });
  }

}
