sap.ui.define([], function () { 
    "use strict";

    return {

        getOverallStatus: function (maths, physics, chemistry, english, science) {

            maths = parseFloat(maths);
            physics = parseFloat(physics);
            chemistry = parseFloat(chemistry);
            english = parseFloat(english);
            science = parseFloat(science);

            var isFail =
                maths < 35 ||
                physics < 35 ||
                chemistry < 35 ||
                english < 35 ||
                science < 35;

            return isFail ? "Fail" : "Pass";
        },

        isSubjectFail: function (marks) {
            marks = parseFloat(marks);
            return marks < 35 ? "Error" : "Success";
        },

        isOverallFail: function (maths, physics, chemistry, english, science) {

            maths = parseFloat(maths);
            physics = parseFloat(physics);
            chemistry = parseFloat(chemistry);
            english = parseFloat(english);
            science = parseFloat(science);

            var isFail =
                maths < 35 ||
                physics < 35 ||
                chemistry < 35 ||
                english < 35 ||
                science < 35;

            return isFail ? "Error" : "Success";
        },

        // ✅ NEW FOR TEXT COLOR
        getTextColor: function (value) {
            return value === "Fail" ? "failText" : "passText";
        },

        getMarksTextColor: function (marks) {
    marks = parseFloat(marks);
    return marks < 35 ? "failText" : "passText";
},

        getOverallTextColor: function (m, p, c, e, s) {
            m = parseFloat(m);
            p = parseFloat(p);
            c = parseFloat(c);
            e = parseFloat(e);
            s = parseFloat(s);

            var isFail =
                m < 35 || p < 35 || c < 35 || e < 35 || s < 35;

            return isFail ? "failText" : "passText";
        }

    };
});