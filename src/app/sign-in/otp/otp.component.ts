import { AuthService } from './../../services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {

  @Input() phone;
  isLoading = false;
  otp: string;
  config = {
    length: 6,
    allowNumbersOnly: true,
    inputClass: 'otp-input-style'
  };

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private auth: AuthService
    ) { }

  ngOnInit() {}

  showLoader(msg) {
    if(!this.isLoading) this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      })
    })
    .catch(e => {
      this.isLoading = false;
      console.log(e);
    })
  }

  hideLoader() {
    if(this.isLoading) this.isLoading = false;
    return this.loadingCtrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log(e));
  }

  onOtpChange(event) {
    this.otp = event;
    console.log(this.otp);
  }

  async resend() {
    try {
      const response = await this.auth.signInWithPhoneNumber('+91' + this.phone);
      console.log(response);       
    } catch(e) {
      console.log(e);
    }
  }

  async verifyOtp() {
    try {
      const response = await this.auth.verifyOtp(this.otp);
      console.log(response);       
    } catch(e) {
      console.log(e);
    }
  }

}
