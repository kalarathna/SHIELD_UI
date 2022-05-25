import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/service/data.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  providers: [MessageService]
})
export class UploadComponent implements OnInit {


  ngOnInit(): void {
  }

}

