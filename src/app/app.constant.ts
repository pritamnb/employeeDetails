export class VALIDATORS {
  static NAME = '^([a-zA-Z]{3,255})+$';
  static PHONE = '^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$';
  static CITY = '^([a-zA-Z]{3,255})+$';
  static ADDRESS = /^[a-zA-Z0-9\s,'-]*$/;
  static POSTAL_CODE = '^[1-9][0-9]{5}$';
}
