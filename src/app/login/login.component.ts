import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { environment } from '../../environments/environment';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private hide: boolean;
    private apiUrl: string;
    private form: FormGroup;
    private formSubmitAttempt: boolean;

    constructor(private fb: FormBuilder, private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.hitDashboardIfLoggedIn();

        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.hide = true;
        this.apiUrl = environment.apiUrl;
    }


    onSubmit() {
        if (this.form.valid) {
            this.authService.login(this.form.value, (message: string) => {
                console.log(message);
            });
        }
        this.formSubmitAttempt = true;
    }

    isFieldInvalid(field: string) {
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

}

