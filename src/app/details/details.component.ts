import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DetailsService} from "./details.service";
import {ConverterPanelService} from "../converter-panel/converter-panel.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  options: any;
  loaded = false;
  loadPanel = false;
  private parametersObservable: any;
  currencyTitle = {abb: '', name: ''}

  constructor(private activateRoute: ActivatedRoute, private datePipe: DatePipe, private detailsService: DetailsService, private converterPanelService: ConverterPanelService,) {

  }

  ngOnInit(): void {
    this.parametersObservable = this.activateRoute.queryParams.subscribe((params) => {
      if (params['from']) {
        this.converterPanelService.formValues = {
          from: params['from'],
          to: params['to'],
          amount: ''
        }
      }
    })
    this.loadPanel = true
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

  getSeries(from: string, to: string, full: string) {
    this.loaded = false
    this.options.series[0].data = []
    this.currencyTitle = {abb: from, name: full}
    this.detailsService.getTimeSeries((new Date().getFullYear() - 1).toString(), from, to).subscribe((res: any) => {
      for (let a = 0; a < 12; a++) {
        const d = this.datePipe.transform(new Date(2021, a + 1, 0), 'yyyy-MM-dd')!.toString();
        this.options.series[0].data.push(res.rates[d][to])
      }
      this.loaded = true
    })

  }

  ngOnDestroy() {
    if (this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }
}
