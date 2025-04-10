import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './Auth.service';
import { Pagination } from './InterfacesModels';
// import { DateTime } from 'luxon';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

type pType = 'Apartments' | 'Villas';
type subType = 'internal' | 'external';

export interface SHAIRED_DATA {
  type: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})


export class CommonApiService {
  protected baseUrl = environment.baseUrl;
  public STORAGE_KEY = environment.STORAGE_KEY;
  public env = environment;
  public queryString = '';
  private triggerInventory: Subject<boolean> = new Subject<boolean>();
  public $triggerInventory = this.triggerInventory.asObservable();

  private _todo = new BehaviorSubject<SHAIRED_DATA[]>([]);

  constructor(public http: HttpClient,private router: Router, private auth: AuthService) { }

  /**@GET_PROJECT_INFO */
  get getProjectInfo() {
    if (localStorage.getItem(`${this.STORAGE_KEY}/projectInfo`)) {
      return JSON.parse(this.auth.decryption(localStorage.getItem(`${this.STORAGE_KEY}/projectInfo`)));
    } else {
      return null;
    }
  }

    /**@method_inventory_first_time_loading_issue */

    trigger(value: boolean) {
      this.triggerInventory.next(value);
    }

  /**@GET_AUTH_DATA */
  get getAuthData() {
    return this.auth.getAuthData();
  }

  get getUserInfo() {
    return this.auth.getAuthData();
  }

    /**@ENCRYPTION_KEY */
    public encryption(ciphertext: any) {
      return CryptoJS.AES.encrypt(JSON.stringify(ciphertext), environment.SALT_SECRET).toString();
  }

      /**@GET_CURRENT_RIUTE_NAME */
      public getCurrentRouteName() {
        return this.router.url;
    }

        /**@CREATE_NEW_MESSAGE */
        createMessage(item: SHAIRED_DATA) {
          let obj: any = {};
          if (this._todo.value) {
              obj = this._todo.value;
          }
          obj[item.type] = item.data;
          this._todo.next(Object.assign([], obj));
          localStorage.setItem(environment.LOCATION_HISTORY, JSON.stringify(Object.assign({}, obj)));
      }
  

  /**@getAssignUnitDetails */
  getAssignUnitDetails(projectID: string, towerName: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getAssignUnitDetails/${projectID}?towerName=${towerName}`);
  }
  /**@GET_CityList (GET)*/
  getCityList() {
    return fetch('assets/Data/cityList.json').then(res => res.json())
      .then(json => { return json; });
    // return this.http.get(`${this.baseUrl}/project-info/states`);
  }




  /**@GET_ROLE_LIST */
  getRolesList() {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getRolesList`);
  }

  /**@SET_PASSWORD_FOR_TEAM (PUT)*/
  setPasswordTeam(id: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/set-password_team/${id}`, body);
  }

  /**@SET_PASSWORD_FOR_INSPECTOR_AND_VALIDATOR (PUT)*/
  setPasswordForInspectotAndValidator(id: string, body: any) {
    return this.http.put(`${this.baseUrl}/inspector-snagr/set-password/${id}`, body);
  }

  /**@SET_PASSWORD_FOR_CONTRACTOR (PUT)*/
  setPasswordForcontractor(id: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/set-password_contractor/${id}`, body);
  }

  /**@ADD_TEAM_MEMBERS */
  addTeamMembers(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/addProjectTeam`, body);
  }
  /**@EDIT_TEAM_LIST */
  editTeamMember(userId: string, reqBody: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/editProjectTeam/${userId}`, reqBody);
  }
  /**@ADD_NEW_USER_FOR_CONTRACTOR */
  addNewUserForContractor(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/addContractorsData`, body);
  }
  /**@EDIT_NEW_USER_FOR_CONTRACTOR */
  editUserForContractor(userId: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/editContractorsById/${userId}`, body);
  }

  /**@GET_EXTRENAL_TEAM_LIST */
  getExternalTeamList(type: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getExternalProjectTeamList?input=${type}`);
  }

  /**@GET_CONTRACTOR_CATEGORY */
  getContractorCategory(req: any) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getContractorCategoriesList?pageNo=${req.currentPage}&perPage=${req.perPage}`);
  }

