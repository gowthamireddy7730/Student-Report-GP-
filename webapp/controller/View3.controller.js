sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "globalproject/model/formatter"
], function (Controller, MessageToast, formatter) {
    "use strict";

    return Controller.extend("globalproject.controller.View3", {

        formatter: formatter, // ✅ required for XML formatter

        onInit: function () {

    var oRouter = this.getOwnerComponent().getRouter();
    oRouter.getRoute("student").attachPatternMatched(this._onMatched, this);
},

_onMatched: function () {

    var oModel = this.getOwnerComponent().getModel();
    var student = oModel.getProperty("/student");
    oModel.setProperty("/student/class", "Class - X");
    if (!student) return;

    var total =
        (parseFloat(student.subjects.maths) || 0) +
        (parseFloat(student.subjects.physics) || 0) +
        (parseFloat(student.subjects.chemistry) || 0) +
        (parseFloat(student.subjects.english) || 0) +
        (parseFloat(student.subjects.science) || 0);

    oModel.setProperty("/student/total", total);

    var percentage = (total / 500) * 100;
    oModel.setProperty("/student/percentage", percentage.toFixed(1));

    var grade = "";

    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B+";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C+";
    else if (percentage >= 40) grade = "C";
    else grade = "F";

    oModel.setProperty("/student/grade", grade);

    var isFail =
        student.subjects.maths < 35 ||
        student.subjects.physics < 35 ||
        student.subjects.chemistry < 35 ||
        student.subjects.english < 35 ||
        student.subjects.science < 35;

    oModel.setProperty("/student/status", isFail ? "Fail" : "Pass");

    oModel.refresh(true);
    oModel.setProperty("/isEdit", false);
   
},


onEdit: function () {
    var oModel = this.getOwnerComponent().getModel();
    oModel.setProperty("/isEdit", true);
},

        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("home");
        },

        onSave: function () {
            MessageToast.show("Student Data Saved!");
            var oModel = this.getOwnerComponent().getModel();

            oModel.setProperty("/isEdit", false);


        }

    });
});