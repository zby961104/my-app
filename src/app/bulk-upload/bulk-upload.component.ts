import { Component, OnInit } from '@angular/core';
import { BulkInput } from '../model/BulkInput';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { FileService } from '../file.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {

  bulkInput: BulkInput;

  result:string[]=[];
  filename?:string;
  checked = true;
  checked2 = false

  constructor(private fileService: FileService, private msg: NzMessageService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.bulkInput = new BulkInput();
  }

  async upload(e: Event){
    this.filename = null
    this.result = []
    this.bulkInput.smiles = []

    const f = e.target as HTMLInputElement;
    const file = f.files[0];
    f.value = ''; // 解决上传同个文件失效
    
    // 读取文件
    let data = await this.fileService.read(file);
  
    this.bulkInput.smiles = data;

    console.log(this.bulkInput);
  }

  predict(){
    this.apiService.predictAll(this.bulkInput).subscribe((data:{result:string[], filename:string}) =>{
      this.result = data.result
      this.filename = data.filename
    })
  }

  download(){
    this.apiService.download(this.filename).subscribe((data) => {
      var sJson = JSON.stringify(data);
      var element = document.createElement('a');
      element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
      element.setAttribute('download', this.filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click(); // simulate click
      document.body.removeChild(element);
    })
  }
  


}
