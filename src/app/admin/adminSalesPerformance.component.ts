import { Component } from "@angular/core";
import * as FusionCharts from 'fusioncharts';

@Component({
    selector: 'app-adminsalesperformance',
    templateUrl: './adminSalesPerformance.component.html'
})

export class AdminSalesPerformanceComponent {
    dataSource: any;
    type: string;
    width: string;
    height: string;

    constructor() {
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
                        "value": "Sales Performance",
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