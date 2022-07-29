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
    // this.converterPanelService.getSymbols().subscribe((res: any) => {
    // this.symbols = res['symbols']
    this.symbols = {
      "AED": "United Arab Emirates Dirham",
      "AFN": "Afghan Afghani",
      "ALL": "Albanian Lek",
      "AMD": "Armenian Dram",
      "ANG": "Netherlands Antillean Guilder",
      "AOA": "Angolan Kwanza",
      "ARS": "Argentine Peso",
      "AUD": "Australian Dollar",
      "AWG": "Aruban Florin",
      "AZN": "Azerbaijani Manat",
      "BAM": "Bosnia-Herzegovina Convertible Mark",
      "BBD": "Barbadian Dollar",
      "BDT": "Bangladeshi Taka",
      "BGN": "Bulgarian Lev",
      "BHD": "Bahraini Dinar",
      "BIF": "Burundian Franc",
      "BMD": "Bermudan Dollar",
      "BND": "Brunei Dollar",
      "BOB": "Bolivian Boliviano",
      "BRL": "Brazilian Real",
      "BSD": "Bahamian Dollar",
      "BTC": "Bitcoin",
      "BTN": "Bhutanese Ngultrum",
      "BWP": "Botswanan Pula",
      "BYN": "New Belarusian Ruble",
      "BYR": "Belarusian Ruble",
      "BZD": "Belize Dollar",
      "CAD": "Canadian Dollar",
      "CDF": "Congolese Franc",
      "CHF": "Swiss Franc",
      "CLF": "Chilean Unit of Account (UF)",
      "CLP": "Chilean Peso",
      "CNY": "Chinese Yuan",
      "COP": "Colombian Peso",
      "CRC": "Costa Rican Colón",
      "CUC": "Cuban Convertible Peso",
      "CUP": "Cuban Peso",
      "CVE": "Cape Verdean Escudo",
      "CZK": "Czech Republic Koruna",
      "DJF": "Djiboutian Franc",
      "DKK": "Danish Krone",
      "DOP": "Dominican Peso",
      "DZD": "Algerian Dinar",
      "EGP": "Egyptian Pound",
      "ERN": "Eritrean Nakfa",
      "ETB": "Ethiopian Birr",
      "EUR": "Euro",
      "FJD": "Fijian Dollar",
      "FKP": "Falkland Islands Pound",
      "GBP": "British Pound Sterling",
      "GEL": "Georgian Lari",
      "GGP": "Guernsey Pound",
      "GHS": "Ghanaian Cedi",
      "GIP": "Gibraltar Pound",
      "GMD": "Gambian Dalasi",
      "GNF": "Guinean Franc",
      "GTQ": "Guatemalan Quetzal",
      "GYD": "Guyanaese Dollar",
      "HKD": "Hong Kong Dollar",
      "HNL": "Honduran Lempira",
      "HRK": "Croatian Kuna",
      "HTG": "Haitian Gourde",
      "HUF": "Hungarian Forint",
      "IDR": "Indonesian Rupiah",
      "ILS": "Israeli New Sheqel",
      "IMP": "Manx pound",
      "INR": "Indian Rupee",
      "IQD": "Iraqi Dinar",
      "IRR": "Iranian Rial",
      "ISK": "Icelandic Króna",
      "JEP": "Jersey Pound",
      "JMD": "Jamaican Dollar",
      "JOD": "Jordanian Dinar",
      "JPY": "Japanese Yen",
      "KES": "Kenyan Shilling",
      "KGS": "Kyrgystani Som",
      "KHR": "Cambodian Riel",
      "KMF": "Comorian Franc",
      "KPW": "North Korean Won",
      "KRW": "South Korean Won",
      "KWD": "Kuwaiti Dinar",
      "KYD": "Cayman Islands Dollar",
      "KZT": "Kazakhstani Tenge",
      "LAK": "Laotian Kip",
      "LBP": "Lebanese Pound",
      "LKR": "Sri Lankan Rupee",
      "LRD": "Liberian Dollar",
      "LSL": "Lesotho Loti",
      "LTL": "Lithuanian Litas",
      "LVL": "Latvian Lats",
      "LYD": "Libyan Dinar",
      "MAD": "Moroccan Dirham",
      "MDL": "Moldovan Leu",
      "MGA": "Malagasy Ariary",
      "MKD": "Macedonian Denar",
      "MMK": "Myanma Kyat",
      "MNT": "Mongolian Tugrik",
      "MOP": "Macanese Pataca",
      "MRO": "Mauritanian Ouguiya",
      "MUR": "Mauritian Rupee",
      "MVR": "Maldivian Rufiyaa",
      "MWK": "Malawian Kwacha",
      "MXN": "Mexican Peso",
      "MYR": "Malaysian Ringgit",
      "MZN": "Mozambican Metical",
      "NAD": "Namibian Dollar",
      "NGN": "Nigerian Naira",
      "NIO": "Nicaraguan Córdoba",
      "NOK": "Norwegian Krone",
      "NPR": "Nepalese Rupee",
      "NZD": "New Zealand Dollar",
      "OMR": "Omani Rial",
      "PAB": "Panamanian Balboa",
      "PEN": "Peruvian Nuevo Sol",
      "PGK": "Papua New Guinean Kina",
      "PHP": "Philippine Peso",
      "PKR": "Pakistani Rupee",
      "PLN": "Polish Zloty",
      "PYG": "Paraguayan Guarani",
      "QAR": "Qatari Rial",
      "RON": "Romanian Leu",
      "RSD": "Serbian Dinar",
      "RUB": "Russian Ruble",
      "RWF": "Rwandan Franc",
      "SAR": "Saudi Riyal",
      "SBD": "Solomon Islands Dollar",
      "SCR": "Seychellois Rupee",
      "SDG": "Sudanese Pound",
      "SEK": "Swedish Krona",
      "SGD": "Singapore Dollar",
      "SHP": "Saint Helena Pound",
      "SLL": "Sierra Leonean Leone",
      "SOS": "Somali Shilling",
      "SRD": "Surinamese Dollar",
      "STD": "São Tomé and Príncipe Dobra",
      "SVC": "Salvadoran Colón",
      "SYP": "Syrian Pound",
      "SZL": "Swazi Lilangeni",
      "THB": "Thai Baht",
      "TJS": "Tajikistani Somoni",
      "TMT": "Turkmenistani Manat",
      "TND": "Tunisian Dinar",
      "TOP": "Tongan Paʻanga",
      "TRY": "Turkish Lira",
      "TTD": "Trinidad and Tobago Dollar",
      "TWD": "New Taiwan Dollar",
      "TZS": "Tanzanian Shilling",
      "UAH": "Ukrainian Hryvnia",
      "UGX": "Ugandan Shilling",
      "USD": "United States Dollar",
      "UYU": "Uruguayan Peso",
      "UZS": "Uzbekistan Som",
      "VEF": "Venezuelan Bolívar Fuerte",
      "VND": "Vietnamese Dong",
      "VUV": "Vanuatu Vatu",
      "WST": "Samoan Tala",
      "XAF": "CFA Franc BEAC",
      "XAG": "Silver (troy ounce)",
      "XAU": "Gold (troy ounce)",
      "XCD": "East Caribbean Dollar",
      "XDR": "Special Drawing Rights",
      "XOF": "CFA Franc BCEAO",
      "XPF": "CFP Franc",
      "YER": "Yemeni Rial",
      "ZAR": "South African Rand",
      "ZMK": "Zambian Kwacha (pre-2013)",
      "ZMW": "Zambian Kwacha",
      "ZWL": "Zimbabwean Dollar"
    }
    // })
    this.getRateFactor('EUR', 'USD', '1');
  }

  getRateFactor(from: string, to: string, amount: string) {
    console.log(from);
    this.fromChange.emit(from)

    // this.converterPanelService.convertCurrency(from,
    //   to,
    //   amount)
    //   .subscribe((res: any) => {
    // this.rateFactor = res.info.rate
    this.rateFactor = 1.02
    // console.log(this.rateFactor);
    // })
  }

  swap() {
    const from = this.convertForm.get('fromLabel')?.value as string;
    const to = this.convertForm.get('toLabel')?.value as string;
    this.convertForm.get('fromLabel')?.setValue(to);
    this.convertForm.get('toLabel')?.setValue(from);
    this.rateFactor = 0;
    setTimeout(() => {
      this.getRateFactor(this.convertForm.get('fromLabel')?.value!, this.convertForm.get('toLabel')?.value!, '1')

    }, 500)
  }

  getResult(amount: any) {
    console.log(parseInt(amount.target.value));
    if (amount.target.value) {
      this.amountChange.emit(parseInt(amount.target.value))
      this.result = parseInt(amount.target.value) * this.rateFactor
    } else {
      this.amountChange.emit(0)

      this.result = 0
    }
    console.log(this.result);
  }
}
