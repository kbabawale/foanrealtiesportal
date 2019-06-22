import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-propertyimage',
  templateUrl: './propertyimage.component.html',
  styleUrls: ['./propertyimage.component.css']
})
export class PropertyimageComponent implements OnInit {
  hostURL:String = environment.apiUrl2;
  @Input() sourc;
  @Input() sourc2;
  src: string;
  
  private src$;

  dataUrl$;

  constructor(private http: HttpClient,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.src = this.hostURL+this.sourc+'/'+this.sourc2;
    this.src$ = new BehaviorSubject(this.src);
    this.dataUrl$ = this.src$.switchMap(url => this.loadImage(url));
    
    //console.log(this.src, 'Source');
  }

  ngOnChanges(){
    //this.src$.next(this.src);
  }

  private loadImage(url: string): Observable<any> {
    // let headers = new HttpHeaders({
    //     'Foan-Token': localStorage.getItem('FRLS').toString()
    // });
    return this.http
    // load the image as a blob
    .get(url, {responseType: 'blob'})
    // create an object url of that blob that we can use in the src attribute
    .map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
  }

}
