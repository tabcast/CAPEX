sap.ui.define([
		"sap/ui/base/Object",
		"sap/ui/Device",
		"co/com/postobon/js/DataModel"
	],
	function(SAPObject, Device, DataModel) {
		"use strict";

		var data = SAPObject.extend(
			"co.com.postobon.js.DaoData", {
				metadata: {
					interfaces: ["co/com/postobon/js/InterfaceDao"]
				},

				constructor: function(oThis) {
					this.daoModel = new DataModel();
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description interface method: get data notific
				 * @function
				 * @memberOf module: IDao
				 * @inner
				 */
				getAviso: function(oModelo, sEntidad, oFilters) {
					return this.daoModel.readEntitySync(oModelo, sEntidad, oFilters);
				},

				/**
				 * @author: ce_alopez (Johnny López)
				 * @description interface method: get data work asyn
				 * @function
				 * @memberOf module: IDao
				 * @inner
				 */
				setPresupuestoAsyn: function(oModelo, sEntidad, oFilters, oData) {
					this.daoModel.fnCreateEntityAsync(oModelo, sEntidad, oFilters, oData);
				},

				/**
				 * @author: ce_alopez (Johnny López)
				 * @description interface method: get data work asyn
				 * @function
				 * @memberOf module: IDao
				 * @inner
				 */
				setPresupuesto: function(oModelo, sEntidad, pData) {
					return this.daoModel.fnCreateEntity(oModelo, sEntidad, pData);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description interface method: get data work 
				 * @function
				 * @memberOf module: IDao
				 * @inner
				 */
				setCentroTrabajo: function(oModelo, sEntidad, oFilters) {
					return this.daoModel.readEntitySync(oModelo, sEntidad, oFilters);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description interface method: get mat replacement asyn
				 * @function
				 * @memberOf module: IDao
				 * @inner
				 */
				setRepuestoAsyn: function(oModelo, sEntidad, oFilters, oData) {
					this.daoModel.fnReadEntityAsyn(oModelo, sEntidad, oFilters, oData);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description interface method: get mat replacement
				 * @function
				 * @memberOf module: IDao
				 * @inner
				 */
				setRepuesto: function(oModelo, sEntidad, oFilters) {
					return this.daoModel.readEntitySync(oModelo, sEntidad, oFilters);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description interface method: create order
				 * @function
				 * @memberOf module: IDao
				 * @inner
				 */
				createOrder: function(pModelo, pEntidad, pData) {
					return this.daoModel.fnCreateEntity(pModelo, pEntidad, pData);
				}

			});

		return data;
	});