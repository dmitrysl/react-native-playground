"use strict";var __decorate=this&&this.__decorate||function(t,e,r,n){var o,a=arguments.length,c=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,n);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(c=(a<3?o(c):a>3?o(e,r,c):o(e,r))||c);return a>3&&c&&Object.defineProperty(e,r,c),c},__metadata=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},core_1=require("@angular/core"),http_1=require("@angular/http"),AuthenticationService=function(){function t(t){this.http=t;var e=JSON.parse(localStorage.getItem("currentUser"));this.token=e&&e.token}return t.prototype.login=function(t,e){var r=this;return console.warn(arguments),this.http.post("/api/auth/login",{login:t,pass:e}).map(function(e){console.warn(e);var n=e.json();if(!n||!n.success)return alert(n.message),{success:!1};var o=n.token;return o?(r.token=o,localStorage.setItem("currentUser",JSON.stringify({username:t,token:o})),n):n})},t.prototype.logout=function(){this.token=null,localStorage.removeItem("currentUser")},t=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[http_1.Http])],t)}();exports.AuthenticationService=AuthenticationService;
//# sourceMappingURL=authentication.service.js.map