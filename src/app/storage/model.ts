
export class WikiPage {
  public lastEdited:number;

  constructor(
      public title:string,
      public content:string,
      public x:number,
      public y:number,
      public width:number,
      public height:number) {
  }

}
