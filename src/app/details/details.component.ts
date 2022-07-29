import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute,) {
    this.activateRoute.params.subscribe((res:any) => {
      console.log(res.code);
    });
  }

  ngOnInit(): void {
  }

}
