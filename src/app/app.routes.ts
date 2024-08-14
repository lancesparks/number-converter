import { Routes } from "@angular/router";
import { DataGuard } from "./guards/data.guard";

export const routes: Routes = [
  {
    path: "converter",
    loadComponent: () =>
      import("./components/converter/converter.component").then(
        (m) => m.ConverterComponent
      ),
  },
  {
    path: "results",
    loadComponent: () =>
      import("./components/results/results.component").then(
        (m) => m.ResultsComponent
      ),
    canActivate: [DataGuard],
  },
  { path: "", redirectTo: "/converter", pathMatch: "full" },
  { path: "**", redirectTo: "/converter", pathMatch: "full" },
];
