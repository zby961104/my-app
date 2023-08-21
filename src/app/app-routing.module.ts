import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { TestComponent } from './test/test.component';
import { HistoryComponent } from './history/history.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';


const routes:Routes=[
  {
    path: 'home', 
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'input',
    pathMatch: 'full'
  },
  {
    path: 'input', 
    component: InputComponent,
    data: {
      breadcrumb: '输入单个分子'
    }
    
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {
      breadcrumb: '查询历史记录'
    }
  },
  {
    path: 'bulk-upload',
    component: BulkUploadComponent,
    data: {
      breadcrumb: '批量输入分子'
    }
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
