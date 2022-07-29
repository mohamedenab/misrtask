import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConverterPanelService} from "./converter-panel.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-converter-panel',
  templateUrl: './converter-panel.component.html',
  styleUrls: ['./converter-panel.component.scss']
})
export class ConverterPanelComponent implements OnInit {
  symbols = {}
  convertForm = this.fb.group({
    amount: '',
    fromLabel: 'EUR',
    toLabel: 'USD',
  })
  rateFactor = 0
  result = 0
  @Output() amountChange = new EventEmitter();
  @Output() fromChange = new EventEmitter();

  constructor(private converterPanelService: ConverterPanelService, private fb: FormBuilder, public router: Router) {
  }

  ngOnInit(): void {

    this.converterPanelService.getSymbols().subscribe((res: any) => {
      this.symbols = res['symbols']
    })
    if (this.converterPanelService.formValues.from !== '') {
      this.convertForm.get('fromLabel')?.setValue(this.converterPanelService.formValues.from)
      this.convertForm.get('toLabel')?.setValue(this.converterPanelService.formValues.to)
      this.convertForm.get('amount')?.setValue(this.converterPanelService.formValues.amount)
    }
    this.getRateFactor(this.convertForm.get('fromLabel')?.value!, this.convertForm.get('toLabel')?.value!,
      this.convertForm.get('amount')?.value !== '' ? this.convertForm.get('amount')?.value! : '1');
  }

  getRateFactor(from: string, to: string, amount: string) {
    this.fromChange.emit({from: from, to: to})
    this.converterPanelService.formValues = {from: from, to: to, amount: amount}
    this.converterPanelService.convertCurrency(from,
      to,
      amount)
      .subscribe((res: any) => {
        this.rateFactor = res.info.rate
      })
  }

  swap() {
    const from = this.convertForm.get('fromLabel')?.value as string;
    const to = this.convertForm.get('toLabel')?.value as string;
    this.convertForm.get('fromLabel')?.setValue(to);
    this.convertForm.get('toLabel')?.setValue(from);
    this.rateFactor = 0;
    this.getRateFactor(this.convertForm.get('fromLabel')?.value!,
      this.convertForm.get('toLabel')?.value!,
      this.convertForm.get('amount')?.value!)

  }

  getResult(amount: any) {
    if (amount.target.value) {
      this.amountChange.emit(parseInt(amount.target.value))
      this.result = parseInt(amount.target.value) * this.rateFactor
    } else {
      this.amountChange.emit(0)

      this.result = 0
    }
  }

}
