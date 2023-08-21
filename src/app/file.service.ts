import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  read(file: Blob | File): Promise<any> {

    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        const array = reader.result.toString().split(/\r?\n/);
        resolve(array); 
        
      };
    });
  }

}
