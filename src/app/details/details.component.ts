import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DetailsService} from "./details.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  options: any;
  loaded = true;

  constructor(private activateRoute: ActivatedRoute, private datePipe: DatePipe, private detailsService: DetailsService) {
    this.activateRoute.params.subscribe((res: any) => {
      console.log(res.code);
    });
  }

  ngOnInit(): void {
    this.options = {
      xAxis: {
        type: 'category',
        data: ['Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'June',
          'July',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec'],
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [],
          type: 'line'
        }
      ]
    };
  }

  getSeries(from: string, to: string) {
    this.loaded = false
    this.options.series[0].data = []
    this.detailsService.getTimeSeries((new Date().getFullYear() - 1).toString(), from, to).subscribe((res: any) => {

      for (let a = 0; a < 12; a++) {
        const d = this.datePipe.transform(new Date(2021, a + 1, 0), 'yyyy-MM-dd')!.toString();
        this.options.series[0].data.push(res.rates[d][to])
        console.log(this.options.series[0].data);
        console.log(this.datePipe.transform(d, 'yyyy-MM-dd'));
      }
      this.loaded = true
    })

  }
}
