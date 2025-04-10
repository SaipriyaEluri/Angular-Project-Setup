import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Pagination } from './InterfacesModels';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  protected baseUrl = environment.baseUrl;
  public STORAGE_KEY = environment.STORAGE_KEY;
  public env = environment;
  public queryString = '';
  constructor(public http: HttpClient, private auth: AuthService) { }


  /**@GET_USER_INFO */
  get getUserInfo() {
    return this.auth.getAuthData();
  }

  /**@GET_PROJECT_INFO */
  get getProjectInfo() {
    if (localStorage.getItem(`${environment.STORAGE_KEY}/projectInfo`)) {
      return JSON.parse(this.auth.decryption(localStorage.getItem(`${environment.STORAGE_KEY}/projectInfo`)));
    } else {
      return null;
    }
  }

  /**@ADD_TEAM_MEMBERS */
  addTeamMembers(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/addProjectTeam`, body);
  }

  /**@GET_TEAM_LIST */
  getTeamList(req: Pagination) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getProjectTeamList?pageNo=${req.currentPage}&perPage=${req.perPage}`);
  }

  /**@GET_TEAM_LIST_BY_PROJECT_ID */
  getProjectTeamListByProjectId(req: Pagination, projectID: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getProjectTeamListByProjectId/${projectID}?pageNo=${req.currentPage}&perPage=${req.perPage}`);
  }

  /**@EDIT_TEAM_LIST */
  editTeamMember(userId: string, reqBody: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/editProjectTeam/${userId}`, reqBody);
  }

  /**@GET_ROLE_LIST */
  getRolesList() {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getRolesList`);
  }

  /**@GET_CONTRACTOR_CATEGORY */
  getContractorCategory(req: any) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getContractorCategoriesList?pageNo=${req.currentPage}&perPage=${req.perPage}`);
  }

  /**@GET_CONTRACTOR_CATEGORY */
  getContractorsListByProjectid(req: any, projectID: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getContractorsListByProjectid/${projectID}?pageNo=${req.currentPage}&perPage=${req.perPage}`);
  }

  /**@GET_CONTRACTOR_LIST */
  getContractorList() {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getContractorsList`);
  }

  /**@GET_EXTRENAL_TEAM_LIST */
  getExternalTeamList(type: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getExternalProjectTeamList?input=${type}`);
  }

  /**@ADD_NEW_USER_FOR_CONTRACTOR */
  addNewUserForContractor(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/addContractorsData`, body);
  }


  /**@EDIT_NEW_USER_FOR_CONTRACTOR */
  editUserForContractor(userId: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/editContractorsById/${userId}`, body);
  }

  /**@SET_PASSWORD_FOR_TEAM (PUT)*/
  setPasswordTeam(id: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/change-password/${id}`, body);
  }

  /**@SET_PASSWORD_FOR_INSPECTOR_AND_VALIDATOR (PUT)*/
  setPasswordForInspectotAndValidator(id: string, body: any) {
    return this.http.put(`${this.baseUrl}/inspector-snagr/set-password/${id}`, body);
  }

  /**@SET_PASSWORD_FOR_CONTRACTOR (PUT)*/
  setPasswordForcontractor(id: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/set-password_contractor/${id}`, body);
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

  /**@GET_PAYMENT_DETAILS (GET)*/
  getPaymentDetails(id: string, req: Pagination, projectType: string) {
    let serchStr: string = `?pageNo=${req.currentPage}&perPage=${req.perPage}`;
    if (req.search) {
      // if (req.search.input) serchStr += `&input=${req.search.input}`;
      if (req.search.towerName) serchStr += `&towerName=${req.search.towerName}`;
      if (req.search.unitType) serchStr += `&unitType=${req.search.unitType}`;
      if (req.search.blockName) serchStr += `&blockName=${req.search.blockName}`;
      if (req.search.villaType) serchStr += `&villaType=${req.search.villaType}`;
      if (req.search.startDate && req.search.endDate) serchStr += `&startDate=${req.search.startDate}&endDate=${req.search.endDate}`;
      if(req.search.searchQuery) serchStr += `&search=${req.search.searchQuery}`;
    }
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getPaymentDetails/${id}${serchStr}&projectType=${projectType}`);
  }

 

  /**@CREATE_PAYMENT_DETAILS (POST)*/
  createPaymentDetails(body: any) {
    return this.http.post(`${this.baseUrl}/projectinfo-snagr/createPaymentDetails`, body);
  }

  /**@EDIT_PAYMENT_DETAILS (PUT)*/
  editPaymentDetails(id: string, body: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/editPaymentDetails/${id}`, body);
  }

  getInventoryDetails(projectId: string, search: any) {
    let serchStr: string = ``;
    if (search) {
      if (search.status) serchStr += `?status=${search.status}`;
      if (search.tower) serchStr += `?towerName=${search.tower}`;
    }
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getInventoryDetails/${projectId}${serchStr}`);
  }

  /**@GET_TOWER_UNIT_DETAIL_BY_ID */
  getTowerUnitDetailById(projectID: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getTowerUnitDetails/${projectID}`);
  }

  /**@GET_Villa_UNIT_DETAIL_BY_ID */
  getVillaUnitDetailById(projectID: string) {
    return this.http.get(`${this.baseUrl}/projectinfo-snagr/getTowerUnitDetails/${projectID}?input=Villas`);
  }

  //     /**@ADD_NEW_USER_FOR_CONTRACTOR */
  // addNewInspectorAndValidtor(body: any) {
  //   return this.http.post(`${this.baseUrl}/inspector-snagr/addInspector`, body);
  // }

  /**@ADD_NEW_USER_FOR_CONTRACTOR */
  async addNewInspectorAndValidtor(formData: any) {
    return await this.fetchApiCall(formData, 'POST', 'inspector-snagr/addInspector');
  }

  /**@ADD_NEW_USER_FOR_CONTRACTOR */
  updateNewInspectorAndValidtor(formData: any, id: string) {
    return this.http.put(`${this.baseUrl}/inspector-snagr/editInspector/${id}`, formData);
  }

  /**@EDIT_CONTRACT_LIST */
  editContractItem(contractId: string, reqBody: any) {
    return this.http.put(`${this.baseUrl}/projectinfo-snagr/editPropertyDetails/${contractId}`, reqBody);
  }

  /**@ADD_NEW_USER_FOR_CONTRACTOR */

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

    /**@checkInvoiceNoIsValid (POST)*/
    checkInvoiceNoIsValid(body: any) {
      return this.http.post(`${this.baseUrl}/projectinfo-snagr/checkInvoiceNo`, body);
    }

    downloadExcelSheet(projectId: any) {
      const url = `${this.baseUrl}/projectinfo-snagr/excel/${projectId}`;
      return this.http.get<any>(url); // No responseType needed since we expect JSON
    }

    downloadPdfSheet(projectId: any) {
      const url = `${this.baseUrl}/projectinfo-snagr/pdf/${projectId}`;
      return this.http.get<any>(url); 
    }
  
  
}