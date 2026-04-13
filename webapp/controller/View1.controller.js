sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("globalproject.controller.View1", {

        onTeacherLogin: function () {
            console.log("Clicked");
            this.getOwnerComponent().getRouter().navTo("login", {
                role: "teacher"
            });
        },

        onStudentLogin: function () {
            this.getOwnerComponent().getRouter().navTo("login", {
                role: "student"
            });
        }

    });
});