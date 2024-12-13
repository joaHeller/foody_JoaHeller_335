"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8660],{8660:(M,u,o)=>{o.r(u),o.d(u,{SettingsPage:()=>S});var g=o(467),i=o(8942),l=o(8254);const c=(0,o(7464).F3)("Network",{web:()=>o.e(3780).then(o.bind(o,3780)).then(s=>new s.NetworkWeb)});var r=o(4341),t=o(4438);let S=(()=>{var s;class h{constructor(){this.darkMode=!1,this.notifications=!1,this.connectionStatus="Checking..."}ngOnInit(){var n=this;return(0,g.A)(function*(){yield n.loadSettings(),yield n.checkNetworkStatus(),n.setupNetworkListener()})()}loadSettings(){var n=this;return(0,g.A)(function*(){const{value:e}=yield l.p.get({key:"darkMode"});n.darkMode="true"===e,document.body.classList.toggle("dark",n.darkMode)})()}toggleDarkMode(){var n=this;return(0,g.A)(function*(){yield l.p.set({key:"darkMode",value:String(n.darkMode)}),document.body.classList.toggle("dark",n.darkMode)})()}toggleNotifications(){var n=this;return(0,g.A)(function*(){yield l.p.set({key:"notifications",value:String(n.notifications)})})()}checkNetworkStatus(){var n=this;return(0,g.A)(function*(){const e=yield c.getStatus();n.connectionStatus=e.connected?"Online":"Offline"})()}setupNetworkListener(){c.addListener("networkStatusChange",n=>{this.connectionStatus=n.connected?"Online":"Offline"})}}return(s=h).\u0275fac=function(n){return new(n||s)},s.\u0275cmp=t.VBU({type:s,selectors:[["app-settings"]],standalone:!0,features:[t.aNF],decls:23,vars:3,consts:[[3,"ngModelChange","ionChange","ngModel"]],template:function(n,e){1&n&&(t.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),t.EFF(3,"Einstellungen"),t.k0s()()(),t.j41(4,"ion-content")(5,"ion-list")(6,"ion-item")(7,"ion-label"),t.EFF(8,"Dark Mode"),t.k0s(),t.j41(9,"ion-toggle",0),t.mxI("ngModelChange",function(a){return t.DH7(e.darkMode,a)||(e.darkMode=a),a}),t.bIt("ionChange",function(){return e.toggleDarkMode()}),t.k0s()(),t.j41(10,"ion-item")(11,"ion-label")(12,"h2"),t.EFF(13,"Netzwerk Status"),t.k0s(),t.j41(14,"p"),t.EFF(15),t.k0s()()(),t.j41(16,"ion-item")(17,"ion-label")(18,"h2"),t.EFF(19,"Push-Benachrichtigungen"),t.k0s(),t.j41(20,"p"),t.EFF(21,"Neue Restaurants in der N\xe4he"),t.k0s()(),t.j41(22,"ion-toggle",0),t.mxI("ngModelChange",function(a){return t.DH7(e.notifications,a)||(e.notifications=a),a}),t.bIt("ionChange",function(){return e.toggleNotifications()}),t.k0s()()()()),2&n&&(t.R7$(9),t.R50("ngModel",e.darkMode),t.R7$(6),t.JRh(e.connectionStatus),t.R7$(7),t.R50("ngModel",e.notifications))},dependencies:[i.eU,i.ai,i.BC,i.W9,i.nf,i.uz,i.he,i.BY,r.YN,r.BC,r.vS],encapsulation:2}),h})()}}]);