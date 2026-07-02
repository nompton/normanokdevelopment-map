// ─── ADD / EDIT DEVELOPMENT SITES HERE ───────────────────────────────────────
//
// status options: "proposed" | "planned" | "under-construction" | "completed" | "cancelled"
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
