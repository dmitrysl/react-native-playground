"use strict";var __decorate=this&&this.__decorate||function(e,t,r,o){var n,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(i<3?n(s):i>3?n(t,r,s):n(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},core_1=require("@angular/core"),http_1=require("@angular/http");require("rxjs/add/operator/toPromise");var mock_heroes_1=require("./mock-heroes"),HeroService=function(){function e(e){this.http=e,this.heroesUrl="app/heroes"}return e.prototype.getHeroes=function(){return this.http.get(this.heroesUrl).toPromise().then(function(e){return e.json().data}).catch(this.handleError)},e.prototype.getHeroesSlowly=function(){return new Promise(function(e){return setTimeout(function(){return e(mock_heroes_1.HEROES)},2e3)})},e.prototype.getHero=function(e){return this.getHeroes().then(function(t){return t.find(function(t){return t.id===e})})},e.prototype.save=function(e){return e.id?this.put(e):this.post(e)},e.prototype.delete=function(e){var t=new http_1.Headers;t.append("Content-Type","application/json");var r=this.heroesUrl+"/"+e.id;return this.http.delete(r,{headers:t}).toPromise().catch(this.handleError)},e.prototype.post=function(e){var t=new http_1.Headers({"Content-Type":"application/json"});return this.http.post(this.heroesUrl,JSON.stringify(e),{headers:t}).toPromise().then(function(e){return e.json().data}).catch(this.handleError)},e.prototype.put=function(e){var t=new http_1.Headers;t.append("Content-Type","application/json");var r=this.heroesUrl+"/"+e.id;return this.http.put(r,JSON.stringify(e),{headers:t}).toPromise().then(function(){return e}).catch(this.handleError)},e.prototype.handleError=function(e){return console.error("An error occurred",e),Promise.reject(e.message||e)},e=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[http_1.Http])],e)}();exports.HeroService=HeroService;
//# sourceMappingURL=hero.service.js.map