import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appTitle: string | undefined;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.appTitle = this.configService.getAppTitle();
  }
}
