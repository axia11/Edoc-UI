import { Injectable } from "@angular/core";
import { of } from 'rxjs';


const countryCodeList = [
    {
        "name": "Israel",
        "dialNumber": "+972",
        "countryCode": "IL",
        "code_Number": "+972(IL)"
    },
    {
        "name": "Afghanistan",
        "dialNumber": "+93",
        "countryCode": "AF",
        "code_Number": "+93(AF)"
    },
    {
        "name": "Albania",
        "dialNumber": "+355",
        "countryCode": "AL",
        "code_Number": "+355(AL)"
    },
    {
        "name": "Algeria",
        "dialNumber": "+213",
        "countryCode": "DZ",
        "code_Number": "+213(DZ)"
    },
    {
        "name": "AmericanSamoa",
        "dialNumber": "+1 684",
        "countryCode": "AS",
        "code_Number": "+1 684(AS)"
    },
    {
        "name": "Andorra",
        "dialNumber": "+376",
        "countryCode": "AD",
        "code_Number": "+376(AD)"
    },
    {
        "name": "Angola",
        "dialNumber": "+244",
        "countryCode": "AO",
        "code_Number": "+244(AO)"
    },
    {
        "name": "Anguilla",
        "dialNumber": "+1 264",
        "countryCode": "AI",
        "code_Number": "+1 264(AI)"
    },
    {
        "name": "Antigua and Barbuda",
        "dialNumber": "+1268",
        "countryCode": "AG",
        "code_Number": "+1268(AG)"
    },
    {
        "name": "Argentina",
        "dialNumber": "+54",
        "countryCode": "AR",
        "code_Number": "+54(AR)"
    },
    {
        "name": "Armenia",
        "dialNumber": "+374",
        "countryCode": "AM",
        "code_Number": "+374(AM)"
    },
    {
        "name": "Aruba",
        "dialNumber": "+297",
        "countryCode": "AW",
        "code_Number": "+297(AW)"
    },
    {
        "name": "Australia",
        "dialNumber": "+61",
        "countryCode": "AU",
        "code_Number": "+61(AU)"
    },
    {
        "name": "Austria",
        "dialNumber": "+43",
        "countryCode": "AT",
        "code_Number": "+43(AT)"
    },
    {
        "name": "Azerbaijan",
        "dialNumber": "+994",
        "countryCode": "AZ",
        "code_Number": "+994(AZ)"
    },
    {
        "name": "Bahamas",
        "dialNumber": "+1 242",
        "countryCode": "BS",
        "code_Number": "+1 242(BS)"
    },
    {
        "name": "Bahrain",
        "dialNumber": "+973",
        "countryCode": "BH",
        "code_Number": "+973(BH)"
    },
    {
        "name": "Bangladesh",
        "dialNumber": "+880",
        "countryCode": "BD",
        "code_Number": "+880(BD)"
    },
    {
        "name": "Barbados",
        "dialNumber": "+1 246",
        "countryCode": "BB",
        "code_Number": "+1 246(BB)"
    },
    {
        "name": "Belarus",
        "dialNumber": "+375",
        "countryCode": "BY",
        "code_Number": "+375(BY)"
    },
    {
        "name": "Belgium",
        "dialNumber": "+32",
        "countryCode": "BE",
        "code_Number": "+32(BE)"
    },
    {
        "name": "Belize",
        "dialNumber": "+501",
        "countryCode": "BZ",
        "code_Number": "+501(BZ)"
    },
    {
        "name": "Benin",
        "dialNumber": "+229",
        "countryCode": "BJ",
        "code_Number": "+229(BJ)"
    },
    {
        "name": "Bermuda",
        "dialNumber": "+1 441",
        "countryCode": "BM",
        "code_Number": "+1 441(BM)"
    },
    {
        "name": "Bhutan",
        "dialNumber": "+975",
        "countryCode": "BT",
        "code_Number": "+975(BT)"
    },
    {
        "name": "Bosnia and Herzegovina",
        "dialNumber": "+387",
        "countryCode": "BA",
        "code_Number": "+387(BA)"
    },
    {
        "name": "Botswana",
        "dialNumber": "+267",
        "countryCode": "BW",
        "code_Number": "+267(BW)"
    },
    {
        "name": "Brazil",
        "dialNumber": "+55",
        "countryCode": "BR",
        "code_Number": "+55(BR)"
    },
    {
        "name": "British Indian Ocean Territory",
        "dialNumber": "+246",
        "countryCode": "IO",
        "code_Number": "+246(IO)"
    },
    {
        "name": "Bulgaria",
        "dialNumber": "+359",
        "countryCode": "BG",
        "code_Number": "+359(BG)"
    },
    {
        "name": "Burkina Faso",
        "dialNumber": "+226",
        "countryCode": "BF",
        "code_Number": "+226(BF)"
    },
    {
        "name": "Burundi",
        "dialNumber": "+257",
        "countryCode": "BI",
        "code_Number": "+257(BI)"
    },
    {
        "name": "Cambodia",
        "dialNumber": "+855",
        "countryCode": "KH",
        "code_Number": "+855(KH)"
    },
    {
        "name": "Cameroon",
        "dialNumber": "+237",
        "countryCode": "CM",
        "code_Number": "+237(CM)"
    },
    {
        "name": "Canada",
        "dialNumber": "+1",
        "countryCode": "CA",
        "code_Number": "+1(CA)"
    },
    {
        "name": "Cape Verde",
        "dialNumber": "+238",
        "countryCode": "CV",
        "code_Number": "+238(CV)"
    },
    {
        "name": "Cayman Islands",
        "dialNumber": "+ 345",
        "countryCode": "KY",
        "code_Number": "+ 345(KY)"
    },
    {
        "name": "Central African Republic",
        "dialNumber": "+236",
        "countryCode": "CF",
        "code_Number": "+236(CF)"
    },
    {
        "name": "Chad",
        "dialNumber": "+235",
        "countryCode": "TD",
        "code_Number": "+235(TD)"
    },
    {
        "name": "Chile",
        "dialNumber": "+56",
        "countryCode": "CL",
        "code_Number": "+56(CL)"
    },
    {
        "name": "China",
        "dialNumber": "+86",
        "countryCode": "CN",
        "code_Number": "+86(CN)"
    },
    {
        "name": "Christmas Island",
        "dialNumber": "+61",
        "countryCode": "CX",
        "code_Number": "+61(CX)"
    },
    {
        "name": "Colombia",
        "dialNumber": "+57",
        "countryCode": "CO",
        "code_Number": "+57(CO)"
    },
    {
        "name": "Comoros",
        "dialNumber": "+269",
        "countryCode": "KM",
        "code_Number": "+269(KM)"
    },
    {
        "name": "Congo",
        "dialNumber": "+242",
        "countryCode": "CG",
        "code_Number": "+242(CG)"
    },
    {
        "name": "Cook Islands",
        "dialNumber": "+682",
        "countryCode": "CK",
        "code_Number": "+682(CG)"
    },
    {
        "name": "Costa Rica",
        "dialNumber": "+506",
        "countryCode": "CR",
        "code_Number": "+506(CR)"
    },
    {
        "name": "Croatia",
        "dialNumber": "+385",
        "countryCode": "HR",
        "code_Number": "+385(HR)"
    },
    {
        "name": "Cuba",
        "dialNumber": "+53",
        "countryCode": "CU",
        "code_Number": "+53(CU)"
    },
    {
        "name": "Cyprus",
        "dialNumber": "+537",
        "countryCode": "CY",
        "code_Number": "+537(CY)"
    },
    {
        "name": "Czech Republic",
        "dialNumber": "+420",
        "countryCode": "CZ",
        "code_Number": "+420(CZ)"
    },
    {
        "name": "Denmark",
        "dialNumber": "+45",
        "countryCode": "DK",
        "code_Number": "+45(DK)"
    },
    {
        "name": "Djibouti",
        "dialNumber": "+253",
        "countryCode": "DJ",
        "code_Number": "+253(DJ)"
    },
    {
        "name": "Dominica",
        "dialNumber": "+1 767",
        "countryCode": "DM",
        "code_Number": "+1 767(DM)"
    },
    {
        "name": "Dominican Republic",
        "dialNumber": "+1 849",
        "countryCode": "DO",
        "code_Number": "+1 849(DO)"
    },
    {
        "name": "Ecuador",
        "dialNumber": "+593",
        "countryCode": "EC",
        "code_Number": "+593(EC)"
    },
    {
        "name": "Egypt",
        "dialNumber": "+20",
        "countryCode": "EG",
        "code_Number": "+20(EG)"
    },
    {
        "name": "El Salvador",
        "dialNumber": "+503",
        "countryCode": "SV",
        "code_Number": "+503(SV)"
    },
    {
        "name": "Equatorial Guinea",
        "dialNumber": "+240",
        "countryCode": "GQ",
        "code_Number": "+240(GQ)"
    },
    {
        "name": "Eritrea",
        "dialNumber": "+291",
        "countryCode": "ER",
        "code_Number": "+291(ER)"
    },
    {
        "name": "Estonia",
        "dialNumber": "+372",
        "countryCode": "EE",
        "code_Number": "+372(EE)"
    },
    {
        "name": "Ethiopia",
        "dialNumber": "+251",
        "countryCode": "ET",
        "code_Number": "+251(ET)"
    },
    {
        "name": "Faroe Islands",
        "dialNumber": "+298",
        "countryCode": "FO",
        "code_Number": "+298(FO)"
    },
    {
        "name": "Fiji",
        "dialNumber": "+679",
        "countryCode": "FJ",
        "code_Number": "+679(FJ)"
    },
    {
        "name": "Finland",
        "dialNumber": "+358",
        "countryCode": "FI",
        "code_Number": "+358(FI)"
    },
    {
        "name": "France",
        "dialNumber": "+33",
        "countryCode": "FR",
        "code_Number": "+33(FR)"
    },
    {
        "name": "French Guiana",
        "dialNumber": "+594",
        "countryCode": "GF",
        "code_Number": "+594(GF)"
    },
    {
        "name": "French Polynesia",
        "dialNumber": "+689",
        "countryCode": "PF",
        "code_Number": "+689(PF)"
    },
    {
        "name": "Gabon",
        "dialNumber": "+241",
        "countryCode": "GA",
        "code_Number": "+241(GA)"
    },
    {
        "name": "Gambia",
        "dialNumber": "+220",
        "countryCode": "GM",
        "code_Number": "+220(GM)"
    },
    {
        "name": "Georgia",
        "dialNumber": "+995",
        "countryCode": "GE",
        "code_Number": "+995(GE)"
    },
    {
        "name": "Germany",
        "dialNumber": "+49",
        "countryCode": "DE",
        "code_Number": "+49(DE)"
    },
    {
        "name": "Ghana",
        "dialNumber": "+233",
        "countryCode": "GH",
        "code_Number": "+233(GH)"
    },
    {
        "name": "Gibraltar",
        "dialNumber": "+350",
        "countryCode": "GI",
        "code_Number": "+350(GI)"
    },
    {
        "name": "Greece",
        "dialNumber": "+30",
        "countryCode": "GR",
        "code_Number": "+30(GR)"
    },
    {
        "name": "Greenland",
        "dialNumber": "+299",
        "countryCode": "GL",
        "code_Number": "+299(GL)"
    },
    {
        "name": "Grenada",
        "dialNumber": "+1 473",
        "countryCode": "GD",
        "code_Number": "+1 473(GD)"
    },
    {
        "name": "Guadeloupe",
        "dialNumber": "+590",
        "countryCode": "GP",
        "code_Number": "+590(GP)"
    },
    {
        "name": "Guam",
        "dialNumber": "+1 671",
        "countryCode": "GU",
        "code_Number": "+1 671(GU)"
    },
    {
        "name": "Guatemala",
        "dialNumber": "+502",
        "countryCode": "GT",
        "code_Number": "+502(GT)"
    },
    {
        "name": "Guinea",
        "dialNumber": "+224",
        "countryCode": "GN",
        "code_Number": "+224(GN)"
    },
    {
        "name": "Guinea-Bissau",
        "dialNumber": "+245",
        "countryCode": "GW",
        "code_Number": "+245(GW)"
    },
    {
        "name": "Guyana",
        "dialNumber": "+595",
        "countryCode": "GY",
        "code_Number": "+595(GY)"
    },
    {
        "name": "Haiti",
        "dialNumber": "+509",
        "countryCode": "HT",
        "code_Number": "+509(HT)"
    },
    {
        "name": "Honduras",
        "dialNumber": "+504",
        "countryCode": "HN",
        "code_Number": "+504(HN)"
    },
    {
        "name": "Hungary",
        "dialNumber": "+36",
        "countryCode": "HU",
        "code_Number": "+36(HU)"
    },
    {
        "name": "Iceland",
        "dialNumber": "+354",
        "countryCode": "IS",
        "code_Number": "+354(IS)"
    },
    {
        "name": "India",
        "dialNumber": "+91",
        "countryCode": "IN",
        "code_Number": "+91(IN)"
    },
    {
        "name": "Indonesia",
        "dialNumber": "+62",
        "countryCode": "ID",
        "code_Number": "+62(ID)"
    },
    {
        "name": "Iraq",
        "dialNumber": "+964",
        "countryCode": "IQ",
        "code_Number": "+964(IQ)"
    },
    {
        "name": "Ireland",
        "dialNumber": "+353",
        "countryCode": "IE",
        "code_Number": "+353(IE)"
    },
    {
        "name": "Italy",
        "dialNumber": "+39",
        "countryCode": "IT",
        "code_Number": "+39(IT)"
    },
    {
        "name": "Jamaica",
        "dialNumber": "+1 876",
        "countryCode": "JM",
        "code_Number": "+1 876(JM)"
    },
    {
        "name": "Japan",
        "dialNumber": "+81",
        "countryCode": "JP",
        "code_Number": "+81(JP)"
    },
    {
        "name": "Jordan",
        "dialNumber": "+962",
        "countryCode": "JO",
        "code_Number": "+962(JO)"
    },
    {
        "name": "Kazakhstan",
        "dialNumber": "+7 7",
        "countryCode": "KZ",
        "code_Number": "+7 7(KZ)"
    },
    {
        "name": "Kenya",
        "dialNumber": "+254",
        "countryCode": "KE",
        "code_Number": "+254(KE)"
    },
    {
        "name": "Kiribati",
        "dialNumber": "+686",
        "countryCode": "KI",
        "code_Number": "+686(KI)"
    },
    {
        "name": "Kuwait",
        "dialNumber": "+965",
        "countryCode": "KW",
        "code_Number": "+965(KW)"
    },
    {
        "name": "Kyrgyzstan",
        "dialNumber": "+996",
        "countryCode": "KG",
        "code_Number": "+996(KG)"
    },
    {
        "name": "Latvia",
        "dialNumber": "+371",
        "countryCode": "LV",
        "code_Number": "+371(LV)"
    },
    {
        "name": "Lebanon",
        "dialNumber": "+961",
        "countryCode": "LB",
        "code_Number": "+961(LB)"
    },
    {
        "name": "Lesotho",
        "dialNumber": "+266",
        "countryCode": "LS",
        "code_Number": "+266(LS)"
    },
    {
        "name": "Liberia",
        "dialNumber": "+231",
        "countryCode": "LR",
        "code_Number": "+231(LR)"
    },
    {
        "name": "Liechtenstein",
        "dialNumber": "+423",
        "countryCode": "LI",
        "code_Number": "+423(LI)"
    },
    {
        "name": "Lithuania",
        "dialNumber": "+370",
        "countryCode": "LT",
        "code_Number": "+370(LT)"
    },
    {
        "name": "Luxembourg",
        "dialNumber": "+352",
        "countryCode": "LU",
        "code_Number": "+352(LU)"
    },
    {
        "name": "Madagascar",
        "dialNumber": "+261",
        "countryCode": "MG",
        "code_Number": "+261(MG)"
    },
    {
        "name": "Malawi",
        "dialNumber": "+265",
        "countryCode": "MW",
        "code_Number": "+265(MW)"
    },
    {
        "name": "Malaysia",
        "dialNumber": "+60",
        "countryCode": "MY",
        "code_Number": "+60(MY)"
    },
    {
        "name": "Maldives",
        "dialNumber": "+960",
        "countryCode": "MV",
        "code_Number": "+960(MV)"
    },
    {
        "name": "Mali",
        "dialNumber": "+223",
        "countryCode": "ML",
        "code_Number": "+223(ML)"
    },
    {
        "name": "Malta",
        "dialNumber": "+356",
        "countryCode": "MT",
        "code_Number": "+356(MT)"
    },
    {
        "name": "Marshall Islands",
        "dialNumber": "+692",
        "countryCode": "MH",
        "code_Number": "+692(MH)"
    },
    {
        "name": "Martinique",
        "dialNumber": "+596",
        "countryCode": "MQ",
        "code_Number": "+596(MQ)"
    },
    {
        "name": "Mauritania",
        "dialNumber": "+222",
        "countryCode": "MR",
        "code_Number": "+222(MR)"
    },
    {
        "name": "Mauritius",
        "dialNumber": "+230",
        "countryCode": "MU",
        "code_Number": "+230(MU)"
    },
    {
        "name": "Mayotte",
        "dialNumber": "+262",
        "countryCode": "YT",
        "code_Number": "+262(YT)"
    },
    {
        "name": "Mexico",
        "dialNumber": "+52",
        "countryCode": "MX",
        "code_Number": "+52(MX)"
    },
    {
        "name": "Monaco",
        "dialNumber": "+377",
        "countryCode": "MC",
        "code_Number": "+377(MC)"
    },
    {
        "name": "Mongolia",
        "dialNumber": "+976",
        "countryCode": "MN",
        "code_Number": "+976(MN)"
    },
    {
        "name": "Montenegro",
        "dialNumber": "+382",
        "countryCode": "ME",
        "code_Number": "+382(ME)"
    },
    {
        "name": "Montserrat",
        "dialNumber": "+1664",
        "countryCode": "MS",
        "code_Number": "+1664(MS)"
    },
    {
        "name": "Morocco",
        "dialNumber": "+212",
        "countryCode": "MA",
        "code_Number": "+212(MA)"
    },
    {
        "name": "Myanmar",
        "dialNumber": "+95",
        "countryCode": "MM",
        "code_Number": "+95(MM)"
    },
    {
        "name": "Namibia",
        "dialNumber": "+264",
        "countryCode": "NA",
        "code_Number": "+264(NA)"
    },
    {
        "name": "Nauru",
        "dialNumber": "+674",
        "countryCode": "NR",
        "code_Number": "+674(NR)"
    },
    {
        "name": "Nepal",
        "dialNumber": "+977",
        "countryCode": "NP",
        "code_Number": "+977(NP)"
    },
    {
        "name": "Netherlands",
        "dialNumber": "+31",
        "countryCode": "NL",
        "code_Number": "+31(NL)"
    },
    {
        "name": "Netherlands Antilles",
        "dialNumber": "+599",
        "countryCode": "AN",
        "code_Number": "+599(AN)"
    },
    {
        "name": "New Caledonia",
        "dialNumber": "+687",
        "countryCode": "NC",
        "code_Number": "+687(NC)"
    },
    {
        "name": "New Zealand",
        "dialNumber": "+64",
        "countryCode": "NZ",
        "code_Number": "+64(NZ)"
    },
    {
        "name": "Nicaragua",
        "dialNumber": "+505",
        "countryCode": "NI",
        "code_Number": "+505(NI)"
    },
    {
        "name": "Niger",
        "dialNumber": "+227",
        "countryCode": "NE",
        "code_Number": "+227(NE)"
    },
    {
        "name": "Nigeria",
        "dialNumber": "+234",
        "countryCode": "NG",
        "code_Number": "+234(NG)"
    },
    {
        "name": "Niue",
        "dialNumber": "+683",
        "countryCode": "NU",
        "code_Number": "+683(NU)"
    },
    {
        "name": "Norfolk Island",
        "dialNumber": "+672",
        "countryCode": "NF",
        "code_Number": "+672(NF)"
    },
    {
        "name": "Northern Mariana Islands",
        "dialNumber": "+1 670",
        "countryCode": "MP",
        "code_Number": "+1 670(MP)"
    },
    {
        "name": "Norway",
        "dialNumber": "+47",
        "countryCode": "NO",
        "code_Number": "+47(NO)"
    },
    {
        "name": "Oman",
        "dialNumber": "+968",
        "countryCode": "OM",
        "code_Number": "+968(OM)"
    },
    {
        "name": "Pakistan",
        "dialNumber": "+92",
        "countryCode": "PK",
        "code_Number": "+92(PK)"
    },
    {
        "name": "Palau",
        "dialNumber": "+680",
        "countryCode": "PW",
        "code_Number": "+680(PW)"
    },
    {
        "name": "Panama",
        "dialNumber": "+507",
        "countryCode": "PA",
        "code_Number": "+507(PA)"
    },
    {
        "name": "Papua New Guinea",
        "dialNumber": "+675",
        "countryCode": "PG",
        "code_Number": "+675(PG)"
    },
    {
        "name": "Paraguay",
        "dialNumber": "+595",
        "countryCode": "PY",
        "code_Number": "+595(PY)"
    },
    {
        "name": "Peru",
        "dialNumber": "+51",
        "countryCode": "PE",
        "code_Number": "+51(PE)"
    },
    {
        "name": "Philippines",
        "dialNumber": "+63",
        "countryCode": "PH",
        "code_Number": "+63(PH)"
    },
    {
        "name": "Poland",
        "dialNumber": "+48",
        "countryCode": "PL",
        "code_Number": "+48(PL)"
    },
    {
        "name": "Portugal",
        "dialNumber": "+351",
        "countryCode": "PT",
        "code_Number": "+351(PT)"
    },
    {
        "name": "Puerto Rico",
        "dialNumber": "+1 939",
        "countryCode": "PR",
        "code_Number": "+1 939(PR)"
    },
    {
        "name": "Qatar",
        "dialNumber": "+974",
        "countryCode": "QA",
        "code_Number": "+974(QA)"
    },
    {
        "name": "Romania",
        "dialNumber": "+40",
        "countryCode": "RO",
        "code_Number": "+40(RO)"
    },
    {
        "name": "Rwanda",
        "dialNumber": "+250",
        "countryCode": "RW",
        "code_Number": "+250(RW)"
    },
    {
        "name": "Samoa",
        "dialNumber": "+685",
        "countryCode": "WS",
        "code_Number": "+685(WS)"
    },
    {
        "name": "San Marino",
        "dialNumber": "+378",
        "countryCode": "SM",
        "code_Number": "+378(SM)"
    },
    {
        "name": "Saudi Arabia",
        "dialNumber": "+966",
        "countryCode": "SA",
        "code_Number": "+966(SA)"
    },
    {
        "name": "Senegal",
        "dialNumber": "+221",
        "countryCode": "SN",
        "code_Number": "+221(SN)"
    },
    {
        "name": "Serbia",
        "dialNumber": "+381",
        "countryCode": "RS",
        "code_Number": "+381(RS)"
    },
    {
        "name": "Seychelles",
        "dialNumber": "+248",
        "countryCode": "SC",
        "code_Number": "+248(SC)"
    },
    {
        "name": "Sierra Leone",
        "dialNumber": "+232",
        "countryCode": "SL",
        "code_Number": "+232(SL)"
    },
    {
        "name": "Singapore",
        "dialNumber": "+65",
        "countryCode": "SG",
        "code_Number": "+65(SG)"
    },
    {
        "name": "Slovakia",
        "dialNumber": "+421",
        "countryCode": "SK",
        "code_Number": "+421(SK)"
    },
    {
        "name": "Slovenia",
        "dialNumber": "+386",
        "countryCode": "SI",
        "code_Number": "+386(SI)"
    },
    {
        "name": "Solomon Islands",
        "dialNumber": "+677",
        "countryCode": "SB",
        "code_Number": "+677(SB)"
    },
    {
        "name": "South Africa",
        "dialNumber": "+27",
        "countryCode": "ZA",
        "code_Number": "+27(ZA)"
    },
    {
        "name": "South Georgia and the South Sandwich Islands",
        "dialNumber": "+500",
        "countryCode": "GS",
        "code_Number": "+500(GS)"
    },
    {
        "name": "Spain",
        "dialNumber": "+34",
        "countryCode": "ES",
        "code_Number": "+34(ES)"
    },
    {
        "name": "Sri Lanka",
        "dialNumber": "+94",
        "countryCode": "LK",
        "code_Number": "+94(LK)"
    },
    {
        "name": "Sudan",
        "dialNumber": "+249",
        "countryCode": "SD",
        "code_Number": "+249(SD)"
    },
    {
        "name": "Suriname",
        "dialNumber": "+597",
        "countryCode": "SR",
        "code_Number": "+567(SR)"
    },
    {
        "name": "Swaziland",
        "dialNumber": "+268",
        "countryCode": "SZ",
        "code_Number": "+268(SZ)"
    },
    {
        "name": "Sweden",
        "dialNumber": "+46",
        "countryCode": "SE",
        "code_Number": "+46(SE)"
    },
    {
        "name": "Switzerland",
        "dialNumber": "+41",
        "countryCode": "CH",
        "code_Number": "+41(CH)"
    },
    {
        "name": "Tajikistan",
        "dialNumber": "+992",
        "countryCode": "TJ",
        "code_Number": "+992(TJ)"
    },
    {
        "name": "Thailand",
        "dialNumber": "+66",
        "countryCode": "TH",
        "code_Number": "+66(TH)"
    },
    {
        "name": "Togo",
        "dialNumber": "+228",
        "countryCode": "TG",
        "code_Number": "+228(TG)"
    },
    {
        "name": "Tokelau",
        "dialNumber": "+690",
        "countryCode": "TK",
        "code_Number": "+690(TK)"
    },
    {
        "name": "Tonga",
        "dialNumber": "+676",
        "countryCode": "TO",
        "code_Number": "+676(TO)"
    },
    {
        "name": "Trinidad and Tobago",
        "dialNumber": "+1 868",
        "countryCode": "TT",
        "code_Number": "+1 868(TT)"
    },
    {
        "name": "Tunisia",
        "dialNumber": "+216",
        "countryCode": "TN",
        "code_Number": "+216(TN)"
    },
    {
        "name": "Turkey",
        "dialNumber": "+90",
        "countryCode": "TR",
        "code_Number": "+90(ITR)"
    },
    {
        "name": "Turkmenistan",
        "dialNumber": "+993",
        "countryCode": "TM",
        "code_Number": "+993(TM)"
    },
    {
        "name": "Turks and Caicos Islands",
        "dialNumber": "+1 649",
        "countryCode": "TC",
        "code_Number": "+1 649(TC)"
    },
    {
        "name": "Tuvalu",
        "dialNumber": "+688",
        "countryCode": "TV",
        "code_Number": "+688(TV)"
    },
    {
        "name": "Uganda",
        "dialNumber": "+256",
        "countryCode": "UG",
        "code_Number": "+256(UG)"
    },
    {
        "name": "Ukraine",
        "dialNumber": "+380",
        "countryCode": "UA",
        "code_Number": "+380(UA)"
    },
    {
        "name": "United Arab Emirates",
        "dialNumber": "+971",
        "countryCode": "AE",
        "code_Number": "+971(AE)"
    },
    {
        "name": "United Kingdom",
        "dialNumber": "+44",
        "countryCode": "GB",
        "code_Number": "+44(GB)"
    },
    {
        "name": "United States",
        "dialNumber": "+1",
        "countryCode": "US",
        "code_Number": "+1(US)"
    },
    {
        "name": "Uruguay",
        "dialNumber": "+598",
        "countryCode": "UY",
        "code_Number": "+598(UY)"
    },
    {
        "name": "Uzbekistan",
        "dialNumber": "+998",
        "countryCode": "UZ",
        "code_Number": "+998(UZ)"
    },
    {
        "name": "Vanuatu",
        "dialNumber": "+678",
        "countryCode": "VU",
        "code_Number": "+678(VU)"
    },
    {
        "name": "Wallis and Futuna",
        "dialNumber": "+681",
        "countryCode": "WF",
        "code_Number": "+681(WF)"
    },
    {
        "name": "Yemen",
        "dialNumber": "+967",
        "countryCode": "YE",
        "code_Number": "+967(YE)"
    },
    {
        "name": "Zambia",
        "dialNumber": "+260",
        "countryCode": "ZM",
        "code_Number": "+260(ZM)"
    },
    {
        "name": "Zimbabwe",
        "dialNumber": "+263",
        "countryCode": "ZW",
        "code_Number": "+263(ZW)"
    },
    {
        "name": "land Islands",
        "dialNumber": "+354",
        "countryCode": "AX",
        "code_Number": "+354(AX)"
    },
    {
        "name": "Antarctica",
        "dialNumber": "+672",
        "countryCode": "AQ",
        "code_Number": "+672(AQ)"
    },
    {
        "name": "Bolivia, Plurinational State of",
        "dialNumber": "+591",
        "countryCode": "BO",
        "code_Number": "+591(BO)"
    },
    {
        "name": "Brunei Darussalam",
        "dialNumber": "+673",
        "countryCode": "BN",
        "code_Number": "+673(BN)"
    },
    {
        "name": "Cocos (Keeling) Islands",
        "dialNumber": "+61",
        "countryCode": "CC",
        "code_Number": "+61(CC)"
    },
    {
        "name": "Congo, The Democratic Republic of the",
        "dialNumber": "+243",
        "countryCode": "CD",
        "code_Number": "+243(CD)"
    },
    {
        "name": "Cote d'Ivoire",
        "dialNumber": "+225",
        "countryCode": "CI",
        "code_Number": "+225(CI)"
    },
    {
        "name": "Falkland Islands (Malvinas)",
        "dialNumber": "+500",
        "countryCode": "FK",
        "code_Number": "+500(FK)"
    },
    {
        "name": "Guernsey",
        "dialNumber": "+44",
        "countryCode": "GG",
        "code_Number": "+44(GG)"
    },
    {
        "name": "Holy See (Vatican City State)",
        "dialNumber": "+379",
        "countryCode": "VA",
        "code_Number": "+379(VA)"
    },
    {
        "name": "Hong Kong",
        "dialNumber": "+852",
        "countryCode": "HK",
        "code_Number": "+852(HK)"
    },
    {
        "name": "Iran, Islamic Republic of",
        "dialNumber": "+98",
        "countryCode": "IR",
        "code_Number": "+98(IR)"
    },
    {
        "name": "Isle of Man",
        "dialNumber": "+44",
        "countryCode": "IM",
        "code_Number": "+44(IM)"
    },
    {
        "name": "Jersey",
        "dialNumber": "+44",
        "countryCode": "JE",
        "code_Number": "+44(JE)"
    },
    {
        "name": "Korea, Democratic People's Republic of",
        "dialNumber": "+850",
        "countryCode": "KP",
        "code_Number": "+850(KP)"
    },
    {
        "name": "Korea, Republic of",
        "dialNumber": "+82",
        "countryCode": "KR",
        "code_Number": "+82(JR)"
    },
    {
        "name": "Lao People's Democratic Republic",
        "dialNumber": "+856",
        "countryCode": "LA",
        "code_Number": "+856(LA)"
    },
    {
        "name": "Libyan Arab Jamahiriya",
        "dialNumber": "+218",
        "countryCode": "LY",
        "code_Number": "+218(LY)"
    },
    {
        "name": "Macao",
        "dialNumber": "+853",
        "countryCode": "MO",
        "code_Number": "+853(MO)"
    },
    {
        "name": "Macedonia, The Former Yugoslav Republic of",
        "dialNumber": "+389",
        "countryCode": "MK",
        "code_Number": "+389(MK)"
    },
    {
        "name": "Micronesia, Federated States of",
        "dialNumber": "+691",
        "countryCode": "FM",
        "code_Number": "+691(FM)"
    },
    {
        "name": "Moldova, Republic of",
        "dialNumber": "+373",
        "countryCode": "MD",
        "code_Number": "+373(MD)"
    },
    {
        "name": "Mozambique",
        "dialNumber": "+258",
        "countryCode": "MZ",
        "code_Number": "+258(MZ)"
    },
    {
        "name": "Palestinian Territory, Occupied",
        "dialNumber": "+970",
        "countryCode": "PS",
        "code_Number": "+970(PS)"
    },
    {
        "name": "Pitcairn",
        "dialNumber": "+872",
        "countryCode": "PN",
        "code_Number": "+872(PN)"
    },
    {
        "name": "Réunion",
        "dialNumber": "+262",
        "countryCode": "RE",
        "code_Number": "+262(RE)"
    },
    {
        "name": "Russia",
        "dialNumber": "+7",
        "countryCode": "RU",
        "code_Number": "+7(RU)"
    },
    {
        "name": "Saint Barthélemy",
        "dialNumber": "+590",
        "countryCode": "BL",
        "code_Number": "+590(BL)"
    },
    {
        "name": "Saint Helena, Ascension and Tristan Da Cunha",
        "dialNumber": "+290",
        "countryCode": "SH",
        "code_Number": "+290(SH)"
    },
    {
        "name": "Saint Kitts and Nevis",
        "dialNumber": "+1 869",
        "countryCode": "KN",
        "code_Number": "+1 869(KN)"
    },
    {
        "name": "Saint Lucia",
        "dialNumber": "+1 758",
        "countryCode": "LC",
        "code_Number": "+1 758(LC)"
    },
    {
        "name": "Saint Martin",
        "dialNumber": "+590",
        "countryCode": "MF",
        "code_Number": "+590(MF)"
    },
    {
        "name": "Saint Pierre and Miquelon",
        "dialNumber": "+508",
        "countryCode": "PM",
        "code_Number": "+508(PM)"
    },
    {
        "name": "Saint Vincent and the Grenadines",
        "dialNumber": "+1 784",
        "countryCode": "VC",
        "code_Number": "+1 784(VC)"
    },
    {
        "name": "Sao Tome and Principe",
        "dialNumber": "+239",
        "countryCode": "ST",
        "code_Number": "+239(ST)"
    },
    {
        "name": "Somalia",
        "dialNumber": "+252",
        "countryCode": "SO",
        "code_Number": "+252(SO)"
    },
    {
        "name": "Svalbard and Jan Mayen",
        "dialNumber": "+47",
        "countryCode": "SJ",
        "code_Number": "+47(SJ)"
    },
    {
        "name": "Syrian Arab Republic",
        "dialNumber": "+963",
        "countryCode": "SY",
        "code_Number": "+963(SY)"
    },
    {
        "name": "Taiwan, Province of China",
        "dialNumber": "+886",
        "countryCode": "TW",
        "code_Number": "+882(TW)"
    },
    {
        "name": "Tanzania, United Republic of",
        "dialNumber": "+255",
        "countryCode": "TZ",
        "code_Number": "+255(TZ)"
    },
    {
        "name": "Timor-Leste",
        "dialNumber": "+670",
        "countryCode": "TL",
        "code_Number": "+670(TL)"
    },
    {
        "name": "Venezuela, Bolivarian Republic of",
        "dialNumber": "+58",
        "countryCode": "VE",
        "code_Number": "+58(VE)"
    },
    {
        "name": "Viet Nam",
        "dialNumber": "+84",
        "countryCode": "VN",
        "code_Number": "+84(VN)"
    },
    {
        "name": "Virgin Islands, British",
        "dialNumber": "+1 284",
        "countryCode": "VG",
        "code_Number": "+1 284(VG)"
    },
    {
        "name": "Virgin Islands, U.S.",
        "dialNumber": "+1 340",
        "countryCode": "VI",
        "code_Number": "+1 340(VI)"
    }
]

@Injectable({
    providedIn: 'root'
})
export class CountryCodeService {
    getAllCountryCode() {
        return of(countryCodeList);
    }
}