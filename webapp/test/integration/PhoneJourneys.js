jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"co/com/postobon/test/integration/NavigationJourneyPhone",
		"co/com/postobon/test/integration/NotFoundJourneyPhone",
		"co/com/postobon/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});