import { Injectable } from '@angular/core';
// import * as _moment from 'moment-timezone';
import { DateTime } from "luxon";

@Injectable({
  providedIn: 'root',
})
export class LocalTimeZoneService {

  constructor() { 
    this.setDefaultTimezone();
  }

  setDefaultTimezone(){
    // DateTime.now().setZone("America/New_York").minus({ weeks: 1 }).endOf("day").toISO();
    DateTime.now().setZone('Asia/Kolkata');
    // DateTime.now().setDefault('Asia/Kolkata');
  }
}
