const sites = [{
    "id": 1,
    "name": "Robina Town Centre",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 2,
    "name": "Watergardens Town Centre",
    "state": "VIC",
    "temp_group_name": "QIC"
  },
  {
    "id": 3,
    "name": "Canberra Centre",
    "state": "ACT",
    "temp_group_name": "QIC"
  },
  {
    "id": 4,
    "name": "Westpoint Shopping Centre",
    "state": "NSW",
    "temp_group_name": "QIC"
  },
  {
    "id": 5,
    "name": "Castle Towers",
    "state": "NSW",
    "temp_group_name": "QIC"
  },
  {
    "id": 6,
    "name": "Hyperdome",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 7,
    "name": "Bathurst City Central",
    "state": "NSW",
    "temp_group_name": "QIC"
  },
  {
    "id": 8,
    "name": "Big Top",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 9,
    "name": "Kippa Ring",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 10,
    "name": "Pittwater Place",
    "state": "NSW",
    "temp_group_name": "QIC"
  },
  {
    "id": 11,
    "name": "Grand Central",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 12,
    "name": "Eastland",
    "state": "VIC",
    "temp_group_name": "QIC"
  },
  {
    "id": 13,
    "name": "Woodgrove",
    "state": "VIC",
    "temp_group_name": "QIC"
  },
  {
    "id": 14,
    "name": "Castle Mall",
    "state": "NSW",
    "temp_group_name": "QIC"
  },
  {
    "id": 15,
    "name": "APVC Holdings",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 16,
    "name": "Forest Lake",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 17,
    "name": "Hinkler Central",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 18,
    "name": "1 Chandos St",
    "state": "NSW",
    "temp_group_name": "QIC"
  },
  {
    "id": 19,
    "name": "Nerang Mall",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 20,
    "name": "Merrifield City",
    "state": "QLD",
    "temp_group_name": "QIC"
  },
  {
    "id": 21,
    "name": "Wollongong Shopping Centre",
    "state": "NSW",
    "temp_group_name": "GPT"
  },
  {
    "id": 22,
    "name": "Charlestown Square",
    "state": "NSW",
    "temp_group_name": "GPT"
  },
  {
    "id": 23,
    "name": "Melbourne Central Retail",
    "state": "VIC",
    "temp_group_name": "GPT"
  },
  {
    "id": 24,
    "name": "Rouse Hill Town Centre",
    "state": "NSW",
    "temp_group_name": "GPT"
  },
  {
    "id": 25,
    "name": "Highpoint Shopping Centre",
    "state": "VIC",
    "temp_group_name": "GPT"
  },
  {
    "id": 26,
    "name": "Chirnside Park Shopping Centre",
    "state": "VIC",
    "temp_group_name": "GPT"
  },
  {
    "id": 27,
    "name": "Parkmore Shopping Centre",
    "state": "VIC",
    "temp_group_name": "GPT"
  },
  {
    "id": 28,
    "name": "Casuarina Square",
    "state": "NT",
    "temp_group_name": "GPT"
  },
  {
    "id": 29,
    "name": "55 King Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 30,
    "name": "570 Bourke Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 31,
    "name": "737 Bourke Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 32,
    "name": "300 La Trobe Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 33,
    "name": "990 La Trobe Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 34,
    "name": "130 Lonsdale Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 35,
    "name": "242 Exhibition Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 36,
    "name": "150 Lonsdale Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 37,
    "name": "1 Nicholson Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 38,
    "name": "200 Queen Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 39,
    "name": "11-33 Exhibition Street",
    "state": "VIC",
    "temp_group_name": "Charter Hall, Charter Hall VIC"
  },
  {
    "id": 40,
    "name": "143 Turbot Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  },
  {
    "id": 41,
    "name": "69 Ann Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  },
  {
    "id": 42,
    "name": "900 Ann Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  },
  {
    "id": 43,
    "name": "32 Turbot Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  },
  {
    "id": 44,
    "name": "175 Eagle Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  },
  {
    "id": 45,
    "name": "85 George Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  },
  {
    "id": 46,
    "name": "275 George Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  },
  {
    "id": 47,
    "name": "28 MacGregor Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  },
  {
    "id": 48,
    "name": "61 Mary Street",
    "state": "QLD",
    "temp_group_name": "Charter Hall, Charter Hall QLD"
  }
]

module.exports = sites