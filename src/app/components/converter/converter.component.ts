import { OnInit, Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { InputValidator } from "../../validators/inputValidator";
import { ConversionService } from "../../services/conversion.service";

@Component({
  selector: "app-converter",
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: "./converter.component.html",
  styleUrl: "./converter.component.scss",
})
export class ConverterComponent implements OnInit {
  constructor() {}
  private fb: FormBuilder = inject(FormBuilder);
  private cs: ConversionService = inject(ConversionService);
  private router: Router = inject(Router);
  public showError: boolean = false;

  converterForm = this.fb.group({
    numberToConvert: ["", [InputValidator()]],
  });

  ngOnInit() {}

  convert() {
    const numToConvert = this.converterForm
      .get("numberToConvert")
      .value.toLowerCase();

    if (this.checkErrors(numToConvert)) {
      return;
    }

    this.cs.createConversion(numToConvert);

    this.router.navigate(["/results"]);
  }

  checkErrors(numToConvert: string): boolean {
    if (numToConvert === "") {
      this.converterForm.setErrors({ isBlank: true });
      return true;
    }

    if (this.converterForm.get("numberToConvert")?.hasError("invalidFormat")) {
      return true;
    }
    return false;
  }
}
