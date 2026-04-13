sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("globalproject.controller.View2", {

        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("login").attachPatternMatched(this._onMatched, this);

            var oModel = this.getOwnerComponent().getModel();

            if (!oModel.getProperty("/login")) {
                oModel.setProperty("/login", {
                    username: "",
                    password: ""
                });
            }
        },

        _onMatched: function (oEvent) {
            var role = oEvent.getParameter("arguments").role;

            var oModel = this.getOwnerComponent().getModel();
            
            oModel.setProperty("/login", {
                username: "",
                password: ""
            });
            oModel.setProperty("/loginRole", role);

            if (role === "teacher") {
                oModel.setProperty("/loginImage", "images/Teacher.jpg");
            } else {
                oModel.setProperty("/loginImage", "images/student.jpg");
            }
        },

        onLogin: function () {

            var oModel = this.getOwnerComponent().getModel();

            oModel.setProperty("/student", null);
            oModel.setProperty("/teacherSubject", null);
            var role = oModel.getProperty("/loginRole");
            var user = oModel.getProperty("/login/username");
            var pass = oModel.getProperty("/login/password");

            var isValid = false;

 
            if (pass !== "7730") {
                MessageToast.show("Invalid Password ❌");
                return;
            }

            if (role === "student") {
                var students = oModel.getProperty("/students");

                if (!students || students.length === 0) {
                    MessageToast.show("Student data not loaded ❌");
                    return;
                }

                for (var i = 0; i < students.length; i++) {
                    if (students[i].name.toLowerCase() === user.toLowerCase()) {
                        isValid = true;

                        oModel.setProperty("/student", students[i]);
                        break;
                    }
                }
            }

    
            else if (role === "teacher") {

    var teachers = oModel.getProperty("/teachers");
    var students = oModel.getProperty("/students");

    if (!teachers || teachers.length === 0) {
        MessageToast.show("Teacher data not loaded ❌");
        return;
    }

    for (var j = 0; j < teachers.length; j++) {

        if (
            teachers[j].name.toLowerCase() === user.toLowerCase() ||
            teachers[j].id.toLowerCase() === user.toLowerCase()
        ) {
            isValid = true;

            var subject = teachers[j].subject.toLowerCase();

            // ✅ store subject
            oModel.setProperty("/teacherSubject", subject);

            // ✅ FILTER STUDENTS
            var filteredStudents = students.filter(function (s) {
                return s.subjects[subject] !== undefined;
            });

            // ✅ SET FILTERED DATA
            oModel.setProperty("/filteredStudents", filteredStudents);

            break;
        }
    }
}


            if (isValid) {
                if (role === "teacher") {
                    this.getOwnerComponent().getRouter().navTo("teacher");
                } else {
                    this.getOwnerComponent().getRouter().navTo("student");
                }
            } else {
                MessageToast.show("Invalid Username ❌");
            }
        },

        onBack: function () {
            this.getOwnerComponent().getRouter().navTo("home");
        }

    });
});