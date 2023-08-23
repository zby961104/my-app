import { Component, OnInit } from '@angular/core';
import { HistoryData } from '../model/HistoryData';
import { BulkHistoryData } from '../model/BulkHistoryData';
import { ApiService } from '../api.service';

const BASE_URL = "http://localhost:5000/"

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  datasetMap = {
    "BACE": "BACE-1抑制活性",
    "BBBP": "血脑屏障穿透性"
  }

  historyDataList: HistoryData[]=[];
  bulkHistoryDataList: BulkHistoryData[]=[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getHistory().subscribe((data: HistoryData[]) =>{
      this.historyDataList = data;
    });
    this.apiService.getBulkHistory().subscribe((data: BulkHistoryData[]) =>{
      this.bulkHistoryDataList = data;
    });
  }

  download(filename:string){
    console.log("button!")
    this.apiService.download(filename).subscribe((data) => {
      var sJson = JSON.stringify(data);
      var element = document.createElement('a');
      element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click(); // simulate click
      document.body.removeChild(element);
    })
  }

}
