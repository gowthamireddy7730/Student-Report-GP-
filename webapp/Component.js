sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/dom/includeStylesheet"

], function (UIComponent, JSONModel, includeStylesheet) {
    "use strict";

    return UIComponent.extend("globalproject.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
    UIComponent.prototype.init.apply(this, arguments);
            includeStylesheet(sap.ui.require.toUrl("globalproject/css/style.css"));

    var oModel = new JSONModel({
        login: {
            username: "",
            password: ""
        },
        students: [],
        teachers: [],
        filteredStudents: []
    });

    // ✅ ADD THIS (VERY IMPORTANT)
    oModel.loadData(sap.ui.require.toUrl("globalproject/model/data.json"));

    // ✅ Debug (optional but helpful)
    oModel.attachRequestCompleted(function () {
        console.log("DATA LOADED:", oModel.getData());
    });

    this.setModel(oModel);

    this.getRouter().initialize();
}
    });
});