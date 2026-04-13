/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["globalproject/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
