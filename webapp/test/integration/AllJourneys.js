jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 PRESUPUESTO in the list
// * All 3 PRESUPUESTO have at least one APROBADORES

sap.ui.require([
	"sap/ui/test/Opa5",
	"co/com/postobon/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"co/com/postobon/test/integration/pages/App",
	"co/com/postobon/test/integration/pages/Browser",
	"co/com/postobon/test/integration/pages/Master",
	"co/com/postobon/test/integration/pages/Detail",
	"co/com/postobon/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "co.com.postobon.view."
	});

	sap.ui.require([
		"co/com/postobon/test/integration/MasterJourney",
		"co/com/postobon/test/integration/NavigationJourney",
		"co/com/postobon/test/integration/NotFoundJourney",
		"co/com/postobon/test/integration/BusyJourney",
		"co/com/postobon/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});