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
    id: "armstrong-bank-south-classen",
    name: "Armstrong Bank — South Classen",
    address: "S Classen Blvd, Norman, OK",
    lat: 35.17184141399959,
    lng: -97.41002082247022,
    status: "under-construction",
    description: "Armstrong Bank under construction along South Classen as part of a wave of new tenants in the corridor.",
    articles: [
      {
        title: "Slew of New Tenants Coming to South Classen",
        url: "https://www.normanokdevelopment.com/2025/10/10/slew-of-new-tenants-coming-to-south-classen/",
        date: "October 10, 2025",
      },
      {
        title: "Target Anticipated to Anchor South Norman Development",
        url: "https://www.normanokdevelopment.com/2024/10/10/target-anticipated-to-anchor-south-norman-development/",
        date: "October 10, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "freddys-south-classen",
    name: "Freddy's — South Classen",
    address: "S Classen Blvd, Norman, OK",
    lat: 35.17108543704187,
    lng: -97.40945834101957,
    status: "under-construction",
    description: "Freddy's Frozen Custard & Steakburgers under construction on South Classen.",
    articles: [
      {
        title: "Slew of New Tenants Coming to South Classen",
        url: "https://www.normanokdevelopment.com/2025/10/10/slew-of-new-tenants-coming-to-south-classen/",
        date: "October 10, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "liberty-point-south-classen",
    name: "Liberty Point — South Classen",
    address: "S Classen Blvd, Norman, OK",
    lat: 35.16480635741453,
    lng: -97.40161414204371,
    status: "planned",
    description: "Liberty Point development planned along South Classen.",
    articles: [
      {
        title: "Slew of New Tenants Coming to South Classen",
        url: "https://www.normanokdevelopment.com/2025/10/10/slew-of-new-tenants-coming-to-south-classen/",
        date: "October 10, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "churchs-chicken-south-classen",
    name: "Church's Chicken — South Classen",
    address: "S Classen Blvd, Norman, OK",
    lat: 35.1733333393243,
    lng: -97.41230587054562,
    status: "proposed",
    description: "Church's Chicken proposed along South Classen.",
    articles: [
      {
        title: "Slew of New Tenants Coming to South Classen",
        url: "https://www.normanokdevelopment.com/2025/10/10/slew-of-new-tenants-coming-to-south-classen/",
        date: "October 10, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "qsr-1-south-classen",
    name: "Quick Service Restaurant — South Classen (N)",
    address: "S Classen Blvd, Norman, OK",
    lat: 35.176944474655556,
    lng: -97.41472991928423,
    status: "planned",
    description: "Quick service restaurant planned along South Classen.",
    articles: [
      {
        title: "Slew of New Tenants Coming to South Classen",
        url: "https://www.normanokdevelopment.com/2025/10/10/slew-of-new-tenants-coming-to-south-classen/",
        date: "October 10, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "chipotle-south-classen",
    name: "Chipotle — South Classen",
    address: "S Classen Blvd, Norman, OK",
    lat: 35.18006883800999,
    lng: -97.41654962350981,
    status: "completed",
    description: "Chipotle opened on South Classen as part of the corridor's growth.",
    articles: [
      {
        title: "Slew of New Tenants Coming to South Classen",
        url: "https://www.normanokdevelopment.com/2025/10/10/slew-of-new-tenants-coming-to-south-classen/",
        date: "October 10, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "qsr-2-south-classen",
    name: "Quick Service Restaurant — South Classen (S)",
    address: "S Classen Blvd, Norman, OK",
    lat: 35.18023871679705,
    lng: -97.41701323603887,
    status: "planned",
    description: "Quick service restaurant planned along South Classen.",
    articles: [
      {
        title: "Slew of New Tenants Coming to South Classen",
        url: "https://www.normanokdevelopment.com/2025/10/10/slew-of-new-tenants-coming-to-south-classen/",
        date: "October 10, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "sooner-legends-hotel-site",
    name: "Former Sooner Legends Hotel — Vacant Site",
    address: "W Main St, Norman, OK",
    lat: 35.20277015487883,
    lng: -97.47827811918253,
    status: "proposed",
    description: "The former Sooner Legends Hotel was demolished. The site is currently vacant with no development proposed yet.",
    articles: [],
    planPdf: undefined,
  },
  {
    id: "shake-shack-unp",
    name: "Shake Shack — University North Park",
    address: "University North Park, Norman, OK",
    lat: 35.247242364299,
    lng: -97.47850372959384,
    status: "under-construction",
    description: "Shake Shack plans a Norman location at University North Park.",
    articles: [
      {
        title: "Shake Shack Plans Norman Location in UNP",
        url: "https://www.normanokdevelopment.com/2025/08/04/shake-shack-plans-norman-location-in-unp/",
        date: "August 4, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "1300-w-lindsey",
    name: "Retail Strip — 1300 W Lindsey",
    address: "1300 W Lindsey St, Norman, OK",
    lat: 35.20336714520037,
    lng: -97.46110782905495,
    status: "completed",
    description: "Redevelopment at 1300 W Lindsey, part of a revitalization effort along West Lindsey.",
    articles: [
      {
        title: "Three Developments Underway to Revitalize West Lindsey",
        url: "https://www.normanokdevelopment.com/2025/02/28/three-developments-underway-to-revitalize-west-lindsey/",
        date: "February 28, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "1209-w-lindsey",
    name: "Retail Strip — 1209 W Lindsey",
    address: "1209 W Lindsey St, Norman, OK",
    lat: 35.20420558044441,
    lng: -97.45968495645249,
    status: "under-construction",
    description: "Redevelopment at 1209 W Lindsey, part of a revitalization effort along West Lindsey.",
    articles: [
      {
        title: "Three Developments Underway to Revitalize West Lindsey",
        url: "https://www.normanokdevelopment.com/2025/02/28/three-developments-underway-to-revitalize-west-lindsey/",
        date: "February 28, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "1035-s-berry",
    name: "Mama Roja — 1035 S Berry",
    address: "1035 S Berry Rd, Norman, OK",
    lat: 35.204230269911825,
    lng: -97.45863115923154,
    status: "completed",
    description: "Redevelopment at 1035 S Berry, part of a revitalization effort along West Lindsey.",
    articles: [
      {
        title: "Three Developments Underway to Revitalize West Lindsey",
        url: "https://www.normanokdevelopment.com/2025/02/28/three-developments-underway-to-revitalize-west-lindsey/",
        date: "February 28, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "quiktrip-norman",
    name: "QuikTrip — Norman",
    address: "W Main St, Norman, OK",
    lat: 35.21737478243663,
    lng: -97.48195470108446,
    status: "under-construction",
    description: "QuikTrip purchased key Norman parcels and is under construction.",
    articles: [
      {
        title: "QuikTrip Buys Key Norman Parcels",
        url: "https://www.normanokdevelopment.com/2025/02/07/quiktrip-buys-key-norman-parcels/",
        date: "February 7, 2025",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "target-south-norman",
    name: "Target — South Norman",
    address: "S Norman, OK",
    lat: 35.170365659865276,
    lng: -97.40721719366417,
    status: "under-construction",
    description: "Target anticipated to anchor a new South Norman development.",
    articles: [
      {
        title: "Target Anticipated to Anchor South Norman Development",
        url: "https://www.normanokdevelopment.com/2024/10/10/target-anticipated-to-anchor-south-norman-development/",
        date: "October 10, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "bob-moore-farms-ed-noble",
    name: "Bob Moore Farms — Ed Noble Pkwy",
    address: "Ed Noble Pkwy, Norman, OK",
    lat: 35.21425995616582,
    lng: -97.49170592107458,
    status: "planned",
    description: "Large residential project by Bob Moore Farms planned for the Ed Noble Parkway area.",
    articles: [
      {
        title: "Bob Moore Farms to Bring Large Residential Project to Ed Noble Parkway Area",
        url: "https://www.normanokdevelopment.com/2024/06/21/bob-moore-farms-to-bring-large-residential-project-to-ed-noble-parkway-area/",
        date: "June 21, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "parking-garage-downtown",
    name: "Parking Garage Development — Downtown",
    address: "Downtown Norman, OK",
    lat: 35.220537458738725,
    lng: -97.44222050459823,
    status: "proposed",
    description: "Cleveland County seeking proposals for a parking garage development in downtown Norman.",
    articles: [
      {
        title: "County Seeks Proposal for Parking Garage Development in Downtown Norman",
        url: "https://www.normanokdevelopment.com/2024/04/19/county-seeks-proposal-for-parking-garage-development-in-downtown-norman/",
        date: "April 19, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "main-event-unp",
    name: "Main Event — Legacy Village at UNP",
    address: "Legacy Village, University North Park, Norman, OK",
    lat: 35.2415160968436,
    lng: -97.47947148868302,
    status: "completed",
    description: "Main Event entertainment venue opened at Legacy Village at University North Park.",
    articles: [
      {
        title: "Main Event Planned for Legacy Village at UNP; Hobby Lobby, Mardel to Relocate",
        url: "https://www.normanokdevelopment.com/2024/05/24/main-event-planned-for-legacy-village-at-unp-hobby-lobby-mardel-to-relocate/",
        date: "May 24, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "hobby-lobby-unp",
    name: "Hobby Lobby — Legacy Village at UNP",
    address: "Legacy Village, University North Park, Norman, OK",
    lat: 35.23921769072481,
    lng: -97.47785601410358,
    status: "completed",
    description: "Hobby Lobby relocated to Legacy Village at University North Park.",
    articles: [
      {
        title: "Main Event Planned for Legacy Village at UNP; Hobby Lobby, Mardel to Relocate",
        url: "https://www.normanokdevelopment.com/2024/05/24/main-event-planned-for-legacy-village-at-unp-hobby-lobby-mardel-to-relocate/",
        date: "May 24, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "mardel-unp",
    name: "Mardel — Legacy Village at UNP",
    address: "Legacy Village, University North Park, Norman, OK",
    lat: 35.239489417287,
    lng: -97.47779094173639,
    status: "completed",
    description: "Mardel relocated to Legacy Village at University North Park.",
    articles: [
      {
        title: "Main Event Planned for Legacy Village at UNP; Hobby Lobby, Mardel to Relocate",
        url: "https://www.normanokdevelopment.com/2024/05/24/main-event-planned-for-legacy-village-at-unp-hobby-lobby-mardel-to-relocate/",
        date: "May 24, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "tamashii-ramen-downtown",
    name: "Tamashii Ramen — Downtown Norman",
    address: "Downtown Norman, OK",
    lat: 35.22004218479969,
    lng: -97.44494363894724,
    status: "completed",
    description: "Tamashii Ramen opened a downtown Norman location.",
    articles: [
      {
        title: "Tamashii Ramen Plans Downtown Norman Location",
        url: "https://www.normanokdevelopment.com/2024/02/29/tamashii-ramen-plans-downtown-norman-location/",
        date: "February 29, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "pf-changs-unp",
    name: "P.F. Chang's — University North Park",
    address: "University North Park, Norman, OK",
    lat: 35.24010287824189,
    lng: -97.48159328717996,
    status: "completed",
    description: "P.F. Chang's opened at University North Park alongside Brockhaus Jewelry.",
    articles: [
      {
        title: "P.F. Chang's, Brockhaus Jewelry Coming to UNP",
        url: "https://www.normanokdevelopment.com/2024/01/26/p-f-changs-brockhaus-jewelry-coming-to-unp/",
        date: "January 26, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "brockhaus-jewelry-unp",
    name: "Brockhaus Jewelry — University North Park",
    address: "University North Park, Norman, OK",
    lat: 35.24085116348447,
    lng: -97.48137403675496,
    status: "completed",
    description: "Brockhaus Jewelry opened at University North Park alongside P.F. Chang's.",
    articles: [
      {
        title: "P.F. Chang's, Brockhaus Jewelry Coming to UNP",
        url: "https://www.normanokdevelopment.com/2024/01/26/p-f-changs-brockhaus-jewelry-coming-to-unp/",
        date: "January 26, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "nps-journey-church",
    name: "Norman Public Schools — Former Journey Church",
    address: "N Norman, OK",
    lat: 35.26452491809215,
    lng: -97.48816817683803,
    status: "completed",
    description: "Norman Public Schools purchased the former Journey Church building.",
    articles: [
      {
        title: "Norman Public Schools to Purchase Former Journey Church",
        url: "https://www.normanokdevelopment.com/2024/02/05/norman-public-schools-to-purchase-former-journey-church/",
        date: "February 5, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "whataburger-south-norman",
    name: "Whataburger — Second Norman Location",
    address: "S Norman, OK",
    lat: 35.18579394827776,
    lng: -97.42035299968362,
    status: "completed",
    description: "Whataburger opened a second Norman location in South Norman.",
    articles: [
      {
        title: "Whataburger Plans Second Norman Location",
        url: "https://www.normanokdevelopment.com/2024/01/06/whataburger-plans-second-norman-location/",
        date: "January 6, 2024",
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
    name: "Rock Creek Entertainment District",
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
      {
        title: "Norman Arena and Entertainment District to Go Before Planning Commission; August Citizen Vote Possible",
        url: "https://www.normanokdevelopment.com/2024/06/08/norman-arena-and-entertainment-district-to-go-before-planning-commission-august-citizen-vote-possible/",
        date: "June 8, 2024",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "tea-franchise-west-lindsey",
    name: "HTeaO — West Lindsey",
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
    name: "Salad & Go — Main Street (Cancelled)",
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
    name: "Verve Norman — Former OU Motel Site (Cancelled)",
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
    name: "Dutch Bros — W Main St",
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
    name: "Starbucks — E Lindsey St",
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
    name: "Velvet Taco — Lindsey Street",
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
    name: "Dunkin' — Main Street",
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
    name: "Home2 Suites — University North Park",
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
    name: "NOUN Hotel — Campus Corner",
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
    name: "Take 5 Oil Change — Former Long John Silver's",
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
    lat: 35.220095208501256,
    lng: -97.48897028603979,
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
    lat: 35.18495186074105,
    lng: -97.41151767799238,
    status: "planned",
    description:
      "The long-vacant Perfect Swing amusement property (32+ acres) sold for $5.8M to Highway 9 Raw Land LLC, an entity affiliated with developer Hunter Miller. Land is now being cleared.",
    articles: [
      {
        title: "Long-vacant Perfect Swing property sells for $5.8M",
        url: "https://normanokdevelopment.com/long-vacant-perfect-swing-property-sells-for-5-8m/",
        date: "February 19, 2026",
      },
      {
        title: "Long-vacant Perfect Swing property sells for $5.8M",
        url: "https://www.normanokdevelopment.com/2026/02/19/long-vacant-perfect-swing-property-sells-for-5-8m/",
        date: "February 19, 2026",
      },
    ],
    planPdf: undefined,
  },
  {
    id: "chickfila-university-north-park",
    name: "Chick-fil-A — University North Park",
    address: "University North Park, Norman, OK",
    lat: 35.247138567836345,
    lng: -97.47966134944508,
    status: "planned",
    description:
      "Chick-fil-A filed a $4.5M permit for a sixth Norman location at University North Park.",
    articles: [
      {
        title: "Chick-fil-A Plans Sixth Norman Location in University North Park",
        url: "https://www.normanokdevelopment.com/2026/01/30/chick-fil-a-plans-sixth-norman-location-in-university-north-park/",
        date: "January 30, 2026",
      },
    ],
    planPdf: undefined,
  },
];
