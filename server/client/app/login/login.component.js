"use strict";var __decorate=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},core_1=require("@angular/core"),router_1=require("@angular/router"),index_1=require("../services/index"),LoginComponent=function(){function e(e,t){this.router=e,this.authenticationService=t,this.model={},this.loading=!1,this.error=""}return e.prototype.ngOnInit=function(){this.authenticationService.logout()},e.prototype.login=function(){var e=this;this.loading=!0,this.authenticationService.login(this.model.username,this.model.password).subscribe(function(t){console.warn(t),e.loading=!1,t.success===!0?e.router.navigate(["/"]):(e.error="Username or password is incorrect",e.loading=!1)})},e=__decorate([core_1.Component({templateUrl:"app/login/login.component.html"}),__metadata("design:paramtypes",[router_1.Router,index_1.AuthenticationService])],e)}();exports.LoginComponent=LoginComponent;
//# sourceMappingURL=login.component.js.map
