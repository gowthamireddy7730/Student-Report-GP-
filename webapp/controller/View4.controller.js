sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "globalproject/model/formatter"
], function (Controller, MessageToast, formatter) {
    "use strict";

    return Controller.extend("globalproject.controller.View4", {

        formatter: formatter,

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("teacher").attachPatternMatched(this._onMatched, this);
        },

        _onMatched: function () {

            var oModel = this.getOwnerComponent().getModel();

            // ✅ Reset flags
            oModel.setProperty("/isMaths", false);
            oModel.setProperty("/isPhysics", false);
            oModel.setProperty("/isChemistry", false);
            oModel.setProperty("/isEnglish", false);
            oModel.setProperty("/isScience", false);
            // ✅ Calculate values
            this._calculateAll(oModel);
        },

        _setSubjectAccess: function (oModel) {

            var subject = oModel.getProperty("/teacherSubject");

            console.log("Teacher Subject:", subject);

            oModel.setProperty("/isMaths", subject === "maths");
            oModel.setProperty("/isPhysics", subject === "physics");
            oModel.setProperty("/isChemistry", subject === "chemistry");
            oModel.setProperty("/isEnglish", subject === "english");
            oModel.setProperty("/isScience", subject === "science");
        },

        _calculateAll: function (oModel) {

            var students = oModel.getProperty("/filteredStudents");
            if (!students) return;

            students.forEach(function (s, index) {

                var total =
                    (parseFloat(s.subjects.maths) || 0) +
                    (parseFloat(s.subjects.physics) || 0) +
                    (parseFloat(s.subjects.chemistry) || 0) +
                    (parseFloat(s.subjects.english) || 0) +
                    (parseFloat(s.subjects.science) || 0);

                oModel.setProperty("/filteredStudents/" + index + "/total", total);

                var percentage = (total / 500) * 100;
                oModel.setProperty("/filteredStudents/" + index + "/percentage", percentage.toFixed(1));

                var grade = "";

                if (percentage >= 90) grade = "A+";
                else if (percentage >= 80) grade = "A";
                else if (percentage >= 70) grade = "B+";
                else if (percentage >= 60) grade = "B";
                else if (percentage >= 50) grade = "C+";
                else if (percentage >= 40) grade = "C";
                else grade = "Fail";

                oModel.setProperty("/filteredStudents/" + index + "/grade", grade);

            });

            oModel.refresh(true);
        },

        onMarksChange: function (oEvent) {

            var oContext = oEvent.getSource().getBindingContext();
            var oModel = oContext.getModel();
            var path = oContext.getPath();

            var data = oModel.getProperty(path);

            var total =
                (parseFloat(data.subjects.maths) || 0) +
                (parseFloat(data.subjects.physics) || 0) +
                (parseFloat(data.subjects.chemistry) || 0) +
                (parseFloat(data.subjects.english) || 0) +
                (parseFloat(data.subjects.science) || 0);

            oModel.setProperty(path + "/total", total);

            var percentage = (total / 500) * 100;
            oModel.setProperty(path + "/percentage", percentage.toFixed(1));

            var grade = "";

            if (percentage >= 90) grade = "A+";
            else if (percentage >= 80) grade = "A";
            else if (percentage >= 70) grade = "B+";
            else if (percentage >= 60) grade = "B";
            else if (percentage >= 50) grade = "C+";
            else if (percentage >= 40) grade = "C";
            else grade = "Fail";

            oModel.setProperty(path + "/grade", grade);

            oModel.refresh(true);
        },

        onEdit: function () {

        var oModel = this.getOwnerComponent().getModel();
        var subject = oModel.getProperty("/teacherSubject");

        // Reset all
        oModel.setProperty("/isMaths", false);
        oModel.setProperty("/isPhysics", false);
        oModel.setProperty("/isChemistry", false);
        oModel.setProperty("/isEnglish", false);
        oModel.setProperty("/isScience", false);

        // Enable only teacher subject
        if (subject === "maths") {
            oModel.setProperty("/isMaths", true);
        } else if (subject === "physics") {
            oModel.setProperty("/isPhysics", true);
        } else if (subject === "chemistry") {
            oModel.setProperty("/isChemistry", true);
        } else if (subject === "english") {
            oModel.setProperty("/isEnglish", true);
        } else if (subject === "science") {
            oModel.setProperty("/isScience", true);
        }
    },

        onSave: function () {

            var oModel = this.getOwnerComponent().getModel();
            var data = oModel.getProperty("/filteredStudents");

            console.log("Saved Data:", data);

            localStorage.setItem("studentsData", JSON.stringify(data));

            MessageToast.show("Data Saved Successfully!");

                // ✅ ADD THIS PART (VERY IMPORTANT)

    oModel.setProperty("/isMaths", false);
    oModel.setProperty("/isPhysics", false);
    oModel.setProperty("/isChemistry", false);
    oModel.setProperty("/isEnglish", false);
    oModel.setProperty("/isScience", false);
        },

        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("home");
        }

    });
});