export class AutocompleteModel{
  key:string = "";
  existingIds?:Array<number> = new Array<number>(0);

  constructor(key:string, existingIds?:Array<number>) {
      this.existingIds = existingIds;
      this.key = key;
  }
}
