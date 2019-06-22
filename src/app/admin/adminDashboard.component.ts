import { Component,OnInit } from "@angular/core";
import * as FusionCharts from 'fusioncharts';
import { UserService } from '../_services/user.service';
import {User} from 'src/app/_models/user';

@Component({
    selector: 'app-adminDashboard',
    templateUrl: './adminDashboard.component.html'
})

export class AdminDashboardComponent {
    dataSource: any;
    type: string;
    width: string;
    height: string;

    user_details: User = {
        UserID: 0,
        FirstName: '',
        LastName: '',
        UserRole: 0,
        Email: '',
        Password: '',
        MaritalStatus: '',
        DOB: '',
        Nationality: '',
        Address: '',
        PhoneNumber: '',
        ProfilePix: "../../assets/img/avatar1.jpg",
        NokName: '',
        NokAddress: '',
        NokEmail: '',
        NokNumber: '',
        EmployerName: '',
        EmployerAddress: '',
        EmployerNumber: '',
        EmploymentPosition: '',
        ReferralName: '',
        ReferralNumber: '',
        ReferralAddress: '',
        ReferralEmail: '',
        DateCreated: '',
        DateModified: ''
    };

    constructor(private UserService:UserService) {
        this.type = 'timeseries';
        this.width = '100%';
        this.height = '300';
        this.dataSource = {
            data: null,
            "chart": {
                "showlegend": 0
            },
            "yaxis": [
                {
                    "plot": {
                        "value": "Daily Visitors",
                        "type": "column"
                    },
                    "format": {
                        "prefix": "NGN"
                    }
                }
            ]
        };
        this.fetchData();
    }

    ngOnInit() {
        
        //get all details of admin
        this.UserService.getUserDetails().subscribe(data=>{
            
            this.user_details.FirstName = data.user[0].firstname;
            this.user_details.LastName = data.user[0].lastname;
            
        });
    }


    fetchData() {
        var jsonify = res => res.json();
        var dataFetch = fetch("../../assets/json/metricsdata.json").then(jsonify);
        var schemaFetch = fetch("../../assets/json/metricsschema.json").then(jsonify);

        Promise.all([dataFetch, schemaFetch]).then(res => {
            const [data, schema] = res;
            // First we are creating a DataStore
            const fusionDataStore = new FusionCharts.DataStore();
            // After that we are creating a DataTable by passing our data and schema as arguments
            const fusionTable = fusionDataStore.createDataTable(data, schema);
            // Afet that we simply mutated our timeseries datasource by attaching the above
            // DataTable into its data property.
            this.dataSource.data = fusionTable;
        });
    }
}
