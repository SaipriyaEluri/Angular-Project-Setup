export const environment = {
  production: true,
  fileUploadUrl: 'https://images.propcheck.in/uploadfiles.php',
  
  baseUrl: 'https://dcfapi.propright.in/api/v1.0',// PROD server,
 
  STORAGE_KEY: '@PROPCHK_SNAG3R_STORAGE',
  emailPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  mobilePattern: /^[0]?[1234567890]\d{9}$/,
  SALT_SECRET: '@SANG3R!DEC_2023~',
  LOCATION_SESSION_KEY: '@SNAG3R_LOC_SESSION',
  LOCATION_HISTORY: '@SNAG3R_LOC_SESSION',
  REFRESH_TOKEN_TIME: '@REFRESH_TOKEN_TIME',
  WINDOW_HASH : '/b2b/#',
};