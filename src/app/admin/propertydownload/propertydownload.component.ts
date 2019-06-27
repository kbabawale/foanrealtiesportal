import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-propertydownload',
  templateUrl: './propertydownload.component.html',
  styleUrls: ['./propertydownload.component.css']
})
export class PropertydownloadComponent implements OnInit {
  hostURL:String = environment.apiUrl3;
  @Input() sourc;
  @Input() sourc2;
  src: string;
  private src$;

  dataUrl$;

  constructor(private http: HttpClient,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.src = this.hostURL+'property_documents/'+this.sourc2+'/'+this.sourc;
    this.src$ = new BehaviorSubject(this.src);
    this.dataUrl$ = this.src$.switchMap(url => this.loadImage(url));
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
