import { NgModule } from "@angular/core";
import { LoaderComponent } from "./utility/loader/loader.component";

@NgModule({
    declarations: [
        LoaderComponent
    ],
    exports: [
        LoaderComponent
    ]
})
export class SharedModule {

}