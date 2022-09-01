import crypto, { createHmac } from "crypto";
import assert from "assert";
const secret = "assfuckshitcunt";
var algorithm = "aes256";
var key = Buffer.from("bullshitbullshitbullshitbullshit", "latin1"); // key must be 32 bytes for aes256
var inputEncoding = "utf8";
var outputEncoding = "hex";
var ivlength = 16;
export default async function handler(req, res) {
  const text = JSON.stringify([
    {
      id: "620a49f10b927f6224a7040c",
      email: "patrica_robbins@ultrasure.bharti",
      username: "patrica91",
      profile: {
        name: "Patrica Robbins",
        company: "Ultrasure",
        dob: "1991-06-04",
        address: "41 Cropsey Avenue, Thomasville, American Samoa",
        location: {
          lat: -85.698098,
          long: 51.185304,
        },
        about:
          "Sint eiusmod cillum officia aute laborum nisi aute dolor consequat consequat aliquip elit ullamco. Elit fugiat anim ea duis est culpa.",
      },
      apiKey: "db86b2de-a4f1-451b-bb0a-3af628f32ce6",
      roles: ["owner", "admin"],
      createdAt: "2011-08-05T11:45:45.022Z",
      updatedAt: "2011-08-06T11:45:45.022Z",
    },
    {
      id: "620a49f16a6e2461e512da9f",
      email: "robyn_mathis@skyplex.panerai",
      username: "robyn93",
      profile: {
        name: "Robyn Mathis",
        company: "Skyplex",
        dob: "1993-10-30",
        address: "91 Dunne Court, Madrid, Massachusetts",
        location: {
          lat: 54.488601,
          long: 121.575569,
        },
        about:
          "Excepteur voluptate nostrud ipsum magna eiusmod sint ipsum do pariatur. Eiusmod ea fugiat anim nostrud veniam voluptate cupidatat laborum officia sint.",
      },
      apiKey: "0cbd1419-d96b-412e-a66e-b9fcbcc7d8c2",
      roles: ["member", "admin"],
      createdAt: "2010-02-08T01:10:25.078Z",
      updatedAt: "2010-02-09T01:10:25.078Z",
    },
    {
      id: "620a49f1e4b68c0b6856b6a2",
      email: "head_chandler@solgan.organic",
      username: "head89",
      profile: {
        name: "Head Chandler",
        company: "Solgan",
        dob: "1989-02-24",
        address: "3 Holt Court, Rockbridge, Oklahoma",
        location: {
          lat: -66.109142,
          long: -46.267624,
        },
        about:
          "Sunt id est anim ipsum. Magna laborum aliqua voluptate excepteur officia occaecat cillum duis sit.",
      },
      apiKey: "cebe48a3-ac7d-4ab7-be36-5653f52d1e6c",
      roles: ["owner", "guest"],
      createdAt: "2010-10-18T02:42:21.513Z",
      updatedAt: "2010-10-19T02:42:21.513Z",
    },
    {
      id: "620a49f1e9179205257342b9",
      email: "wanda_gentry@navir.ong",
      username: "wanda94",
      profile: {
        name: "Wanda Gentry",
        company: "Navir",
        dob: "1994-08-05",
        address: "7 Jefferson Street, Rowe, Ohio",
        location: {
          lat: 7.704326,
          long: 20.552838,
        },
        about:
          "Do enim et laborum adipisicing do velit exercitation. Cillum ullamco consectetur adipisicing magna nostrud dolore cillum cillum qui quis esse nostrud esse.",
      },
      apiKey: "27daf6d2-df9b-4b49-901a-3ee1c8c662cb",
      roles: ["owner", "admin"],
      createdAt: "2010-07-27T09:11:43.666Z",
      updatedAt: "2010-07-28T09:11:43.666Z",
    },
    {
      id: "620a49f18c5ac01ecf380c05",
      email: "shaffer_sweeney@tersanki.leclerc",
      username: "shaffer92",
      profile: {
        name: "Shaffer Sweeney",
        company: "Tersanki",
        dob: "1992-10-17",
        address: "37 Pleasant Place, Kohatk, Michigan",
        location: {
          lat: -7.857643,
          long: -38.376284,
        },
        about:
          "Reprehenderit eiusmod cillum non ex duis deserunt id adipisicing in consectetur amet eu voluptate. Velit magna ipsum eu minim occaecat.",
      },
      apiKey: "d2085eb5-dad0-4487-baea-29f226cb1275",
      roles: ["admin", "owner"],
      createdAt: "2011-07-01T15:32:10.794Z",
      updatedAt: "2011-07-02T15:32:10.794Z",
    },
    {
      id: "620a49f1bc6b7953135e5a09",
      email: "enid_herring@tasmania.immo",
      username: "enid91",
      profile: {
        name: "Enid Herring",
        company: "Tasmania",
        dob: "1991-08-20",
        address: "86 Turner Place, Sutton, Tennessee",
        location: {
          lat: 58.175674,
          long: 178.886822,
        },
        about:
          "Ea laborum enim velit velit qui. Incididunt incididunt cupidatat sunt sunt culpa ex fugiat eiusmod aute voluptate aliquip.",
      },
      apiKey: "8dc2e327-5e60-4af0-bd74-642fdd8cb9fd",
      roles: ["owner", "guest"],
      createdAt: "2010-03-04T04:08:54.513Z",
      updatedAt: "2010-03-05T04:08:54.513Z",
    },
    {
      id: "620a49f113147021e19a2b7a",
      email: "cannon_coffey@norsul.vodka",
      username: "cannon92",
      profile: {
        name: "Cannon Coffey",
        company: "Norsul",
        dob: "1992-12-05",
        address: "35 Garden Place, Oley, New Jersey",
        location: {
          lat: -13.410481,
          long: -125.426957,
        },
        about:
          "Proident quis ea sunt Lorem velit adipisicing velit aliquip commodo qui. Lorem aliquip cillum deserunt tempor excepteur elit.",
      },
      apiKey: "83c904c4-0cea-4f1c-9052-4edb28fdddf0",
      roles: ["admin", "owner"],
      createdAt: "2010-08-02T23:49:56.336Z",
      updatedAt: "2010-08-03T23:49:56.336Z",
    },
    {
      id: "620a49f126763ea1450521ab",
      email: "gibson_lambert@unia.doha",
      username: "gibson91",
      profile: {
        name: "Gibson Lambert",
        company: "Unia",
        dob: "1991-02-22",
        address: "12 Lee Avenue, Nettie, New Mexico",
        location: {
          lat: 30.794914,
          long: -10.903248,
        },
        about:
          "Dolor ea quis quis et exercitation. Esse ullamco cillum deserunt elit in elit sit fugiat occaecat.",
      },
      apiKey: "94001a46-e7fc-403d-9a89-cf648020dc29",
      roles: ["guest", "member"],
      createdAt: "2010-06-06T04:03:27.734Z",
      updatedAt: "2010-06-07T04:03:27.734Z",
    },
    {
      id: "620a49f1c1f43f263fbbf52b",
      email: "perez_slater@blanet.hr",
      username: "perez92",
      profile: {
        name: "Perez Slater",
        company: "Blanet",
        dob: "1992-04-14",
        address: "42 Waldane Court, Norwood, South Carolina",
        location: {
          lat: 12.715275,
          long: -78.231115,
        },
        about:
          "Lorem reprehenderit adipisicing eiusmod incididunt pariatur nostrud eiusmod magna sunt. Deserunt veniam ipsum magna nulla proident deserunt velit dolor exercitation aliqua ullamco minim.",
      },
      apiKey: "6a6cc26b-4228-4237-a588-9931f72e5948",
      roles: ["guest"],
      createdAt: "2013-11-04T05:59:26.124Z",
      updatedAt: "2013-11-05T05:59:26.124Z",
    },
    {
      id: "620a49f1f935732d71e67e0d",
      email: "debora_ratliff@motovate.abbott",
      username: "debora88",
      profile: {
        name: "Debora Ratliff",
        company: "Motovate",
        dob: "1988-08-14",
        address: "86 Melrose Street, Breinigsville, Virgin Islands",
        location: {
          lat: -87.520281,
          long: -64.278254,
        },
        about:
          "Nostrud voluptate cupidatat dolore dolor laborum ad culpa tempor est. Officia nisi ad exercitation sint fugiat consequat dolore magna eiusmod.",
      },
      apiKey: "19ece476-914a-4813-ab3d-40bccd568aa9",
      roles: ["owner", "member"],
      createdAt: "2012-05-26T09:59:39.219Z",
      updatedAt: "2012-05-27T09:59:39.219Z",
    },
    {
      id: "620a49f1c451772b50fdcafb",
      email: "monroe_davis@scentric.finance",
      username: "monroe89",
      profile: {
        name: "Monroe Davis",
        company: "Scentric",
        dob: "1989-09-02",
        address: "52 Dewey Place, Clay, South Dakota",
        location: {
          lat: 11.432641,
          long: 105.341173,
        },
        about:
          "Sit nulla sint et est. Sunt laborum dolor excepteur pariatur irure do labore non.",
      },
      apiKey: "174e0d29-db1a-45ac-9466-e87afb77bd73",
      roles: ["admin", "guest"],
      createdAt: "2013-04-09T11:02:34.455Z",
      updatedAt: "2013-04-10T11:02:34.455Z",
    },
    {
      id: "620a49f1c1b2c8fb33555987",
      email: "lou_merritt@omnigog.pink",
      username: "lou90",
      profile: {
        name: "Lou Merritt",
        company: "Omnigog",
        dob: "1990-02-20",
        address: "98 Borinquen Pl, Idamay, Hawaii",
        location: {
          lat: 52.960922,
          long: -139.791024,
        },
        about:
          "Sunt nulla esse ex adipisicing sunt. Nisi elit irure commodo aliquip non aliqua exercitation adipisicing.",
      },
      apiKey: "c67c760a-ee2e-41ec-b924-e7113911e3f8",
      roles: ["admin", "owner"],
      createdAt: "2014-07-12T04:49:33.059Z",
      updatedAt: "2014-07-13T04:49:33.059Z",
    },
    {
      id: "620a49f1bb1a86a9a918ea13",
      email: "blanche_melton@coash.supply",
      username: "blanche91",
      profile: {
        name: "Blanche Melton",
        company: "Coash",
        dob: "1991-04-09",
        address: "44 Cumberland Street, Newcastle, Delaware",
        location: {
          lat: -9.582944,
          long: 43.381636,
        },
        about:
          "Nulla dolor adipisicing do sint veniam excepteur deserunt aliqua aliqua. Ex do do adipisicing tempor nulla anim id culpa officia deserunt ullamco Lorem aliquip.",
      },
      apiKey: "aa6a44ab-02a0-4e0d-996a-c7de2b2d31a4",
      roles: ["owner", "member"],
      createdAt: "2011-04-06T00:41:22.292Z",
      updatedAt: "2011-04-07T00:41:22.292Z",
    },
    {
      id: "620a49f1fc55b1e497fe6398",
      email: "eugenia_finch@xixan.solutions",
      username: "eugenia94",
      profile: {
        name: "Eugenia Finch",
        company: "Xixan",
        dob: "1994-11-18",
        address: "1 Alton Place, Goldfield, Louisiana",
        location: {
          lat: -41.394151,
          long: -99.766157,
        },
        about:
          "Proident enim consequat in qui enim non dolore veniam et. Nisi aute ipsum aliqua deserunt aliquip cillum veniam sit labore ex eu nisi ipsum officia.",
      },
      apiKey: "166ac01e-8366-4c5a-ba23-dd354cbeeaa7",
      roles: ["admin", "owner"],
      createdAt: "2012-01-07T17:26:18.010Z",
      updatedAt: "2012-01-08T17:26:18.010Z",
    },
    {
      id: "620a49f18cc532324d988017",
      email: "cotton_caldwell@cipromox.mm",
      username: "cotton90",
      profile: {
        name: "Cotton Caldwell",
        company: "Cipromox",
        dob: "1990-08-31",
        address: "23 President Street, Lund, District Of Columbia",
        location: {
          lat: 56.245529,
          long: 7.363842,
        },
        about:
          "Minim eu id laborum reprehenderit do sint. Nisi ad pariatur cupidatat sunt culpa.",
      },
      apiKey: "f2d2deca-a7db-4538-8428-b4cbe680cb49",
      roles: ["owner", "admin"],
      createdAt: "2014-09-09T11:10:21.747Z",
      updatedAt: "2014-09-10T11:10:21.747Z",
    },
    {
      id: "620a49f1c48c4d9d096f7ffa",
      email: "gwendolyn_gomez@exotechno.fo",
      username: "gwendolyn92",
      profile: {
        name: "Gwendolyn Gomez",
        company: "Exotechno",
        dob: "1992-09-16",
        address: "94 Nichols Avenue, Imperial, Texas",
        location: {
          lat: 82.774795,
          long: 82.073501,
        },
        about:
          "Cupidatat proident officia velit duis proident pariatur ea officia consequat occaecat. Dolore esse ut nisi irure aliqua laboris excepteur.",
      },
      apiKey: "aec8e78d-f3ab-44fb-a803-c8e8805f9a52",
      roles: ["owner"],
      createdAt: "2010-12-18T04:16:28.961Z",
      updatedAt: "2010-12-19T04:16:28.961Z",
    },
    {
      id: "620a49f1d76853ac994f67ec",
      email: "shields_frederick@venoflex.cat",
      username: "shields94",
      profile: {
        name: "Shields Frederick",
        company: "Venoflex",
        dob: "1994-03-08",
        address: "20 Seeley Street, Esmont, Alaska",
        location: {
          lat: 43.644507,
          long: -77.300652,
        },
        about:
          "Aute id culpa esse quis. Sint anim elit cillum aliquip voluptate excepteur sint ut anim magna amet ipsum ad ea.",
      },
      apiKey: "2ae824c6-1e08-410e-935e-4ce9ed244fb8",
      roles: ["guest", "owner"],
      createdAt: "2012-07-14T05:01:13.736Z",
      updatedAt: "2012-07-15T05:01:13.736Z",
    },
    {
      id: "620a49f1180fc16eee864612",
      email: "skinner_rivera@softmicro.sm",
      username: "skinner90",
      profile: {
        name: "Skinner Rivera",
        company: "Softmicro",
        dob: "1990-02-05",
        address: "66 Lott Avenue, Martell, Montana",
        location: {
          lat: 8.107585,
          long: 90.321013,
        },
        about:
          "Tempor pariatur proident labore elit duis. Sunt ut aliqua qui Lorem non fugiat eiusmod sunt cupidatat.",
      },
      apiKey: "71e77865-ae7f-4ca0-9329-fe8bfc4aebc6",
      roles: ["member", "owner"],
      createdAt: "2013-12-26T04:25:34.448Z",
      updatedAt: "2013-12-27T04:25:34.448Z",
    },
    {
      id: "620a49f1f0d1f0b0f2fcc91c",
      email: "tammy_fuller@turnling.camp",
      username: "tammy88",
      profile: {
        name: "Tammy Fuller",
        company: "Turnling",
        dob: "1988-08-06",
        address: "73 Dictum Court, Waiohinu, Alabama",
        location: {
          lat: -55.910441,
          long: -21.906849,
        },
        about:
          "Commodo et proident deserunt est do nulla excepteur cupidatat. Esse quis cupidatat laboris fugiat consectetur quis.",
      },
      apiKey: "6a815dab-d07b-4f36-bcbb-2062715ebb9c",
      roles: ["admin"],
      createdAt: "2011-03-09T16:26:39.065Z",
      updatedAt: "2011-03-10T16:26:39.065Z",
    },
    {
      id: "620a49f10b9eebd464d7ae35",
      email: "lucile_clark@gonkle.gp",
      username: "lucile94",
      profile: {
        name: "Lucile Clark",
        company: "Gonkle",
        dob: "1994-06-19",
        address: "15 Guider Avenue, Ironton, Nebraska",
        location: {
          lat: -3.639054,
          long: -131.515008,
        },
        about:
          "Aute commodo veniam dolore enim irure enim exercitation ipsum id ut esse aliquip cillum eiusmod. Cillum cupidatat nisi voluptate qui Lorem proident.",
      },
      apiKey: "4a0af28e-40a5-4214-ace4-ef7bffe3bea7",
      roles: ["owner", "member"],
      createdAt: "2011-01-20T14:47:17.979Z",
      updatedAt: "2011-01-21T14:47:17.979Z",
    },
    {
      id: "620a49f1c75ccceabe27ce26",
      email: "sybil_roy@xeronk.epson",
      username: "sybil90",
      profile: {
        name: "Sybil Roy",
        company: "Xeronk",
        dob: "1990-05-11",
        address: "95 Cove Lane, Mammoth, Guam",
        location: {
          lat: -28.554985,
          long: 35.135975,
        },
        about:
          "Dolor dolore cillum dolore exercitation adipisicing dolor nostrud nisi. Enim commodo est pariatur ut labore commodo aliqua.",
      },
      apiKey: "eded79f5-12ab-458c-82a8-66f07292d552",
      roles: ["owner", "member"],
      createdAt: "2014-04-23T20:54:31.932Z",
      updatedAt: "2014-04-24T20:54:31.932Z",
    },
    {
      id: "620a49f1b998a6a558328632",
      email: "holcomb_waller@ecstasia.reise",
      username: "holcomb91",
      profile: {
        name: "Holcomb Waller",
        company: "Ecstasia",
        dob: "1991-10-07",
        address: "99 Hopkins Street, Montura, Rhode Island",
        location: {
          lat: 33.620604,
          long: 92.549667,
        },
        about:
          "Qui dolore nisi proident sunt aute quis do fugiat pariatur irure. Proident exercitation eiusmod occaecat amet consectetur elit.",
      },
      apiKey: "af0a0d53-2460-44e7-90e8-324c11f1920a",
      roles: ["guest", "admin"],
      createdAt: "2011-01-10T15:46:34.115Z",
      updatedAt: "2011-01-11T15:46:34.115Z",
    },
    {
      id: "620a49f162ca13a11ec4e546",
      email: "tamika_le@comveyor.financial",
      username: "tamika89",
      profile: {
        name: "Tamika Le",
        company: "Comveyor",
        dob: "1989-01-01",
        address: "63 Elizabeth Place, Yardville, Arizona",
        location: {
          lat: 84.936009,
          long: -175.297543,
        },
        about:
          "Commodo esse laboris fugiat enim labore nisi officia do. Duis officia id irure incididunt in.",
      },
      apiKey: "3371b419-7b99-4dc4-bf24-97f1eee738f7",
      roles: ["member", "guest"],
      createdAt: "2012-04-06T09:45:34.600Z",
      updatedAt: "2012-04-07T09:45:34.600Z",
    },
    {
      id: "620a49f14f9cb8ccc859e1e4",
      email: "william_jefferson@hotcakes.co",
      username: "william90",
      profile: {
        name: "William Jefferson",
        company: "Hotcakes",
        dob: "1990-03-03",
        address: "89 Ingraham Street, Walker, Northern Mariana Islands",
        location: {
          lat: -62.520202,
          long: 134.246603,
        },
        about:
          "Non aute commodo enim excepteur est. Proident sint culpa veniam laboris laborum voluptate tempor tempor qui est.",
      },
      apiKey: "ede10eb5-6f65-4074-8413-535d3a794361",
      roles: ["owner", "member"],
      createdAt: "2012-06-26T23:45:50.948Z",
      updatedAt: "2012-06-27T23:45:50.948Z",
    },
    {
      id: "620a49f17e8b57489f19819a",
      email: "kris_combs@ronelon.hamburg",
      username: "kris91",
      profile: {
        name: "Kris Combs",
        company: "Ronelon",
        dob: "1991-11-20",
        address: "17 Bush Street, Riceville, Florida",
        location: {
          lat: -29.034607,
          long: 111.824197,
        },
        about:
          "Est do consequat mollit mollit. Minim in excepteur non aliquip aute nulla commodo nisi.",
      },
      apiKey: "7d85bb33-65d4-4ac3-a73f-b681acdd2e63",
      roles: ["member", "guest"],
      createdAt: "2011-02-04T09:50:30.554Z",
      updatedAt: "2011-02-05T09:50:30.554Z",
    },
    {
      id: "620a49f1f586f9dc769769e0",
      email: "elva_pruitt@zanilla.forsale",
      username: "elva88",
      profile: {
        name: "Elva Pruitt",
        company: "Zanilla",
        dob: "1988-04-02",
        address: "88 Imlay Street, Masthope, Pennsylvania",
        location: {
          lat: -35.305862,
          long: 55.654732,
        },
        about:
          "Tempor sint do in do sunt laboris nostrud. Eiusmod cillum aliqua aliquip quis duis excepteur velit adipisicing.",
      },
      apiKey: "2d089df1-9744-4a3b-ab42-cb913b7c180e",
      roles: ["admin", "owner"],
      createdAt: "2014-02-05T00:00:30.184Z",
      updatedAt: "2014-02-06T00:00:30.184Z",
    },
    {
      id: "620a49f19c8abeeece44f3b2",
      email: "felicia_mosley@medicroix.webcam",
      username: "felicia92",
      profile: {
        name: "Felicia Mosley",
        company: "Medicroix",
        dob: "1992-03-30",
        address: "17 Perry Terrace, Sussex, Missouri",
        location: {
          lat: 17.304904,
          long: 165.514682,
        },
        about:
          "Lorem ipsum qui consectetur aute occaecat magna qui ullamco cillum mollit ullamco. Aliqua aliquip occaecat nostrud laboris non excepteur sint ea.",
      },
      apiKey: "c575c610-7047-45b8-b1cd-9205b4f642c6",
      roles: ["member", "admin"],
      createdAt: "2011-10-18T13:07:10.408Z",
      updatedAt: "2011-10-19T13:07:10.408Z",
    },
    {
      id: "620a49f14e098ac10f44dcbe",
      email: "julianne_chaney@ecolight.fans",
      username: "julianne92",
      profile: {
        name: "Julianne Chaney",
        company: "Ecolight",
        dob: "1992-03-17",
        address: "43 Dorchester Road, Stonybrook, Kansas",
        location: {
          lat: -60.949116,
          long: -6.680957,
        },
        about:
          "Aute laboris eiusmod sunt laboris esse ut culpa exercitation velit ex elit. Aliqua esse deserunt eiusmod voluptate sint non laboris duis ex ad tempor deserunt mollit.",
      },
      apiKey: "d2ef8f45-dd46-464e-914c-cc8b623b44d7",
      roles: ["member", "guest"],
      createdAt: "2014-06-15T00:14:17.270Z",
      updatedAt: "2014-06-16T00:14:17.270Z",
    },
    {
      id: "620a49f1590f754dd6160c79",
      email: "clarice_bell@geekola.durban",
      username: "clarice93",
      profile: {
        name: "Clarice Bell",
        company: "Geekola",
        dob: "1993-12-28",
        address: "94 School Lane, Enetai, Wyoming",
        location: {
          lat: -47.606231,
          long: -62.848266,
        },
        about:
          "Cupidatat dolore velit consequat est irure. Exercitation minim cupidatat ipsum do incididunt consequat amet incididunt cillum nostrud deserunt anim.",
      },
      apiKey: "c2e9ba3c-5beb-41a7-8d5e-bcae53e74e0e",
      roles: ["admin"],
      createdAt: "2011-03-30T17:29:27.344Z",
      updatedAt: "2011-03-31T17:29:27.344Z",
    },
    {
      id: "620a49f1d03fbd63c7f3c673",
      email: "kerri_hays@eventage.club",
      username: "kerri88",
      profile: {
        name: "Kerri Hays",
        company: "Eventage",
        dob: "1988-03-06",
        address: "3 Melba Court, Allentown, Georgia",
        location: {
          lat: 17.443063,
          long: 176.900851,
        },
        about:
          "Mollit aliquip excepteur ea laboris cillum proident laborum proident exercitation minim qui laborum. Mollit cupidatat irure ad reprehenderit exercitation ad mollit exercitation tempor non ut.",
      },
      apiKey: "e59e375a-25ac-42c8-b9f3-4118f66bb284",
      roles: ["admin", "member"],
      createdAt: "2011-12-10T09:01:41.030Z",
      updatedAt: "2011-12-11T09:01:41.030Z",
    },
    {
      id: "620a49f1c1c5f3abb4ddd39e",
      email: "rowe_mccarthy@cincyr.android",
      username: "rowe94",
      profile: {
        name: "Rowe Mccarthy",
        company: "Cincyr",
        dob: "1994-09-04",
        address: "56 Seigel Street, Layhill, Connecticut",
        location: {
          lat: -0.038282,
          long: -160.507084,
        },
        about:
          "Adipisicing pariatur reprehenderit aliqua magna exercitation adipisicing. Occaecat ex irure sit elit laborum ullamco minim excepteur Lorem aliquip.",
      },
      apiKey: "e76e7fed-2959-4bba-b88b-d50405a2bdac",
      roles: ["admin"],
      createdAt: "2011-11-20T19:02:34.305Z",
      updatedAt: "2011-11-21T19:02:34.305Z",
    },
    {
      id: "620a49f18397c0de2de2de34",
      email: "emily_valenzuela@pearlesex.casino",
      username: "emily91",
      profile: {
        name: "Emily Valenzuela",
        company: "Pearlesex",
        dob: "1991-10-30",
        address: "47 Louisa Street, Moscow, Colorado",
        location: {
          lat: 18.655829,
          long: 50.596182,
        },
        about:
          "Ea non velit tempor exercitation nulla Lorem aliquip est. Qui mollit cillum nisi officia ea do commodo cillum eu ex.",
      },
      apiKey: "af5a4c6b-ab51-4816-a257-dde7fa1b3b0d",
      roles: ["owner", "admin"],
      createdAt: "2012-03-11T12:02:48.356Z",
      updatedAt: "2012-03-12T12:02:48.356Z",
    },
    {
      id: "620a49f1bd2bb92f4b3b55d8",
      email: "cross_webb@zilla.barclays",
      username: "cross88",
      profile: {
        name: "Cross Webb",
        company: "Zilla",
        dob: "1988-08-09",
        address: "7 Newkirk Avenue, Deseret, Nevada",
        location: {
          lat: -31.113415,
          long: -104.141938,
        },
        about:
          "Velit qui magna labore eu esse commodo quis aliqua amet. Labore in in esse minim eu excepteur.",
      },
      apiKey: "ea516984-56ff-4cff-8ed4-1329b13669e1",
      roles: ["admin"],
      createdAt: "2014-06-17T03:33:54.691Z",
      updatedAt: "2014-06-18T03:33:54.691Z",
    },
    {
      id: "620a49f16e9b3016e20b1ae9",
      email: "leon_hunter@exodoc.cool",
      username: "leon92",
      profile: {
        name: "Leon Hunter",
        company: "Exodoc",
        dob: "1992-10-30",
        address: "16 Hamilton Walk, Bowmansville, Puerto Rico",
        location: {
          lat: 29.381069,
          long: -117.495232,
        },
        about:
          "Consectetur aute laborum laboris esse pariatur deserunt. Aliquip laboris magna aliquip mollit laboris veniam elit velit labore.",
      },
      apiKey: "17d8295a-d987-46ea-8214-8a9b2af68770",
      roles: ["admin"],
      createdAt: "2011-05-14T09:18:25.911Z",
      updatedAt: "2011-05-15T09:18:25.911Z",
    },
    {
      id: "620a49f1ae8bb3e5ed54a7f1",
      email: "latoya_palmer@fossiel.iq",
      username: "latoya91",
      profile: {
        name: "Latoya Palmer",
        company: "Fossiel",
        dob: "1991-10-29",
        address: "33 Crosby Avenue, Sheatown, New Hampshire",
        location: {
          lat: -35.167805,
          long: 142.950927,
        },
        about:
          "Laborum magna ea quis nostrud tempor reprehenderit ipsum id sit eu occaecat veniam aliqua. Anim duis ullamco ea tempor nisi anim.",
      },
      apiKey: "9757694f-d4d5-4f39-8f91-6e7f64bc919e",
      roles: ["admin", "member"],
      createdAt: "2011-10-30T14:49:57.148Z",
      updatedAt: "2011-10-31T14:49:57.148Z",
    },
    {
      id: "620a49f15c0aa9b3659afa66",
      email: "lila_dudley@imperium.as",
      username: "lila90",
      profile: {
        name: "Lila Dudley",
        company: "Imperium",
        dob: "1990-05-09",
        address: "93 Kings Place, Zarephath, Federated States Of Micronesia",
        location: {
          lat: -20.973506,
          long: -53.274986,
        },
        about:
          "Eiusmod incididunt aute veniam cillum dolore nostrud ullamco occaecat tempor ullamco. Mollit in commodo eiusmod ad amet est non ut enim ipsum sit sint cillum irure.",
      },
      apiKey: "85b4883a-e23a-4997-bf5a-793af034a9a2",
      roles: ["admin", "owner"],
      createdAt: "2010-03-03T00:52:38.937Z",
      updatedAt: "2010-03-04T00:52:38.937Z",
    },
    {
      id: "620a49f1e06dca55ce56c4ba",
      email: "ware_kent@polarium.plumbing",
      username: "ware89",
      profile: {
        name: "Ware Kent",
        company: "Polarium",
        dob: "1989-12-09",
        address: "53 Degraw Street, Kilbourne, Indiana",
        location: {
          lat: 13.408713,
          long: -88.602707,
        },
        about:
          "Adipisicing culpa eu consequat nostrud occaecat exercitation cillum reprehenderit aliquip magna magna qui. Qui minim laborum esse dolore minim sit esse ullamco officia nostrud aliqua cupidatat duis minim.",
      },
      apiKey: "0b5e5af5-0fc2-41fd-9fcc-ecb04c47a7c5",
      roles: ["member", "owner"],
      createdAt: "2013-07-18T11:02:50.852Z",
      updatedAt: "2013-07-19T11:02:50.852Z",
    },
    {
      id: "620a49f17f9d4529162231c3",
      email: "holden_williamson@flumbo.firmdale",
      username: "holden91",
      profile: {
        name: "Holden Williamson",
        company: "Flumbo",
        dob: "1991-08-10",
        address: "39 Cornelia Street, Lithium, Maryland",
        location: {
          lat: -39.439623,
          long: 22.257391,
        },
        about:
          "Est qui ex quis reprehenderit nulla. Do consequat exercitation cillum pariatur irure do quis ut sunt qui consequat.",
      },
      apiKey: "5be4bac0-ee5d-4a1c-bb0c-5aed7f40a180",
      roles: ["guest", "member"],
      createdAt: "2013-12-23T09:31:14.190Z",
      updatedAt: "2013-12-24T09:31:14.190Z",
    },
  ]);
  var iv = crypto.randomBytes(ivlength);

  console.log('Ciphering "%s" with key "%s" using %s', text, key, algorithm);
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");

  var cipher = crypto.createCipheriv(algorithm, key, iv);
  var ciphered = cipher.update(text, inputEncoding, outputEncoding);
  ciphered += cipher.final(outputEncoding);
  //we append the iv to the beginning of the string
  var ciphertext = iv.toString(outputEncoding) + ":" + ciphered;

  const hash = createHmac("sha256", secret).update(ciphered).digest("hex");

  ciphertext = hash + ":" + ciphertext;

  console.log('Result in %s is "%s"', outputEncoding, ciphertext);
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");
  console.log("*");

  const send = await fetch("http://localhost:5000/secured", {
    method: "POST",
    body: JSON.stringify({ message: ciphertext }),
    headers: { "Content-Type": "application/json" },
  });
  const q = await send.json();
  const de = decr(q.message);

  res.status(200).json({ message: de });
}

function decr(ciphertext) {
  var components = ciphertext.split(":");

  var hmac = components.shift();
  var iv_from_ciphertext = Buffer.from(components.shift(), outputEncoding);
  components = components.join();
  const hash = crypto
    .createHmac("sha256", secret)
    .update(components)
    .digest("hex");
  var decipher = crypto.createDecipheriv(algorithm, key, iv_from_ciphertext);
  var deciphered = decipher.update(components, outputEncoding, inputEncoding);

  deciphered += decipher.final(inputEncoding);
  console.log(deciphered, "over here");

  const hmacValid = hmac === hash;

  return deciphered;
}
