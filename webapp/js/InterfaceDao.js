sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/base/Interface"
], function(Object, Interface) {
	"use strict";

	var IDao = Object.extend(
		"co.com.postobon.js.InterfaceDao", {
			metadata: {
				interfaces: [],
				abstract: true
			},

			constructor: function() {
				return new Interface(this, this.getMetadata().getAllPublicMethods());
			},

			/**
			 * @author: ce_alopez (Johnny López)
			 * @description interface method: get data presupuesto
			 * @function
			 * @memberOf module: IDao
			 * @inner
			 */
			getPresupuesto: function(nAviso) {},

			/**
			 * @author: EXSSAABARRIO (Johnny López)
			 * @description interface method: get data work 
			 * @function
			 * @memberOf module: IDao
			 * @inner
			 */
			setCentroTrabajo: function(oModelo, sEntidad, oFilters) {},

			/**
			 * @author: EXSSAABARRIO (Johnny López)
			 * @description interface method: get mat replacement asyn
			 * @function
			 * @memberOf module: IDao
			 * @inner
			 */
			setRepuestoAsyn: function(oModelo, sEntidad, oFilters, oData) {},

			/**
			 * @author: EXSSAABARRIO (Johnny López)
			 * @description interface method: get mat replacement
			 * @function
			 * @memberOf module: IDao
			 * @inner
			 */
			setRepuesto: function(oModelo, sEntidad, oFilters) {},

			/**
			 * @author: EXSSAABARRIO (Johnny López)
			 * @description interface method: create order
			 * @function
			 * @memberOf module: IDao
			 * @inner
			 */
			createOrder: function(pModelo, pEntidad, pData) {}
		});
	return IDao;
});