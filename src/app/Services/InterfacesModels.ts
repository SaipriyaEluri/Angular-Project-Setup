export interface FtpData {
    sno: number;
    name: string;
    url: string;
    port: number;
    username: string;
    folder: string;
    profiletype: string;
    filename: string;
    createdbyuser: string;
    modifiedbyuser: string;
    createdat: string;
    modifiedat: string;
    assigned: boolean;
  }

export interface NewUserModel {
    userName: string;
    phone: string;
    email: string;
    address: any;
    userRole: string;
    _id?: string
}

export interface GetUserModel {
    userName: string;
    phone: string;
    email: string;
    address: any;
    addressName: any;
    managerId: any;
    managerName: any;
    userRole: string;
    userRoleId: number;
    status: string;
    role?:string;
    createdAt: Date;
    updatedAt: Date;
    _id: string;
}

export interface AuthUserModel {
    role: string;
    status: string;
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    passwordLastUpdate: Date;
    token: string;
    inspectionType: string;
    phone: string;
    projectId: string;
    projectName: string;
    projectType: string;
    roleId: number;
    designation: string;
    teamType? : string;
}


export interface Pagination {
    currentPage: number;
    totalLength: number;
    perPage: number;
    search?: any;
}

export interface ContractCategoryModel {
    contractorCompany: string;
    definitionOfWork: string;
    contractorId?: number;
}

export interface ContractModel {
    location: Location;
    capturePayment: CapturePayment;
    developerName: string;
    projectName: string;
    projectType: string;
    reraRegNo: string;
    city: string;
    address: string;
    spocName: string;
    spocEmail: string;
    spocPhone: string;
    size: number;
    villaSize: number;
    _id: string;
    developerLogo: string;
    projectLaunchDate: Date;
    projectEstimatedCompletionDate: Date;
    noOfUnits: number;
    noOfUnitsVilla: number;
    inspectionType: string;
    inspectionRatePerSqft: number;
    rateForaddOn: number;
    thresholdScore: number;
    propertyType: string;
    totalContractValue: number; /**@FOR_APARTMENT */
    totalContractValueVilla: number;
    amountLocked: number;
    balance: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CapturePayment {
    amountPaid: number;
    paidDate: Date;
    invoice: string;
}

export interface Location {
    coordinates: number[];
    type: string;
}


// TOWER DETAILS START
export interface TowerDetails {
    totalNoOfTowers: number;
    tower: Tower[];
}

export interface Tower {
    towerName: string;
    noOfFloors: number;
    unitsPerFloor: number;
    firstHabitableFloor: number;
    refusableFloors: number[];
}
// TOWER DETAILS END



/**
 * ==========================================================
 *                      @FOR_DATA_MANAGEMENT 
 * ==========================================================
*/

export interface DataManagement {
    spaceType?: string;
    quality: Brand[];
    brand: Brand[];
    material: Brand[];
    dimension: Brand[];
}

export interface Brand {
    list: string[];
    fieldType: FieldType;
    status: Status;
    _id: string;
    item: string;
    space: Space;
    inspectionFor: InspectionFor;
    issueType: IssueType;
    createdDate: Date;
    updatedDate: Date;
    reason?: Reason;
}
export type FieldType = "" | "singleField" | "lengthBreadth";
export type InspectionFor = "brand" | "dimension" | "material" | "quality";
export type IssueType = "Minor" | "Major" | "Cosmetic";
export interface Reason {
    "Not Satisfactory": string[];
    "Partially Satisfactory": any[];
}
export type Space = "bedroom";
export type Status = "Active";


/**
 * ==========================================================
 *                      @FOR_TEAM_SETUP 
 * ==========================================================
*/

export interface TeamSetupModel {
    _id: string;
    projectName: string;
    projectId: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    designation: string;
    password: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * =====@External_QC_Head_Allocation 
*/

export interface ExternalQCHeadAllocation {
    _id: string;
    name: string;
    designation: string;
    role: string;
    email: string;
    phone: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
    status: string;
}

/**
 * =====@External_QC_Head_Allocation 
*/

export interface AllUsersHeadAllocation {
    _id: string;
    name: string;
    designation: string;
    role: string;
    email: string;
    phone: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    count:number;
}


export interface AssignUnitForSnaggingModel {
    unitPaid: string;
    _id: string;
    projectName: string;
    projectId: string;
    towerName: string;
    floorName: string;
    floorNumber: number;
    unitNumber: string;
    unitType: string;
    externalQcId: string;
    externalQcName: string;
    projectHeadId: string;
    projectHeadName: string;
    internalQcId: string;
    internalQcName: string;
    unitInchargeId: string;
    unitInchargeName: string;
    inspectorId: null;
    inspectorName: null;
    validatorId: null;
    reInspectorId: string;
    reInspectorName: string;
    inspectionDate: string;
    status: string;
    readyForInspection: string;
    readyForExternalInspection: string;
    isReadyForExternalInspection:string;
    isReadyForInspection:string;
    isReadyForExternalReInspection:string;
    isReadyForInternalReInspection:string;
    createdAt: Date;
    updatedAt: Date;
}

export interface StatusOfDefectsModel {
    defectId: string;
    issue: string;
    severity: string;
    photo: string;
    validation: string;
    comments: StatusOfDefectCommentsModel[];
    inspectionType?: any;
    sideBand?: any;
    pictures?: any;
    issueId: any;
    item: any;
    defectsAssigned: string;
    unitInchargeId: string;
    isDefectRejectedByInqc: string;
    isUIAccepted: string;
    inqcId: string;
    count?: any;
    subType: string;
    issueScore?:any;
    issueScoreValue?:any;
    isReInspStatus?:any;
    inspectionTypes?:any;
    reAssignedCount?:any;
    isClicked?:any;
    defectCategory:any;
    defectReviewByUi:any;
    defectReviewByUiDate:any;
    criticalItem:any;
    defectReviewByIqcDate:any
}


export interface DefectAssigneContractorsModel {
    projectId: string;
    projectName: string;
    propertyId: string;
    towerName: string;
    unitNumber: string;
    unitType: string;
    inspectionNumber: string;
    defectId: string;
    issue: string;
    severity: string;
    photo: string;
    validation: string;
    comments: StatusOfDefectCommentsModel[];
    inspectionTypes: any;
    sideBand: any;
    pictures: any;
    issueId: any;
    item: any;
    defectsAssigned: string;
    contractors: contractorsModel[];
    dependency: string;
    finalStatus: string;
    tempFinalStatus?:string;
    issueScore?: any,
    issueScoreValue?: any;
    isReInspStatus?:any;
    isManuallyApproved?:any;
    isManual?:any
}

export interface StatusOfDefectCommentsModel {
    commentText: string;
    userName: string;
    userId: string;
    userRole: string;
    createdAt: number;
    isEdited: boolean;
}
export interface contractorsModel {
    contractorName: string;
    contractorId: string;
    role: string;
    startDate: Date;
    endDate: Date;
    proof: any[];
    status: string;
}

export interface InspectionTypeModel {
    key: string;
    val: string;
}

export type SubType = 'internal' | 'external';