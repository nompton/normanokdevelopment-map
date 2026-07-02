// ─── ADD / EDIT DEVELOPMENT SITES HERE ───────────────────────────────────────
//
// status options:
//   "proposed"           — announced or rumored, no city filing yet
//   "planned"            — platted, city council approved, or permits filed
//   "under-construction" — actively being built
//   "completed"          — open / finished
//   "cancelled"          — officially withdrawn or abandoned
//
// planPdf: filename inside /public/plans/ — e.g. "sooner-mall-dicks.pdf"
//          Leave as undefined if you don't have a plan yet.
//
// articles: link to posts on normanokdevelopment.com
//
// lat/lng: right-click any location in Google Maps → "What's here?" for coordinates
// ─────────────────────────────────────────────────────────────────────────────

export type SiteStatus = "proposed" | "planned" | "under-construction" | "completed" | "cancelled";

export interface Article {
  title: string;
  url: string;
  date: string;
}

export interface DevelopmentSite {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: SiteStatus;
  description: string;
  articles: Article[];
  planPdf?: string;
}

export const SITES: DevelopmentSite[] = [
  {
    id: "wendys-nw-norman",
    name: "Wendy's — NW Norman",
    address: "NW Norman, OK",
    lat: 35.26230187787693,
    lng: -97.49213255492941,
    status: "completed",
    description: "Wendy's new location in NW Norman.",
    articles: [
      {
        title: "Wendy's Planning New NW Norman Location",
        url: "https://www.normanokdevelopment.com/2019/07/14/wendys-planning-new-nw-norman-location/",
        date: "July 14, 2019",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "joann-parkway-plaza",
    name: "Jo-Ann Fabrics — Parkway Plaza",
    address: "Parkway Plaza, Norman, OK",
    lat: 35.21228185789137,
    lng: -97.48694101036048,
    status: "completed",
    description: "Jo-Ann Fabrics opened in Parkway Plaza but later closed.",
    articles: [
      {
        title: "Jo-Ann Fabrics to Occupy Space in Parkway Plaza",
        url: "https://www.normanokdevelopment.com/2019/03/22/joann-fabrics-to-occupy-space-in-parkway-plaza/",
        date: "March 22, 2019",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "oncue-west-lindsey",
    name: "OnCue — West Lindsey",
    address: "W Lindsey St, Norman, OK",
    lat: 35.20474262973354,
    lng: -97.47760817016086,
    status: "completed",
    description: "OnCue purchased a prominent corner on West Lindsey Street for a new location.",
    articles: [
      {
        title: "OnCue Buys Prominent West Lindsey Corner",
        url: "https://www.normanokdevelopment.com/2019/01/29/oncue-buys-prominent-west-lindsey-corner/",
        date: "January 29, 2019",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "panda-express-south-norman",
    name: "Panda Express — South Norman",
    address: "S Norman, OK",
    lat: 35.181774595791396,
    lng: -97.41624969901233,
    status: "completed",
    description: "Panda Express location in South Norman.",
    articles: [
      {
        title: "Panda Express Coming to South Norman",
        url: "https://www.normanokdevelopment.com/2018/11/13/panda-express-coming-to-south-norman/",
        date: "November 13, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "andrews-park-master-plan",
    name: "Andrews Park Master Plan — Downtown",
    address: "Andrews Park, Norman, OK",
    lat: 35.22405409688551,
    lng: -97.44782649822255,
    status: "completed",
    description: "Master plan for Andrews Park presented to city council.",
    articles: [
      {
        title: "Council Presented Master Plan for Andrews Park",
        url: "https://www.normanokdevelopment.com/2023/12/08/council-presented-master-plan-for-andrews-park/",
        date: "December 8, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "arena-unp",
    name: "Arena — University North Park",
    address: "University North Park, Norman, OK",
    lat: 35.252309698617005,
    lng: -97.48330641179393,
    status: "under-construction",
    description: "Arena proposal submitted for University North Park, now under construction.",
    articles: [
      {
        title: "Arena Proposal Submitted for UNP",
        url: "https://www.normanokdevelopment.com/2023/11/18/arena-proposal-submitted-for-unp/",
        date: "November 18, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "tea-franchise-west-lindsey",
    name: "Local Tea Franchise — West Lindsey",
    address: "W Lindsey St, Norman, OK",
    lat: 35.20425687404181,
    lng: -97.46870569686915,
    status: "completed",
    description: "Local tea franchisee purchased and developed a West Lindsey Street site.",
    articles: [
      {
        title: "Local Tea Franchisee Purchases West Lindsey Site",
        url: "https://www.normanokdevelopment.com/2023/10/14/local-tea-franchisee-purchases-west-lindsey-site/",
        date: "October 14, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "home-creations-sooner-village",
    name: "Sooner Village — Home Creations",
    address: "S Norman, OK",
    lat: 35.17725350832845,
    lng: -97.43915923169685,
    status: "under-construction",
    description: "New residential development by Home Creations owners at Sooner Village.",
    articles: [
      {
        title: "Home Creations Owners Propose Two New Developments",
        url: "https://www.normanokdevelopment.com/2023/10/21/home-creations-owners-propose-two-new-developments/",
        date: "October 21, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "home-creations-whispering-hills",
    name: "Whispering Hills — Home Creations",
    address: "N Norman, OK",
    lat: 35.29344138304551,
    lng: -97.50917599309534,
    status: "under-construction",
    description: "New residential development by Home Creations owners at Whispering Hills.",
    articles: [
      {
        title: "Home Creations Owners Propose Two New Developments",
        url: "https://www.normanokdevelopment.com/2023/10/21/home-creations-owners-propose-two-new-developments/",
        date: "October 21, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "norman-transit-center",
    name: "Norman Transit Center — Downtown",
    address: "Downtown Norman, OK",
    lat: 35.221315197209115,
    lng: -97.43872835952881,
    status: "completed",
    description: "Norman Transit Center neared and reached completion in downtown Norman.",
    articles: [
      {
        title: "Norman Transit Center Nearing Completion in Downtown",
        url: "https://www.normanokdevelopment.com/2023/10/10/norman-transit-center-nearing-competition-in-downtown/",
        date: "October 10, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "salad-chain-main-street",
    name: "Salad Chain — Main Street Redevelopment",
    address: "W Main St, Norman, OK",
    lat: 35.21818517027543,
    lng: -97.45930024686974,
    status: "cancelled",
    description: "Salad chain proposed to redevelop a Main Street parcel but did not move forward.",
    articles: [
      {
        title: "Salad Chain to Redevelop Main Street Parcel",
        url: "https://www.normanokdevelopment.com/2023/10/08/salad-chain-to-redevelop-main-street-parcel/",
        date: "October 8, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "andys-frozen-custard-west-norman",
    name: "Andy's Frozen Custard — West Norman",
    address: "W Norman, OK",
    lat: 35.23205644140523,
    lng: -97.48903181637255,
    status: "completed",
    description: "Andy's Frozen Custard opened a West Norman location.",
    articles: [
      {
        title: "Andy's Frozen Custard Coming to West Norman",
        url: "https://www.normanokdevelopment.com/2023/09/23/andys-frozen-custard-coming-to-west-norman/",
        date: "September 23, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "dunkin-south-norman",
    name: "Dunkin' — South Norman",
    address: "S Norman, OK",
    lat: 35.17934493038756,
    lng: -97.41480999381615,
    status: "completed",
    description: "Dunkin' opened in South Norman alongside Popeyes.",
    articles: [
      {
        title: "Dunkin', Popeyes Coming to South Norman",
        url: "https://www.normanokdevelopment.com/2023/06/24/239/",
        date: "June 24, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "popeyes-south-norman",
    name: "Popeyes — South Norman",
    address: "S Norman, OK",
    lat: 35.179529239585044,
    lng: -97.41492811537952,
    status: "completed",
    description: "Popeyes opened in South Norman alongside Dunkin'.",
    articles: [
      {
        title: "Dunkin', Popeyes Coming to South Norman",
        url: "https://www.normanokdevelopment.com/2023/06/24/239/",
        date: "June 24, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "skechers-parkway-plaza",
    name: "Skechers — Parkway Plaza",
    address: "Parkway Plaza, Norman, OK",
    lat: 35.21176634372025,
    lng: -97.4848886454445,
    status: "completed",
    description: "Skechers opened in Parkway Plaza alongside Burlington.",
    articles: [
      {
        title: "Skechers, Burlington to Occupy Space in Parkway Plaza",
        url: "https://www.normanokdevelopment.com/2023/06/21/skechers-burlington-to-occupy-space-in-parkway-plaza/",
        date: "June 21, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "burlington-parkway-plaza",
    name: "Burlington — Parkway Plaza",
    address: "Parkway Plaza, Norman, OK",
    lat: 35.210575109093895,
    lng: -97.48557478239951,
    status: "completed",
    description: "Burlington opened in Parkway Plaza alongside Skechers.",
    articles: [
      {
        title: "Skechers, Burlington to Occupy Space in Parkway Plaza",
        url: "https://www.normanokdevelopment.com/2023/06/21/skechers-burlington-to-occupy-space-in-parkway-plaza/",
        date: "June 21, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "student-housing-ou-motel",
    name: "Student Housing — Former OU Motel Site",
    address: "E Lindsey St, Norman, OK",
    lat: 35.19473606750907,
    lng: -97.42594382970297,
    status: "cancelled",
    description: "Student housing development proposed to replace the infamous OU motel, but did not move forward.",
    articles: [
      {
        title: "Student Housing Development to Replace Infamous OU Motel",
        url: "https://www.normanokdevelopment.com/2023/01/24/student-housing-development-to-replace-infamous-ou-motel/",
        date: "January 24, 2023",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "starbucks-lindsey-street",
    name: "Starbucks — Lindsey Street",
    address: "W Lindsey St, Norman, OK",
    lat: 35.20356105685391,
    lng: -97.4592847092809,
    status: "completed",
    description: "Starbucks joined the tenant mix on Lindsey Street in Norman.",
    articles: [
      {
        title: "Starbucks Joining Tenant Mix on Lindsey Street",
        url: "https://www.normanokdevelopment.com/2022/04/11/starbucks-joining-tenant-mix-on-lindsey-street/",
        date: "April 11, 2022",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "coffee-chain-location-1",
    name: "National Coffee Chain — W Main St",
    address: "W Main St, Norman, OK",
    lat: 35.218840262595286,
    lng: -97.48058571759682,
    status: "completed",
    description: "One of two new Norman locations added by a national coffee chain.",
    articles: [
      {
        title: "National Coffee Chain Bringing 2 New Locations",
        url: "https://www.normanokdevelopment.com/2022/01/20/national-coffee-chain-bringing-2-new-locations/",
        date: "January 20, 2022",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "coffee-chain-location-2",
    name: "National Coffee Chain — E Lindsey St",
    address: "E Lindsey St, Norman, OK",
    lat: 35.23323588883364,
    lng: -97.44267030155936,
    status: "completed",
    description: "One of two new Norman locations added by a national coffee chain.",
    articles: [
      {
        title: "National Coffee Chain Bringing 2 New Locations",
        url: "https://www.normanokdevelopment.com/2022/01/20/national-coffee-chain-bringing-2-new-locations/",
        date: "January 20, 2022",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "starbucks-north-norman",
    name: "Starbucks — North Norman",
    address: "N Norman, OK",
    lat: 35.26396914949298,
    lng: -97.47563200960602,
    status: "completed",
    description: "Starbucks added a North Norman location.",
    articles: [
      {
        title: "Starbucks Adding North Norman Location",
        url: "https://www.normanokdevelopment.com/2021/07/09/starbucks-adding-north-norman-location/",
        date: "July 9, 2021",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "taco-chain-lindsey",
    name: "Dallas Taco Chain — Lindsey Street",
    address: "W Lindsey St, Norman, OK",
    lat: 35.20348347811404,
    lng: -97.4630553081468,
    status: "completed",
    description: "Dallas-based taco chain opened on Lindsey Street in Norman.",
    articles: [
      {
        title: "Dallas Taco Chain Coming to Lindsey Street",
        url: "https://www.normanokdevelopment.com/2021/03/17/dallas-taco-chain-coming-to-lindsey-street/",
        date: "March 17, 2021",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "coffee-chain-main-street",
    name: "National Coffee Chain — Main Street",
    address: "W Main St, Norman, OK",
    lat: 35.21821820484369,
    lng: -97.45975564535121,
    status: "completed",
    description: "National coffee chain opened on Main Street in Norman.",
    articles: [
      {
        title: "National Coffee Chain Coming to Main Street",
        url: "https://www.normanokdevelopment.com/2020/11/05/national-coffee-chain-coming-to-main-street/",
        date: "November 5, 2020",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "mntc-unp-tract",
    name: "MNTC Land Purchase — University North Park",
    address: "University North Park, Norman, OK",
    lat: 35.24888387271859,
    lng: -97.4773498462076,
    status: "cancelled",
    description: "MNTC purchased a large tract of land in University North Park, but the development did not move forward.",
    articles: [
      {
        title: "MNTC Buys Large Tract in UNP",
        url: "https://www.normanokdevelopment.com/2020/08/05/mntc-buys-large-tract-in-unp/",
        date: "August 5, 2020",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "norman-regional-new-location",
    name: "Norman Regional Health System — New Location",
    address: "S Norman, OK",
    lat: 35.18687024046427,
    lng: -97.40779760748447,
    status: "completed",
    description: "Norman Regional Health System planned and built a new location in South Norman.",
    articles: [
      {
        title: "Norman Regional Health System Plans New Location",
        url: "https://www.normanokdevelopment.com/2020/04/19/norman-regional-health-system-plans-new-location/",
        date: "April 19, 2020",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "planet-fitness-golds-gym",
    name: "Planet Fitness — Former Gold's Gym",
    address: "E Lindsey St, Norman, OK",
    lat: 35.217732234649375,
    lng: -97.4256758065951,
    status: "completed",
    description: "Planet Fitness took over the former Gold's Gym location in Norman.",
    articles: [
      {
        title: "Planet Fitness to Take Over Norman Gold's Gym",
        url: "https://www.normanokdevelopment.com/2020/03/11/planet-fitness-to-take-over-norman-golds-gym/",
        date: "March 11, 2020",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "wendys-south-norman-built",
    name: "Wendy's — South Norman",
    address: "S Norman, OK",
    lat: 35.17990169080142,
    lng: -97.41516244007585,
    status: "completed",
    description: "Wendy's location in South Norman that was ultimately built.",
    articles: [
      {
        title: "Wendy's Set to Join OnCue in South Norman Development",
        url: "https://www.normanokdevelopment.com/2018/04/01/wendys-set-to-join-oncue-in-south-norman-development/",
        date: "April 1, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "wendys-south-norman",
    name: "Wendy's — South Norman (original site)",
    address: "S Norman, OK",
    lat: 35.18625777867005,
    lng: -97.42078121230038,
    status: "cancelled",
    description: "Wendy's was set to join OnCue in a South Norman development but did not proceed at this location — moved to a different site in the area.",
    articles: [
      {
        title: "Wendy's Set to Join OnCue in South Norman Development",
        url: "https://www.normanokdevelopment.com/2018/04/01/wendys-set-to-join-oncue-in-south-norman-development/",
        date: "April 1, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "hotel-unp",
    name: "Hotel — University North Park",
    address: "University North Park, Norman, OK",
    lat: 35.2463579188148,
    lng: -97.48291447157786,
    status: "planned",
    description: "New hotel chain planned for University North Park.",
    articles: [
      {
        title: "UNP to Gain New Hotel Chain",
        url: "https://www.normanokdevelopment.com/2018/02/22/unp-to-gain-new-hotel-chain/",
        date: "February 22, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "carmax-unp",
    name: "CarMax — University North Park",
    address: "University North Park, Norman, OK",
    lat: 35.24697329569169,
    lng: -97.48410123633055,
    status: "completed",
    description: "CarMax auto dealership joining the retail corridor at University North Park.",
    articles: [
      {
        title: "CarMax to Join Retailers in UNP",
        url: "https://www.normanokdevelopment.com/2018/01/29/carmax-to-join-retailers-in-unp/",
        date: "January 29, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "boutique-hotel-campus-corner",
    name: "Boutique Hotel — Campus Corner",
    address: "Campus Corner, Norman, OK",
    lat: 35.2133808481058,
    lng: -97.44613221165325,
    status: "completed",
    description: "Boutique hotel developed at Campus Corner.",
    articles: [
      {
        title: "Boutique Hotel Coming to Campus Corner",
        url: "https://www.normanokdevelopment.com/2020/03/06/boutique-hotel-coming-to-campus-corner/",
        date: "March 6, 2020",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "mixed-use-campus-corner",
    name: "Mixed-Use Development — Campus Corner",
    address: "Campus Corner, Norman, OK",
    lat: 35.21346127831052,
    lng: -97.44348262547034,
    status: "cancelled",
    description: "Mixed-use development proposed for the Campus Corner area.",
    articles: [
      {
        title: "Mixed-Use Development Proposed for Campus Corner",
        url: "https://www.normanokdevelopment.com/2018/01/26/mixed-use-development-proposed-for-campus-corner/",
        date: "January 26, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "oil-change-long-john-silvers",
    name: "Oil Change Shop — Former Long John Silver's",
    address: "E Lindsey St, Norman, OK",
    lat: 35.21671550146959,
    lng: -97.4241177552962,
    status: "completed",
    description: "Oil change shop built on the site of the former Long John Silver's location.",
    articles: [
      {
        title: "Oil Change Shop to Take Site of Former Long John Silver's",
        url: "https://www.normanokdevelopment.com/2018/01/25/oil-change-shop-to-take-site-of-former-long-john-silvers/",
        date: "January 25, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "office-healthplex",
    name: "Office Development — Healthplex Campus",
    address: "Healthplex Campus, Norman, OK",
    lat: 35.255802981129115,
    lng: -97.4868492936122,
    status: "completed",
    description: "Office development on the Healthplex campus in Norman.",
    articles: [
      {
        title: "Office Development Coming to Healthplex Campus",
        url: "https://www.normanokdevelopment.com/2018/01/24/office-development-coming-to-healthplex-campus/",
        date: "January 24, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "mixed-use-key-west",
    name: "Mixed-Use Development — Key West Corner",
    address: "Key West Ave & N Porter Ave, Norman, OK",
    lat: 35.24914726543468,
    lng: -97.49570089378544,
    status: "planned",
    description: "Mixed-use development planned for the Key West and Norman corner.",
    articles: [
      {
        title: "Mixed-Use Development Planned for Key West Norman Corner",
        url: "https://www.normanokdevelopment.com/2018/01/24/mixed-use-development-planned-for-key-west-norman-corner/",
        date: "January 24, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "7eleven-rock-creek-porter",
    name: "7-Eleven — Rock Creek & Porter",
    address: "E Rock Creek Rd & Porter Ave, Norman, OK",
    lat: 35.247827951894635,
    lng: -97.44062409617595,
    status: "cancelled",
    description: "7-Eleven proposed as anchor tenant for a redevelopment at the corner of East Rock Creek Road and Porter Avenue.",
    articles: [
      {
        title: "7-Eleven to Anchor Redevelopment at East Rock Creek and Porter",
        url: "https://www.normanokdevelopment.com/2018/01/23/7-11-to-anchor-redevelopment-at-east-rock-creek-and-porter/",
        date: "January 23, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "office-36th-avenue",
    name: "Office Development — 36th Avenue",
    address: "36th Ave NW, Norman, OK",
    lat: 35.22761826968824,
    lng: -97.49413516827539,
    status: "cancelled",
    description: "Proposed office development fronting 36th Avenue in Norman.",
    articles: [
      {
        title: "New Office Development to Front 36th Avenue",
        url: "https://www.normanokdevelopment.com/2018/01/23/new-office-development-to-front-36th-avenue/",
        date: "January 23, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "chickfila-east-norman",
    name: "Chick-fil-A — East Norman",
    address: "East Norman, OK",
    lat: 35.21986422938324,
    lng: -97.42419563945145,
    status: "completed",
    description: "Chick-fil-A location in East Norman.",
    articles: [
      {
        title: "Chick-fil-A to Open New East Norman Location",
        url: "https://www.normanokdevelopment.com/2018/01/23/chick-fil-a-to-open-new-east-norman-location/",
        date: "January 23, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "oncue-south-norman",
    name: "OnCue — South Norman",
    address: "South Norman, OK",
    lat: 35.18445540704393,
    lng: -97.4198536687635,
    status: "completed",
    description: "OnCue convenience store and fuel station in South Norman.",
    articles: [
      {
        title: "OnCue Coming to South Norman",
        url: "https://www.normanokdevelopment.com/2018/01/22/oncue-coming-to-south-norman/",
        date: "January 22, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "starbucks-classen",
    name: "Starbucks — Classen Boulevard",
    address: "Classen Blvd, Norman, OK",
    lat: 35.182103335367046,
    lng: -97.41646732194972,
    status: "completed",
    description: "Starbucks location on Classen Boulevard, part of a retail development alongside Aldi.",
    articles: [
      {
        title: "Aldi, Starbucks Coming to Classen Boulevard",
        url: "https://www.normanokdevelopment.com/2018/01/22/aldi-starbucks-coming-to-classen-boulevard/",
        date: "January 22, 2018",
      },
      {
        title: "Starbucks Coming to South Norman",
        url: "https://www.normanokdevelopment.com/2018/03/31/starbucks-coming-to-south-norman/",
        date: "March 31, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "aldi-classen",
    name: "Aldi — Classen Boulevard",
    address: "Classen Blvd, Norman, OK",
    lat: 35.18087816880417,
    lng: -97.41563947143807,
    status: "completed",
    description: "Aldi grocery store on Classen Boulevard, part of a retail development alongside Starbucks.",
    articles: [
      {
        title: "Aldi, Starbucks Coming to Classen Boulevard",
        url: "https://www.normanokdevelopment.com/2018/01/22/aldi-starbucks-coming-to-classen-boulevard/",
        date: "January 22, 2018",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "dicks-sooner-mall",
    name: "Dick's House of Sport — Sooner Mall",
    address: "3301 W Main St, Norman, OK 73072",
    lat: 35.2103,
    lng: -97.4785,
    status: "proposed",
    description:
      "Dick's House of Sport is eyeing the former Sears anchor space at Sooner Mall, which has sat vacant since mid-2019. The format is a large-format experiential sports retail concept.",
    articles: [
      {
        title: "Dick's House of Sport Eyes Former Sears Space at Sooner Mall",
        url: "https://normanokdevelopment.com/dicks-house-of-sport-eyes-former-sears-space-at-sooner-mall/",
        date: "June 13, 2026",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "perfect-swing-hwy9",
    name: "Former Perfect Swing — Highway 9",
    address: "Highway 9, Norman, OK",
    lat: 35.2079,
    lng: -97.3916,
    status: "planned",
    description:
      "The long-vacant Perfect Swing amusement property (32+ acres) sold for $5.8M to Highway 9 Raw Land LLC, an entity affiliated with developer Hunter Miller.",
    articles: [
      {
        title: "Long-vacant Perfect Swing property sells for $5.8M",
        url: "https://normanokdevelopment.com/long-vacant-perfect-swing-property-sells-for-5-8m/",
        date: "February 19, 2026",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "chickfila-university-north-park",
    name: "Chick-fil-A — University North Park",
    address: "Rock Creek Rd & 24th Ave NW, Norman, OK",
    lat: 35.2568,
    lng: -97.4785,
    status: "planned",
    description:
      "Chick-fil-A filed a $4.5M permit for a sixth Norman location at the southwest corner of Rock Creek Road and 24th Avenue NW in University North Park.",
    articles: [
      {
        title: "Chick-fil-A plans sixth Norman location in University North Park",
        url: "https://normanokdevelopment.com/chick-fil-a-plans-sixth-norman-location-in-university-north-park/",
        date: "January 30, 2026",
      },
    ],
    planPdf: undefined,
  },
];
