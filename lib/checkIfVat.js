export default function checkIfVat(country) {
  const countries = getCountries();

  let countryObjecty = countries.find((a) => a.name === country);
  if (!countryObjecty) {
    countryObjecty = countries.find((a) => a.code === country);
  }
  if (countryObjecty) {
    return {
      vatPercentage: countryObjecty.VAT,
      vatRequired: countryObjecty.isVAT,
      countryCode: countryObjecty.code,
      substractVAT: countryObjecty.substractVAT,
    };
  }

  return {
    vatRequired: false,
    vatPercentage: 0,
  };
}

export function getCountries() {
  return [
    { name: "Afghanistan", code: "AF", isVAT: false, VAT: 0 },
    { name: "Aland Islands", code: "AX", isVAT: false, VAT: 0 },
    { name: "Albania", code: "AL", isVAT: false, VAT: 0 },
    { name: "Algeria", code: "DZ", isVAT: false, VAT: 0 },
    { name: "American Samoa", code: "AS", isVAT: false, VAT: 0 },
    { name: "Andorra", code: "AD", isVAT: false, VAT: 0 },
    { name: "Angola", code: "AO", isVAT: false, VAT: 0 },
    { name: "Anguilla", code: "AI", isVAT: false, VAT: 0 },
    { name: "Antarctica", code: "AQ", isVAT: false, VAT: 0 },
    { name: "Antigua and Barbuda", code: "AG", isVAT: false, VAT: 0 },
    { name: "Argentina", code: "AR", isVAT: false, VAT: 0 },
    { name: "Armenia", code: "AM", isVAT: false, VAT: 0 },
    { name: "Aruba", code: "AW", isVAT: false, VAT: 0 },
    { name: "Australia", code: "AU", isVAT: false, VAT: 0 },
    { name: "Austria", code: "AT", isVAT: false, VAT: 0 },
    { name: "Azerbaijan", code: "AZ", isVAT: false, VAT: 0 },
    { name: "Bahamas", code: "BS", isVAT: false, VAT: 0 },
    { name: "Bahrain", code: "BH", isVAT: false, VAT: 0 },
    { name: "Bangladesh", code: "BD", isVAT: false, VAT: 0 },
    { name: "Barbados", code: "BB", isVAT: false, VAT: 0 },
    { name: "Belarus", code: "BY", isVAT: false, VAT: 0 },
    { name: "Belgium", code: "BE", isVAT: true, substractVAT: true, VAT: 21 },
    { name: "Belize", code: "BZ", isVAT: false, VAT: 0 },
    { name: "Benin", code: "BJ", isVAT: false, VAT: 0 },
    { name: "Bermuda", code: "BM", isVAT: false, VAT: 0 },
    { name: "Bhutan", code: "BT", isVAT: false, VAT: 0 },
    { name: "Bolivia", code: "BO", isVAT: false, VAT: 0 },
    {
      name: "Bonaire, Sint Eustatius and Saba",
      code: "BQ",
      isVAT: false,
      VAT: 0,
    },
    { name: "Bosnia and Herzegovina", code: "BA", isVAT: false, VAT: 0 },
    { name: "Botswana", code: "BW", isVAT: false, VAT: 0 },
    { name: "Bouvet Island", code: "BV", isVAT: false, VAT: 0 },
    { name: "Brazil", code: "BR", isVAT: false, VAT: 0 },
    {
      name: "British Indian Ocean Territory",
      code: "IO",
      isVAT: false,
      VAT: 0,
    },
    { name: "Brunei Darussalam", code: "BN", isVAT: false, VAT: 0 },
    { name: "Bulgaria", code: "BG", isVAT: true, substractVAT: false, VAT: 20 },
    { name: "Burkina Faso", code: "BF", isVAT: false, VAT: 0 },
    { name: "Burundi", code: "BI", isVAT: false, VAT: 0 },
    { name: "Cambodia", code: "KH", isVAT: false, VAT: 0 },
    { name: "Cameroon", code: "CM", isVAT: false, VAT: 0 },
    { name: "Canada", code: "CA", isVAT: false, VAT: 0 },
    { name: "Cape Verde", code: "CV", isVAT: false, VAT: 0 },
    { name: "Cayman Islands", code: "KY", isVAT: false, VAT: 0 },
    { name: "Central African Republic", code: "CF", isVAT: false, VAT: 0 },
    { name: "Chad", code: "TD", isVAT: false, VAT: 0 },
    { name: "Chile", code: "CL", isVAT: false, VAT: 0 },
    { name: "China", code: "CN", isVAT: false, VAT: 0 },
    { name: "Christmas Island", code: "CX", isVAT: false, VAT: 0 },
    { name: "Cocos (Keeling) Islands", code: "CC", isVAT: false, VAT: 0 },
    { name: "Colombia", code: "CO", isVAT: false, VAT: 0 },
    { name: "Comoros", code: "KM", isVAT: false, VAT: 0 },
    { name: "Congo", code: "CG", isVAT: false, VAT: 0 },
    {
      name: "Congo, Democratic Republic of the Congo",
      code: "CD",
      isVAT: false,
      VAT: 0,
    },
    { name: "Cook Islands", code: "CK", isVAT: false, VAT: 0 },
    { name: "Costa Rica", code: "CR", isVAT: false, VAT: 0 },
    { name: "Cote D'Ivoire", code: "CI", isVAT: false, VAT: 0 },
    { name: "Croatia", code: "HR", isVAT: true, substractVAT: true, VAT: 25 },
    { name: "Cuba", code: "CU", isVAT: false, VAT: 0 },
    { name: "Curacao", code: "CW", isVAT: false, VAT: 0 },
    { name: "Cyprus", code: "CY", isVAT: true, substractVAT: true, VAT: 19 },
    {
      name: "Czech Republic",
      code: "CZ",
      isVAT: true,
      substractVAT: true,
      VAT: 21,
    },
    { name: "Denmark", code: "DK", isVAT: true, substractVAT: true, VAT: 25 },
    { name: "Djibouti", code: "DJ", isVAT: false, VAT: 0 },
    { name: "Dominica", code: "DM", isVAT: false, VAT: 0 },
    { name: "Dominican Republic", code: "DO", isVAT: false, VAT: 0 },
    { name: "Ecuador", code: "EC", isVAT: false, VAT: 0 },
    { name: "Egypt", code: "EG", isVAT: false, VAT: 0 },
    { name: "El Salvador", code: "SV", isVAT: false, VAT: 0 },
    { name: "Equatorial Guinea", code: "GQ", isVAT: false, VAT: 0 },
    { name: "Eritrea", code: "ER", isVAT: false, VAT: 0 },
    { name: "Estonia", code: "EE", isVAT: true, substractVAT: true, VAT: 20 },
    { name: "Ethiopia", code: "ET", isVAT: false, VAT: 0 },
    { name: "Falkland Islands (Malvinas)", code: "FK", isVAT: false, VAT: 0 },
    { name: "Faroe Islands", code: "FO", isVAT: false, VAT: 0 },
    { name: "Fiji", code: "FJ", isVAT: false, VAT: 0 },
    { name: "Finland", code: "FI", isVAT: true, substractVAT: true, VAT: 24 },
    { name: "France", code: "FR", isVAT: true, substractVAT: true, VAT: 20 },
    { name: "French Guiana", code: "GF", isVAT: false, VAT: 0 },
    { name: "French Polynesia", code: "PF", isVAT: false, VAT: 0 },
    { name: "French Southern Territories", code: "TF" },
    { name: "Gabon", code: "GA", isVAT: false, VAT: 0 },
    { name: "Gambia", code: "GM", isVAT: false, VAT: 0 },
    { name: "Georgia", code: "GE", isVAT: false, VAT: 0 },
    { name: "Germany", code: "DE", isVAT: true, substractVAT: true, VAT: 19 },
    { name: "Ghana", code: "GH", isVAT: false, VAT: 0 },
    { name: "Gibraltar", code: "GI", isVAT: false, VAT: 0 },
    { name: "Greece", code: "GR", isVAT: true, substractVAT: true, VAT: 24 },
    { name: "Greenland", code: "GL", isVAT: false, VAT: 0 },
    { name: "Grenada", code: "GD", isVAT: false, VAT: 0 },
    { name: "Guadeloupe", code: "GP", isVAT: false, VAT: 0 },
    { name: "Guam", code: "GU", isVAT: false, VAT: 0 },
    { name: "Guatemala", code: "GT", isVAT: false, VAT: 0 },
    { name: "Guernsey", code: "GG", isVAT: false, VAT: 0 },
    { name: "Guinea", code: "GN", isVAT: false, VAT: 0 },
    { name: "Guinea-Bissau", code: "GW", isVAT: false, VAT: 0 },
    { name: "Guyana", code: "GY", isVAT: false, VAT: 0 },
    { name: "Haiti", code: "HT", isVAT: false, VAT: 0 },
    {
      name: "Heard Island and Mcdonald Islands",
      code: "HM",
      isVAT: false,
      VAT: 0,
    },
    {
      name: "Holy See (Vatican City State)",
      code: "VA",
      isVAT: false,
      VAT: 0,
    },
    { name: "Honduras", code: "HN", isVAT: false, VAT: 0 },
    { name: "Hong Kong", code: "HK", isVAT: false, VAT: 0 },
    { name: "Hungary", code: "HU", isVAT: true, substractVAT: true, VAT: 27 },
    { name: "Iceland", code: "IS", isVAT: false, VAT: 0 },
    { name: "India", code: "IN", isVAT: false, VAT: 0 },
    { name: "Indonesia", code: "ID", isVAT: false, VAT: 0 },
    { name: "Iran, Islamic Republic of", code: "IR", isVAT: false, VAT: 0 },
    { name: "Iraq", code: "IQ", isVAT: false, VAT: 0 },
    { name: "Ireland", code: "IE", isVAT: true, substractVAT: true, VAT: 21 },
    { name: "Isle of Man", code: "IM", isVAT: false, VAT: 0 },
    { name: "Israel", code: "IL", isVAT: false, VAT: 0 },
    { name: "Italy", code: "IT", isVAT: true, substractVAT: true, VAT: 22 },
    { name: "Jamaica", code: "JM", isVAT: false, VAT: 0 },
    { name: "Japan", code: "JP", isVAT: false, VAT: 0 },
    { name: "Jersey", code: "JE", isVAT: false, VAT: 0 },
    { name: "Jordan", code: "JO", isVAT: false, VAT: 0 },
    { name: "Kazakhstan", code: "KZ", isVAT: false, VAT: 0 },
    { name: "Kenya", code: "KE", isVAT: false, VAT: 0 },
    { name: "Kiribati", code: "KI", isVAT: false, VAT: 0 },
    {
      name: "Korea, Democratic People's Republic of",
      code: "KP",
      isVAT: false,
      VAT: 0,
    },
    { name: "Korea, Republic of", code: "KR", isVAT: false, VAT: 0 },
    { name: "Kosovo", code: "XK", isVAT: false, VAT: 0 },
    { name: "Kuwait", code: "KW", isVAT: false, VAT: 0 },
    { name: "Kyrgyzstan", code: "KG", isVAT: false, VAT: 0 },
    {
      name: "Lao People's Democratic Republic",
      code: "LA",
      isVAT: false,
      VAT: 0,
    },
    { name: "Latvia", code: "LV", isVAT: true, substractVAT: true, VAT: 21 },
    { name: "Lebanon", code: "LB", isVAT: false, VAT: 0 },
    { name: "Lesotho", code: "LS", isVAT: false, VAT: 0 },
    { name: "Liberia", code: "LR", isVAT: false, VAT: 0 },
    { name: "Libyan Arab Jamahiriya", code: "LY", isVAT: false, VAT: 0 },
    { name: "Liechtenstein", code: "LI", isVAT: false, VAT: 0 },
    { name: "Lithuania", code: "LT", isVAT: true, substractVAT: true, VAT: 21 },
    {
      name: "Luxembourg",
      code: "LU",
      isVAT: true,
      substractVAT: true,
      VAT: 17,
    },
    { name: "Macao", code: "MO", isVAT: false, VAT: 0 },
    {
      name: "Macedonia, the Former Yugoslav Republic of",
      code: "MK",
      isVAT: false,
      VAT: 0,
    },
    { name: "Madagascar", code: "MG", isVAT: false, VAT: 0 },
    { name: "Malawi", code: "MW", isVAT: false, VAT: 0 },
    { name: "Malaysia", code: "MY", isVAT: false, VAT: 0 },
    { name: "Maldives", code: "MV", isVAT: false, VAT: 0 },
    { name: "Mali", code: "ML", isVAT: false, VAT: 0 },
    { name: "Malta", code: "MT", isVAT: true, substractVAT: true, VAT: 18 },
    { name: "Marshall Islands", code: "MH", isVAT: false, VAT: 0 },
    { name: "Martinique", code: "MQ", isVAT: false, VAT: 0 },
    { name: "Mauritania", code: "MR", isVAT: false, VAT: 0 },
    { name: "Mauritius", code: "MU", isVAT: false, VAT: 0 },
    { name: "Mayotte", code: "YT", isVAT: false, VAT: 0 },
    { name: "Mexico", code: "MX", isVAT: false, VAT: 0 },
    {
      name: "Micronesia, Federated States of",
      code: "FM",
      isVAT: false,
      VAT: 0,
    },
    { name: "Moldova, Republic of", code: "MD", isVAT: false, VAT: 0 },
    { name: "Monaco", code: "MC", isVAT: false, VAT: 0 },
    { name: "Mongolia", code: "MN", isVAT: false, VAT: 0 },
    { name: "Montenegro", code: "ME", isVAT: false, VAT: 0 },
    { name: "Montserrat", code: "MS", isVAT: false, VAT: 0 },
    { name: "Morocco", code: "MA", isVAT: false, VAT: 0 },
    { name: "Mozambique", code: "MZ", isVAT: false, VAT: 0 },
    { name: "Myanmar", code: "MM", isVAT: false, VAT: 0 },
    { name: "Namibia", code: "NA", isVAT: false, VAT: 0 },
    { name: "Nauru", code: "NR", isVAT: false, VAT: 0 },
    { name: "Nepal", code: "NP", isVAT: false, VAT: 0 },
    {
      name: "Netherlands",
      code: "NL",
      isVAT: true,
      substractVAT: true,
      VAT: 21,
    },
    { name: "Netherlands Antilles", code: "AN", isVAT: false, VAT: 0 },
    { name: "New Caledonia", code: "NC", isVAT: false, VAT: 0 },
    { name: "New Zealand", code: "NZ", isVAT: false, VAT: 0 },
    { name: "Nicaragua", code: "NI", isVAT: false, VAT: 0 },
    { name: "Niger", code: "NE", isVAT: false, VAT: 0 },
    { name: "Nigeria", code: "NG", isVAT: false, VAT: 0 },
    { name: "Niue", code: "NU", isVAT: false, VAT: 0 },
    { name: "Norfolk Island", code: "NF", isVAT: false, VAT: 0 },
    { name: "Northern Mariana Islands", code: "MP", isVAT: false, VAT: 0 },
    { name: "Norway", code: "NO", isVAT: false, VAT: 0 },
    { name: "Oman", code: "OM", isVAT: false, VAT: 0 },
    { name: "Pakistan", code: "PK", isVAT: false, VAT: 0 },
    { name: "Palau", code: "PW", isVAT: false, VAT: 0 },
    {
      name: "Palestinian Territory, Occupied",
      code: "PS",
      isVAT: false,
      VAT: 0,
    },
    { name: "Panama", code: "PA", isVAT: false, VAT: 0 },
    { name: "Papua New Guinea", code: "PG", isVAT: false, VAT: 0 },
    { name: "Paraguay", code: "PY", isVAT: false, VAT: 0 },
    { name: "Peru", code: "PE", isVAT: false, VAT: 0 },
    { name: "Philippines", code: "PH", isVAT: false, VAT: 0 },
    { name: "Pitcairn", code: "PN", isVAT: false, VAT: 0 },
    { name: "Poland", code: "PL", isVAT: true, substractVAT: true, VAT: 23 },
    { name: "Portugal", code: "PT", isVAT: true, substractVAT: true, VAT: 23 },
    { name: "Puerto Rico", code: "PR", isVAT: false, VAT: 0 },
    { name: "Qatar", code: "QA", isVAT: false, VAT: 0 },
    { name: "Reunion", code: "RE", isVAT: false, VAT: 0 },
    { name: "Romania", code: "RO", isVAT: true, substractVAT: true, VAT: 19 },
    { name: "Russian Federation", code: "RU", isVAT: false, VAT: 0 },
    { name: "Rwanda", code: "RW", isVAT: false, VAT: 0 },
    { name: "Saint Barthelemy", code: "BL", isVAT: false, VAT: 0 },
    { name: "Saint Helena", code: "SH", isVAT: false, VAT: 0 },
    { name: "Saint Kitts and Nevis", code: "KN", isVAT: false, VAT: 0 },
    { name: "Saint Lucia", code: "LC", isVAT: false, VAT: 0 },
    { name: "Saint Martin", code: "MF", isVAT: false, VAT: 0 },
    { name: "Saint Pierre and Miquelon", code: "PM", isVAT: false, VAT: 0 },
    {
      name: "Saint Vincent and the Grenadines",
      code: "VC",
      isVAT: false,
      VAT: 0,
    },
    { name: "Samoa", code: "WS", isVAT: false, VAT: 0 },
    { name: "San Marino", code: "SM", isVAT: false, VAT: 0 },
    { name: "Sao Tome and Principe", code: "ST", isVAT: false, VAT: 0 },
    { name: "Saudi Arabia", code: "SA", isVAT: false, VAT: 0 },
    { name: "Senegal", code: "SN", isVAT: false, VAT: 0 },
    { name: "Serbia", code: "RS", isVAT: false, VAT: 0 },
    { name: "Serbia and Montenegro", code: "CS", isVAT: false, VAT: 0 },
    { name: "Seychelles", code: "SC", isVAT: false, VAT: 0 },
    { name: "Sierra Leone", code: "SL", isVAT: false, VAT: 0 },
    { name: "Singapore", code: "SG", isVAT: false, VAT: 0 },
    { name: "Sint Maarten", code: "SX", isVAT: false, VAT: 0 },
    { name: "Slovakia", code: "SK", isVAT: true, substractVAT: true, VAT: 20 },
    { name: "Slovenia", code: "SI", isVAT: true, substractVAT: true, VAT: 22 },
    { name: "Solomon Islands", code: "SB", isVAT: false, VAT: 0 },
    { name: "Somalia", code: "SO", isVAT: false, VAT: 0 },
    { name: "South Africa", code: "ZA", isVAT: false, VAT: 0 },
    {
      name: "South Georgia and the South Sandwich Islands",
      code: "GS",
      isVAT: false,
      VAT: 0,
    },
    { name: "South Sudan", code: "SS", isVAT: false, VAT: 0 },
    { name: "Spain", code: "ES", isVAT: true, substractVAT: true, VAT: 21 },
    { name: "Sri Lanka", code: "LK", isVAT: false, VAT: 0 },
    { name: "Sudan", code: "SD", isVAT: false, VAT: 0 },
    { name: "Suriname", code: "SR", isVAT: false, VAT: 0 },
    { name: "Svalbard and Jan Mayen", code: "SJ", isVAT: false, VAT: 0 },
    { name: "Swaziland", code: "SZ", isVAT: false, VAT: 0 },
    { name: "Sweden", code: "SE", isVAT: true, substractVAT: true, VAT: 25 },
    { name: "Switzerland", code: "CH", isVAT: false, VAT: 0 },
    { name: "Syrian Arab Republic", code: "SY", isVAT: false, VAT: 0 },
    { name: "Taiwan, Province of China", code: "TW", isVAT: false, VAT: 0 },
    { name: "Tajikistan", code: "TJ", isVAT: false, VAT: 0 },
    {
      name: "Tanzania, United Republic of",
      code: "TZ",
      isVAT: false,
      VAT: 0,
    },
    { name: "Thailand", code: "TH", isVAT: false, VAT: 0 },
    { name: "Timor-Leste", code: "TL", isVAT: false, VAT: 0 },
    { name: "Togo", code: "TG", isVAT: false, VAT: 0 },
    { name: "Tokelau", code: "TK", isVAT: false, VAT: 0 },
    { name: "Tonga", code: "TO", isVAT: false, VAT: 0 },
    { name: "Trinidad and Tobago", code: "TT", isVAT: false, VAT: 0 },
    { name: "Tunisia", code: "TN", isVAT: false, VAT: 0 },
    { name: "Turkey", code: "TR", isVAT: false, VAT: 0 },
    { name: "Turkmenistan", code: "TM", isVAT: false, VAT: 0 },
    { name: "Turks and Caicos Islands", code: "TC", isVAT: false, VAT: 0 },
    { name: "Tuvalu", code: "TV", isVAT: false, VAT: 0 },
    { name: "Uganda", code: "UG", isVAT: false, VAT: 0 },
    { name: "Ukraine", code: "UA", isVAT: false, VAT: 0 },
    { name: "United Arab Emirates", code: "AE", isVAT: false, VAT: 0 },
    { name: "United Kingdom", code: "GB", isVAT: false, VAT: 0 },
    { name: "United States", code: "US", isVAT: false, VAT: 0 },
    {
      name: "United States Minor Outlying Islands",
      code: "UM",
      isVAT: false,
      VAT: 0,
    },
    { name: "Uruguay", code: "UY", isVAT: false, VAT: 0 },
    { name: "Uzbekistan", code: "UZ", isVAT: false, VAT: 0 },
    { name: "Vanuatu", code: "VU", isVAT: false, VAT: 0 },
    { name: "Venezuela", code: "VE", isVAT: false, VAT: 0 },
    { name: "Viet Nam", code: "VN", isVAT: false, VAT: 0 },
    { name: "Virgin Islands, British", code: "VG", isVAT: false, VAT: 0 },
    { name: "Virgin Islands, U.s.", code: "VI", isVAT: false, VAT: 0 },
    { name: "Wallis and Futuna", code: "WF", isVAT: false, VAT: 0 },
    { name: "Western Sahara", code: "EH", isVAT: false, VAT: 0 },
    { name: "Yemen", code: "YE", isVAT: false, VAT: 0 },
    { name: "Zambia", code: "ZM", isVAT: false, VAT: 0 },
    { name: "Zimbabwe", code: "ZW", isVAT: false, VAT: 0 },
  ];
}