/**@GET_PENDING_TASK_COUNT_USER_ROLE */
getPendingTaskListAndCountByUserRole(subType?: subType,searchQuery?:string) {
  let auth: any = this.getAuthData;
  let apiName = "";

  if (auth['role'] == 'Admin') {
    apiName = `pendingtaskListByAdminId/${auth['_id']}`
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/${apiName}${searchQuery || ''}`);
  }
  if (auth['role'] == 'Project Head') {
    apiName = `pendingtaskListForProjectHeadId/${auth['_id']}`
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/${apiName}${searchQuery || ''}`);
  } 
  
  if (auth['role'] == 'Internal QC Head') {
    apiName = `pendingTaskListForIQCId/${auth['_id']}`
  } else if (auth['role'] == 'Unit Incharge') {
    apiName = `pendingTaskListForUnitInchargeId/${auth['_id']}`
  } else if (auth['role'] == 'External QC Head') {
    apiName = `pendingtaskListForEQCId/${auth['_id']}`
  }
  return this.http.get(`${this.baseUrl}/projectinfo-snagr/${apiName}${searchQuery || ''}&subType=${subType}`);
}



  /**@GET_PENDING_TASK_LIST_USER_ROLE */
  getPendingTaskListByUserRole(projectId:string, towerName:string, subType:string) {
    let auth: any = this.getAuthData;
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getAllotUnitDetails/${projectId}?towerName=${towerName}&subType=${subType}&role=${auth['role']}&status=Pending`);
  }

  /**@DELETE_FOR_TEAM_DETAILS (DELETE)*/
  deleteUserForTeamDetail(id: string, type: string, role: string) {
    let api: string = "deleteProjectTeam";
    console.log(type, 'type');

    if (type == 'contractors') {
      api = "deleteContractor";
    } else if (role == 'Inspector' || role == 'Validator' || role == 'External Inspector' || role == 'External Validator') {
      api = "deleteInspector";
    }
    return this.http.delete(`${this.baseUrl}/projectinfo-snagr/${api}/${id}`);
  }

  /**@ADD_NEW_USER_FOR_CONTRACTOR */
  updateNewInspectorAndValidtor(formData: any, id: string) {
    return this.http.put(`${this.baseUrl}/inspector-snagr/editInspector/${id}`, formData);
  }

  /**@ADD_NEW_USER_FOR_CONTRACTOR */
  async addNewInspectorAndValidtor(formData: any) {
    return await this.fetchApiCall(formData, 'POST', 'inspector-snagr/addInspector');
  }


  async fetchApiCall(formData: any, method: string, apiName: string) {
    let token: any = this.auth.getAuthToken();
    const option: any = {
      method: method,
      headers: { 'Accept': 'application/json', Authorization: `Bearer ${(token ? token : '')}`, },
      body: formData
    };
    const response = await fetch(`${this.baseUrl}/${apiName}`, option);
    const statusCode = response.status;
    const data = await response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      ...res[1]
    }));
  }

  /**@GET_CONTRACT_BY_ID */
  getContractorDetailById(contractirId: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getPropertyByDetails/${contractirId}`);
  }

  /**@ADD_NEW_CONTRACT */
  addNewContract(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/addPropertyBasicDetails`, body);
  }

  /**@GET_CONTRACT_LIST */
  getContractList(req: any) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getPropertyBasicDetails?pageNo=${req.currentPage}&perPage=${req.perPage}`);
  }

  /**@EDIT_CONTRACT_LIST */
  editContractItem(contractId: string, reqBody: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/editPropertyDetails/${contractId}`, reqBody);
  }

  /**@DELETE_CONTRACT_LIST */
  deleteContractItem(contractId: string) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/suspendContract/${contractId}`, {});
  }


  /**@DELETE_USER_LIST */
  deleteUsers(email: any) {
    return this.http.get(`${this.baseUrl}/v1/user/delete/${email}`);
  }

  /**@GET_TOWER_UNIT_DETAIL_BY_ID */
  getTowerUnitDetailById(projectID: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getTowerUnitDetails/${projectID}`);
  }

  /**@GET_Villa_UNIT_DETAIL_BY_ID */
  getVillaUnitDetailById(projectID: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getTowerUnitDetails/${projectID}?input=Villas`);
  }

  /**@GET_PROJECT_TEAM_LIST (External QC Head Allocation) */
  getProjectTeamList(req: any) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getProjectTeamList?pageNo=${req.currentPage}&perPage=${req.perPage}`);
  }


  /**@GET_TEAM_LIST_BY_PROJECT_ID */
  getProjectTeamListByProjectId(req: Pagination, projectID: string) {
    const params = {
      pageNo: req.currentPage,
      perPage: req.perPage,
      
    };
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getProjectTeamListByProjectId/${projectID}`, { params });
  }

  /**@GET_EXTERNAL_QC_HEAD_ALLOCATION (GET) */
  getExternalQCHeadAllocation(id: string, towerName: string, subType: subType,req: Pagination,role:string) {
    let serchStr: string = ``;
    if (req.search) {
      if (req.search.towerName) serchStr += `&towerName=${req.search.towerName}`;
      if (req.search.unitType) serchStr += `&unitType=${req.search.unitType}`;
      if (req.search.projectHead) serchStr += `&projectHeadName=${req.search.projectHead}`;
      if (req.search.internalQCHead) serchStr += `&internalQcName=${req.search.internalQCHead}`;
      if (req.search.externalQCHead) serchStr += `&externalQcName=${req.search.externalQCHead}`;
      if (req.search.unitIncharge) serchStr += `&unitInchargeName=${req.search.unitIncharge}`;
      if(req.search.searchQuery) serchStr += `&search=${req.search.searchQuery}`;
    }
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getAllotUnitDetails/${id}?towerName=${towerName}&subType=${subType}${serchStr}&role=${role}`);
  }

  /**@GET_EXTERNAL_QC_HEAD_ALLOCATION_FOR_VILLA (GET) */
  getExternalQCHeadAllocationForVilla(id: string, blockName: string, projectType: string, subType: string,req: Pagination,role:string) {
    let serchStr: string = ``;
    if (req.search) {
      if (req.search.towerName) serchStr += `&towerName=${req.search.towerName}`;
      if (req.search.unitType) serchStr += `&unitType=${req.search.unitType}`;
      if (req.search.projectHead) serchStr += `&projectHead=${req.search.projectHead}`;
      if (req.search.internalQCHead) serchStr += `&internalQCHead=${req.search.internalQCHead}`;
      if (req.search.externalQCHead) serchStr += `&externalQCHead=${req.search.externalQCHead}`;
      if (req.search.unitIncharge) serchStr += `&unitIncharge=${req.search.unitIncharge}`;
      if(req.search.searchQuery) serchStr += `&search=${req.search.searchQuery}`;
    }
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getAllotUnitDetails/${id}?blockName=${blockName}&projectType=${projectType}&subType=${subType}${serchStr}&role=${role}`);
  }

  /**@ADD_EXTERNAL_QC_HEAD_ALLOCATION (POST)*/
  addExternalQCHeadAllocation(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/unitAllotProjectHead`, body);
  }

  /**@UPDATE_EXTERNAL_QC_HEAD_ALLOCATION (PUT)*/
  updateExternalQCHeadAllocation(id: string, towerName: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/updateUnitAllot/${id}/${towerName}`, body);
  }

  getInventoryDetails(projectId: string, search: any, req: Pagination) {
    console.log(search, 'search@');
    let auth: any = this.getAuthData;
    let apiName = "";

    let serchStr: string = `?`;
    if (search && (search.status || search.tower || search.block || search.subType || search.input || search.unitType)) {
      if (search.status) serchStr += `&status=${search.status}`;
      if (search.tower) serchStr += `&towerName=${search.tower}`;
      if (search.block) serchStr += `&towerName=${search.block}`;
      if (search.subType) serchStr += `&subType=${search.subType}`;
      if (search.unitType) serchStr += `&unitType=${search.unitType}`;
      if(req.search.searchQuery) serchStr += `&search=${req.search.searchQuery}`;

      if (search.input == '' || search.input == 'All') {
        if (search.input) serchStr += `&input=${search.input}`;
        // if (search.subType) serchStr += `&subType=${search.subType}`;
      } else {
        if (search.input) serchStr += `&status=${search.input}`;
      }
    }
    if (auth['role'] == 'Unit Incharge') {
      apiName = `getInventoryDetails1`
    }else{
      apiName = `getInventoryDetails`
    }
    // return this.http.get(`${this.baseUrl}/projectinfo-snagr/${apiName}/${projectId}${serchStr}&pageNo=${req.currentPage}&perPage=${req.perPage}`)
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getInventoryDetails/${projectId}${serchStr}&pageNumber=${req.currentPage}&perPage=${req.perPage}`);
  }

  /**@checkInvoiceNoIsValid (POST)*/
  checkInvoiceNoIsValid(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/checkInvoiceNo`, body);
  }

  /**@CHECK_DUPLICATE_EMAIL (POST)*/
  checkEmailIsDuplicateOrNot(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/checkAdmin/`, body);
  }

  /**@UPLOAD_FILES */
  async uploadAnyFile(file: File) {
    const formData: FormData = new FormData();
    formData.append("upload_file", file);
    const option: any = {
      method: 'POST',
      headers: { 'Accept': 'multipart/form-data' },
      body: formData
    };
    const response = await fetch(`${environment.fileUploadUrl}`, option);
    const statusCode = response.status;
    const data = await response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      ...res[1]
    }));
  }

  private subTypeSource = new BehaviorSubject<string | null>(null);
  subType$ = this.subTypeSource.asObservable();

  setSubType(subType: string) {
    this.subTypeSource.next(subType);
  }

  getTemaInventoryDetails(projectId: string, search: any) {
    let serchStr: string = `?`;
    if (search) {
      if (search.status) serchStr += `&status=${search.status}`;
      if (search.tower) serchStr += `&towerName=${search.tower}`;
      if (search.block) serchStr += `&blockName=${search.block}`;
      if (search.input == '' || search.input == 'All') {
        if (search.input) serchStr += `&input=${search.input}`;
        if (search.subType) serchStr += `&subType=${search.subType}`;
      } else {
        if (search.input) serchStr += `&status=${search.input}`;
        if (search.subType) serchStr += `&subType=${search.subType}`;
      }
      if (search.projectId) serchStr += `&projectId=${search.projectId}`
    }

    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getOverallSummaryData_team${serchStr}`);
  }



  /**@GET_CONTRACTOR_CATEGORY */
  getContractorsListByProjectid(req: any, projectID: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getContractorsListByProjectid/${projectID}?pageNo=${req.currentPage}&perPage=${req.perPage}`);
  }

  /**@Change_PASSWORD */
  changePassword(userId: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/change-password/${userId}`, body);
  }

  /**
   * @DOWNLOAD any thing
   * @param GET_API_DOWNLOAD_USING_NODE_JS  - The form group to touch
  */
  downloadExcel(parms: any, cityShortName: string) {
    const baseUrl = `${this.baseUrl}/user/getSheets/${cityShortName}?${parms}`;
    const aElement = document.createElement('a');
    const rand = Math.floor(Math.random() * 99999);
    aElement.setAttribute('download', `${rand}_csv_enq.xlsx`);
    const href = baseUrl;
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
  }




  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
  */
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Marks all controls in a form group as unTouched, reset & remove error
   * @param formGroup - The form group to touch
  */
  markUnTouchedAndReset(formGroup: FormGroup) {
    formGroup.reset();
    formGroup.markAsPristine({ onlySelf: true });
    formGroup.markAsUntouched({ onlySelf: true });
    (<any>Object).keys(formGroup.controls).map((field: any) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.setErrors(null);
      }
    });
  }

  /**
   * @DOWNLOAD any thing
   * @param GET_API_DOWNLOAD_USING_BLOB  - The form group to touch
  */
  downloadExcelusingBlob(parms: any, cityShortName: string) {
    const baseUrl = `${this.baseUrl}/user/getSheets/${cityShortName}?${parms}`;
    fetch(baseUrl, { method: 'get', headers: new Headers({ 'Content-Type': 'application/json' }), mode: 'no-cors', referrerPolicy: 'no-referrer' })
      .then(res => res.blob())
      .then(res => {
        const aElement = document.createElement('a');
        const rand = Math.floor(Math.random() * 99999);
        aElement.setAttribute('download', `${rand}_csv_enq.xlsx`);
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);
      });
  }

  sortArrayByKey(data: any, sortKeyName: any) {
    if (data && data.length) {
      return data.sort((a: any, b: any) => {
        // Check if either name is null
        if (a[sortKeyName] === null && b[sortKeyName] !== null) return 1;
        if (a[sortKeyName] !== null && b[sortKeyName] === null) return -1;
        if (a[sortKeyName] === "" && b[sortKeyName] !== "") return 1;
        if (a[sortKeyName] !== "" && b[sortKeyName] === "null") return -1;

        // If both key are null or both are non-null, proceed with comparison
        if (!isNaN(a[sortKeyName]) && !isNaN(b[sortKeyName])) {
          return a[sortKeyName] - b[sortKeyName];
        } else {
          if (a[sortKeyName] && b[sortKeyName]) {
            const itemA = a[sortKeyName].toLowerCase();
            const itemB = b[sortKeyName].toLowerCase();
            if (itemA < itemB) return -1;
            if (itemA > itemB) return 1;
          }
        }
        return 0; // key are equal
      });
    } else {
      return data;
    }
  }


  /**
   * @DOWNLOAD any thing
   * @param GET_API_DOWNLOAD_USING_NODE_JS  - The form group to touch
  */
  async downloadFileFromLink(uri: string) {
    let url = `${environment.baseUrl}/projectinfo-snagr/proxy?image=${uri}`;
      try {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) throw new Error('Network response was not ok');
        
        const blob = await response.blob();
        const _url = URL.createObjectURL(blob);

        const matches = uri.match(/\/([^\/?#]+)[^\/]*$/); // Matches the last segment of the URL path
        let fileName=matches ? matches[1] : 'image.png';
        
        // Create an anchor element and trigger the download
        const aElement = document.createElement('a');
        aElement.href = _url;
        aElement.download = fileName; // Set the desired file name
        document.body.appendChild(aElement);
        aElement.click();
        document.body.removeChild(aElement);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
  }
  
}