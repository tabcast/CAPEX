sap.ui.define([
		"sap/ui/base/Object",
		"co/com/postobon/js/DaoData",
		"sap/m/MessageBox"
	],
	function(SAPObject, Dao, MessageBox) {
		"use strict";

		var Implement = SAPObject.extend(
			"co.com.postobon.js.Implements", {
				metadata: {
					interfaces: []
				},

				constructor: function(oThis) {
					this.dao = new Dao(oThis);
					this.othis = oThis;
				},

				/**
				 * @author: ce_alopez (Johnny López)
				 * @description method: atributte centro trabajo
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				presupuesto: {
					data: ""
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: atributte index
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				index: {
					vIndex: ""
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: atributte mat replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				materialRepuesto: {
					data: ""
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get data notific
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getAviso: function(pAviso) {
					var sServiceUrl = "",
						oModelService = "";

					sServiceUrl = this.othis.getView().getModel().sServiceUrl;
					oModelService = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

					return this.dao.getAviso(oModelService, "AvisoSet(Qmnum='" +
						pAviso + "')", null);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: Map data notific
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				mapDataAviso: function(oData) {
					debugger;
					var oAviso = "",
						oClaseOrden = "",
						oGrupoPlan = "",
						oCentro = "",
						oPuestoTrabajo = "",
						oUbicacionTec = "",
						oUbicacionTecDes = "",
						oEquipo = "",
						oDesEquipo = "",
						oPrioridad = "",
						oPrioridadx = "",
						oFechaIni = "",
						oFechaFin = "",
						date = "",
						dateIni = "",
						dateFin = "";

					oAviso = this.othis.getView().byId("idAviso");
					oClaseOrden = this.othis.getView().byId("idClaseOrden");
					oGrupoPlan = this.othis.getView().byId("idGrupoPlan");
					oCentro = this.othis.getView().byId("idCentro");
					oPuestoTrabajo = this.othis.getView().byId("idPuestoTrabajo");
					oUbicacionTec = this.othis.getView().byId("idUbicTecnica");
					oUbicacionTecDes = this.othis.getView().byId("idDesUbicTecnica");
					oEquipo = this.othis.getView().byId("idEquipo");
					oDesEquipo = this.othis.getView().byId("idDescEquipo");
					oPrioridad = this.othis.getView().byId("idPrioridad");
					oPrioridadx = this.othis.getView().byId("idPrioridadx");
					oFechaIni = this.othis.getView().byId("idFechaIni");
					oFechaFin = this.othis.getView().byId("idFechaFin");
					date = "2019-09-10T22:21:53.069Z".split('T');
					// date = "2019-09-1022:21:53.069Z".split('T');

					if (date.length > 1) {
						dateIni = date[1].length > 8 ? date[0] + " " + date[1].substr(0, 8) : date[0] + " " + date[1];
						// dateIni = date[0] + " " + date[1].substr(0,8);
					}

					oAviso.setText(oData.Qmnum);
					oClaseOrden.setText("ZPRO");
					oGrupoPlan.setText(oData.Ingrp);
					oCentro.setText(oData.Iwerk);
					oPuestoTrabajo.setText(oData.Arbpl);
					oUbicacionTec.setText(oData.Tplnr);
					oUbicacionTecDes.setText(oData.Pltxt);
					oEquipo.setText(oData.Equnr);
					oDesEquipo.setText(oData.Eqktx);
					// oPrioridad.setText(oData.Priok);
					// oPrioridadx.setText(oData.Priok);
					oPrioridad.setText("1");
					oPrioridadx.setText("1");
					oFechaIni.setText(dateIni);
					oFechaFin.setText(dateIni);

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: set centro trabajo
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				setDataPresupuestoAsyn: function(sociedad, solicitud) {
					debugger;
					var sServiceUrl = "",
						oModelService = "",
						inPresupuesto = {};

					sServiceUrl = this.othis.getView().getModel().sServiceUrl;
					oModelService = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
					
					inPresupuesto = {
						bukrs:sociedad,
						solicitud:solicitud,
						ITEMS:[],
						APROBADORES:[]
					};

					sServiceUrl = this.othis.getView().getModel().sServiceUrl;
					oModelService = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

					this.dao.setPresupuestoAsyn(oModelService, "PRESUPUESTO", inPresupuesto, this.presupuesto );
					// var test = this.dao.setPresupuesto(oModelService, "PRESUPUESTO", inPresupuesto);
					// return test;
				},

				/**
				 * @author: ce_alopez (Johnny López)
				 * @description method: get centro trabajo
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getPresupuesto: function() {

					return this.presupuesto.data;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: set centro trabajo
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				setCentroTrabajo: function(pCentro) {

					var sServiceUrl = "",
						oModelService = "";

					sServiceUrl = this.othis.getView().getModel().sServiceUrl;
					oModelService = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

					this.centroTrabajo = this.dao.setCentroTrabajo(oModelService, "PuestoTrabajoSet?$filter=Werks eq '" +
						pCentro + "'", null);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: set map list fragment
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				mapDataListFragment: function(oData) {

					var oList = {
							lstItems: []
						},
						oLista = "",
						vModel = "";

					oList.lstItems = oData;
					oLista = sap.ui.getCore().getElementById("lstLista");
					vModel = new sap.ui.model.json.JSONModel(oList);
					oLista.setModel(vModel);

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get index table
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getIndexTable: function(oEvent) {

					var sPath = "",
						vTable = "";

					sPath = oEvent.getSource().sId;
					vTable = sPath.split("-");

					return vTable.pop();
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: init model operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				initModelOperation: function(oEvent) {
					var oList = "",
						aList = {
							Items: []
						},
						oModel = "";

					oList = this.othis.getView().byId("ProductList");
					oModel = new sap.ui.model.json.JSONModel(aList);
					oList.setModel(oModel);

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: add operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				addItemOperation: function(oEvent) {
					var oList = "",
						oItems = {},
						vTextoTrabajo = "",
						vDuracion = "",
						vTime = "",
						vDesc = "",
						vActiv = "",
						vObserv = "",
						vPos = "",
						oPos = "";

					vTextoTrabajo = sap.ui.getCore().byId("txtPuestoEdit");
					vDuracion = sap.ui.getCore().byId("number");
					vTime = sap.ui.getCore().byId("select");
					vDesc = sap.ui.getCore().byId("descp");
					vActiv = sap.ui.getCore().byId("check");
					vObserv = sap.ui.getCore().byId("observ");
					oList = this.othis.getView().byId("ProductList");

					if (oList.getModel().getData().Items.length > 0) {
						oPos = oList.getModel().getData().Items[0];

						vPos = parseInt(oPos.Pos) + 10;
						vPos = vPos.toString();
					} else {
						vPos = "10";
					}

					oItems = {
						Pos: vPos,
						Work: vTextoTrabajo.getValue(),
						WorkName: vTextoTrabajo.getName(),
						Duration: vDuracion.getValue(),
						Time: vTime.getSelectedKey(),
						TimeText: vTime._getSelectedItemText(),
						Text: vDesc.getValue(),
						Actividad: vActiv.getSelected(),
						Arbpl: vTextoTrabajo.getName(),
						Observ: vObserv.getValue(),
						Count: 0,
						Icon: vActiv.getSelected() ? "sap-icon://physical-activity" : "sap-icon://disconnected"
					};

					oList.getModel().getData().Items.unshift(oItems);
					oList.getModel().refresh(true);

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get data index
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getDataItem: function(pIndex) {
					var oList = "";

					oList = this.othis.getView().byId("ProductList");

					return oList.getModel().getData().Items[pIndex];
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: map data fragment operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				mapDataFragmentOperation: function(oData) {
					var vTextoTrabajo = "",
						vDuracion = "",
						vTime = "",
						vDesc = "",
						vActiv = "",
						vObserv = "",
						vTitle = "",
						vLabelText = "",
						vLabel = "";

					vTextoTrabajo = sap.ui.getCore().byId("txtPuestoEdit");
					vDuracion = sap.ui.getCore().byId("number");
					vTime = sap.ui.getCore().byId("select");
					vDesc = sap.ui.getCore().byId("descp");
					vActiv = sap.ui.getCore().byId("check");
					vObserv = sap.ui.getCore().byId("observ");
					vTitle = sap.ui.getCore().byId("title");
					vLabel = sap.ui.getCore().byId("lbTextBrief");

					vTextoTrabajo.setValue(oData.Work);
					vTextoTrabajo.setName(oData.Arbpl);
					vDuracion.setValue(oData.Duration);
					vTime.setSelectedKey(oData.Time);
					vDesc.setValue(oData.Text);
					vActiv.setSelected(oData.Actividad);
					vObserv.setValue(oData.Observ);
					vTitle.setTitle("Editar Operación " + oData.Pos);

					vLabelText = this.othis.getView().getModel("i18n").getResourceBundle().getText("detailText");
					vLabel.setText(vLabelText + " " + vDesc.getValue().length);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: set index table
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				setIndex: function(pIndex) {
					this.index.vIndex = pIndex;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get index table
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getIndex: function() {
					return this.index.vIndex;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: modify operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				modifyItemOperation: function(pItem) {
					var oList = "",
						oItems = {},
						oItemsOld = {},
						vTextoTrabajo = "",
						vDuracion = "",
						vTime = "",
						vDesc = "",
						vActiv = "",
						vObserv = "";

					vTextoTrabajo = sap.ui.getCore().byId("txtPuestoEdit");
					vDuracion = sap.ui.getCore().byId("number");
					vTime = sap.ui.getCore().byId("select");
					vDesc = sap.ui.getCore().byId("descp");
					vActiv = sap.ui.getCore().byId("check");
					vObserv = sap.ui.getCore().byId("observ");

					oList = this.othis.getView().byId("ProductList");

					oItemsOld = oList.getModel().getData().Items[pItem];

					oItems = {
						Pos: oItemsOld.Pos,
						Work: vTextoTrabajo.getValue(),
						Arbpl: vTextoTrabajo.getName(),
						Duration: vDuracion.getValue(),
						Time: vTime.getSelectedKey(),
						TimeText: vTime._getSelectedItemText(),
						Text: vDesc.getValue(),
						Actividad: vActiv.getSelected(),
						Observ: vObserv.getValue(),
						Count: oItemsOld.Count,
						Icon: vActiv.getSelected() ? "sap-icon://physical-activity" : "sap-icon://disconnected"
					};

					oList.getModel().getData().Items[pItem] = oItems;
					oList.getModel().refresh(true);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: modify operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				deleteItemOperation: function(oEvent) {
					var oList = "",
						vIndex = oEvent.getParameter("listItem")._getBindingContext().getPath().split("/")[2];

					oList = this.othis.getView().byId("ProductList");

					oList.getModel().getData().Items.splice(vIndex, 1);
					oList.getModel().refresh(true);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: title operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				titleOperation: function(oEvent) {
					var oList = "",
						vPos = "",
						vTitle = "",
						oPos = "";

					oList = this.othis.getView().byId("ProductList");
					vPos = oList.getModel().getData().Items.length;
					vTitle = sap.ui.getCore().byId("title");

					if (oList.getModel().getData().Items.length > 0) {
						oPos = oList.getModel().getData().Items[0];

						vPos = parseInt(oPos.Pos) + 10;
						vPos = vPos.toString();
					} else {
						vPos = "10";
					}

					vTitle.setTitle("Nueva Operación " + vPos);

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description: Search work
				 * @function
				 * @memberOf module: Detalle
				 * @inner
				 */
				searchPuesto: function(oEvent) {
					// var sQuery = oEvent.getParameter("value");
					var sQuery = oEvent.getSource().getValue();
					var filters = [],
						filter1 = "",
						filter2 = "";

					if (sQuery && sQuery.length > 0) {
						filter1 = new sap.ui.model.Filter("Ktext", sap.ui.model.FilterOperator.Contains, sQuery);
						filter2 = new sap.ui.model.Filter("Arbpl", sap.ui.model.FilterOperator.Contains, sQuery);
						filters = new sap.ui.model.Filter([filter1, filter2], false);
					}

					// Update list binding
					sap.ui.getCore().byId("lstLista").getBinding("items").filter(filters);

					//On phone devices, there is nothing to select from the list
					if (sap.ui.Device.system.phone) {
						return;
					}

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: set mat replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				setRepuestoAsyn: function(pCentro) {

					var sServiceUrl = "",
						oModelService = "";

					sServiceUrl = this.othis.getView().getModel().sServiceUrl;
					oModelService = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

					this.dao.setRepuestoAsyn(oModelService, "RepuestoSet?$filter=Werks eq '" +
						pCentro + "'", null, this.materialRepuesto);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: set mat replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				setRepuesto: function(pCentro) {

					var sServiceUrl = "",
						oModelService = "";

					sServiceUrl = this.othis.getView().getModel().sServiceUrl;
					oModelService = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

					this.materialRepuesto = this.dao.setRepuesto(oModelService, "RepuestoSet?$filter=Werks eq '" +
						pCentro + "'", null);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get mat replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getRepuesto: function() {
					return this.materialRepuesto.data;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: init model replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				initModelReplacement: function(oEvent) {
					var oList = "",
						aList = {
							Items: []
						},
						oModel = "";

					oList = this.othis.getView().byId("replacementList");
					oModel = new sap.ui.model.json.JSONModel(aList);
					oList.setModel(oModel);

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: check operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				checkOperation: function(oEvent) {
					var oList = "",
						vMessage = "";

					oList = this.othis.getView().byId("ProductList");

					if (oList.getModel().getData().Items.length === 0) {
						vMessage = "No existen operaciones";
					} else {
						vMessage = "";
					}

					return vMessage;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get data index
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getDataOperation: function(pIndex) {
					var oList = "";

					oList = this.othis.getView().byId("ProductList");

					return oList.getModel().getData().Items;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: select operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				selectOperation: function(oEvent) {
					//Contexto del item seleccionado
					var bindingContext = "",
						oOperation = "";

					bindingContext = oEvent.getParameters().selectedItem.getBindingContext();
					oOperation = sap.ui.getCore().byId("idOperacion");

					oOperation.setValue(bindingContext.getProperty("Text"));
					oOperation.setName(bindingContext.getProperty("Pos"));
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description: Search operation
				 * @function
				 * @memberOf module: Detalle
				 * @inner
				 */
				searchOperation: function(oEvent) {
					var sQuery = oEvent.getParameter("value");
					var filters = [],
						filter1 = "",
						filter2 = "";

					if (sQuery && sQuery.length > 0) {
						filter1 = new sap.ui.model.Filter("Text", sap.ui.model.FilterOperator.Contains, sQuery);
						filter2 = new sap.ui.model.Filter("Pos", sap.ui.model.FilterOperator.Contains, sQuery);
						filters = new sap.ui.model.Filter([filter1, filter2], false);
					}

					// Update list binding
					sap.ui.getCore().byId("lstLista").getBinding("items").filter(filters);

					//On phone devices, there is nothing to select from the list
					if (sap.ui.Device.system.phone) {
						return;
					}
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: select Material
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				selectMaterial: function(oEvent) {
					//Contexto del item seleccionado
					var //bindingContext = "",
						oMaterial = "",
						oAlmacen = "";

					// bindingContext = oEvent.getParameters().selectedItem.getBindingContext();
					oMaterial = sap.ui.getCore().byId("idMaterial");
					oAlmacen = sap.ui.getCore().byId("idAlmacen");

					// oMaterial.setValue(bindingContext.getProperty("Maktx"));
					// oMaterial.setName(bindingContext.getProperty("Matnr"));

					oMaterial.setValue(oEvent.getSource().getSelectedItem().getProperty("title"));
					oMaterial.setName(oEvent.getSource().getSelectedItem().getProperty("number"));

					oAlmacen.setValue(oEvent.getSource().getSelectedItem().getProperty("numberUnit"));
					oAlmacen.setName(oEvent.getSource().getSelectedItem().getProperty("numberUnit"));

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description: Search material
				 * @function
				 * @memberOf module: Detalle
				 * @inner
				 */
				searchMaterial: function(oEvent) {
					// var sQuery = oEvent.getParameter("value");
					var sQuery = oEvent.getSource().getValue();
					var filters = [],
						filter1 = "",
						filter2 = "";

					if (sQuery && sQuery.length > 0) {
						filter1 = new sap.ui.model.Filter("Maktx", sap.ui.model.FilterOperator.Contains, sQuery);
						filter2 = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.Contains, sQuery);
						filters = new sap.ui.model.Filter([filter1, filter2], false);
					}

					// Update list binding
					sap.ui.getCore().byId("lstLista").getBinding("items").filter(filters);

					//On phone devices, there is nothing to select from the list
					if (sap.ui.Device.system.phone) {
						return;
					}
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: add replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				addItemReplacement: function(oEvent) {
					var oList = "",
						oItems = {},
						vOperation = "",
						vMaterial = "",
						vCantidad = "",
						vAlmacen = "",
						vPos = "",
						oPos = "",
						vError = true;

					vError = this.checkObligatoryReplacement(oEvent);

					if (!vError) {
						return vError;
					}

					vOperation = sap.ui.getCore().byId("idOperacion");
					vMaterial = sap.ui.getCore().byId("idMaterial");
					vCantidad = sap.ui.getCore().byId("idCantidad");
					vAlmacen = sap.ui.getCore().byId("idAlmacen");
					oList = this.othis.getView().byId("replacementList");

					if (oList.getModel().getData().Items.length > 0) {
						oPos = oList.getModel().getData().Items[0];

						vPos = parseInt(oPos.Pos) + 10;
						vPos = vPos.toString();
					} else {
						vPos = "10";
					}

					oItems = {
						Pos: vPos,
						Opera: vOperation.getName(),
						OpeDe: vOperation.getValue(),
						Matnr: vMaterial.getName(),
						Matxt: vMaterial.getValue(),
						Canti: vCantidad.getValue(),
						Lgort: vAlmacen.getValue()
					};

					oList.getModel().getData().Items.unshift(oItems);
					oList.getModel().refresh(true);

					this.addCountItemOperation(vOperation.getName());

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get data index replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getDataItemReplacement: function(pIndex) {
					var oList = "";

					oList = this.othis.getView().byId("replacementList");

					return oList.getModel().getData().Items[pIndex];
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: map data fragment replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				mapDataFragmentReplacement: function(oData) {
					var vOperation = "",
						vMaterial = "",
						vCantidad = "",
						vTitle = "";

					vOperation = sap.ui.getCore().byId("idOperacion");
					vMaterial = sap.ui.getCore().byId("idMaterial");
					vCantidad = sap.ui.getCore().byId("idCantidad");

					vTitle = sap.ui.getCore().byId("title");

					vOperation.setName(oData.Opera);
					vOperation.setValue(oData.OpeDe);
					vMaterial.setName(oData.Matnr);
					vMaterial.setValue(oData.Matxt);
					vCantidad.setValue(oData.Canti);
					vTitle.setTitle("Editar Repuesto " + oData.Pos);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: modify operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				modifyItemReplacement: function(pItem) {
					var oList = "",
						oItems = {},
						vOperation = "",
						vMaterial = "",
						vCantidad = "",
						vAlmacen = "",
						oItemOld = "",
						vError = true;

					vOperation = sap.ui.getCore().byId("idOperacion");
					vMaterial = sap.ui.getCore().byId("idMaterial");
					vCantidad = sap.ui.getCore().byId("idCantidad");
					vAlmacen = sap.ui.getCore().byId("idAlmacen");
					oList = this.othis.getView().byId("replacementList");

					vError = this.checkObligatoryReplacement();

					if (!vError) {
						return vError;
					}

					oList = this.othis.getView().byId("replacementList");

					oItemOld = oList.getModel().getData().Items[pItem];

					oItems = {
						Pos: oItemOld.Pos,
						Opera: vOperation.getName(),
						OpeDe: vOperation.getValue(),
						Matnr: vMaterial.getName(),
						Matxt: vMaterial.getValue(),
						Canti: vCantidad.getValue(),
						Lgort: vAlmacen.getValue()
					};

					oList.getModel().getData().Items[pItem] = oItems;
					oList.getModel().refresh(true);

					if (oItemOld.Opera !== vOperation.getName()) {
						this.addCountItemOperation(vOperation.getName());
						this.subtCountItemOperation(oItemOld.Opera);
					}
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: add count item operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				addCountItemOperation: function(pOperation) {
					var oList = "",
						oItem = "";

					oList = this.othis.getView().byId("ProductList");

					// oItem = oList.getModel().getData().Items.filter(s => s.Pos === pOperation)[0];

					oItem.Count = oItem.Count + 1;

					oList.getModel().refresh(true);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: subtract count item operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				subtCountItemOperation: function(pOperation) {
					var oList = "",
						oItem = "";

					oList = this.othis.getView().byId("ProductList");

					// oItem = oList.getModel().getData().Items.filter(s => s.Pos === pOperation)[0];

					oItem.Count = oItem.Count - 1;

					oList.getModel().refresh(true);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: delete replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				deleteItemReplacement: function(oEvent) {
					var oList = "",
						vIndex = "",
						oItem = "";

					vIndex = this.getIndexTable(oEvent);

					oList = this.othis.getView().byId("replacementList");
					oItem = oList.getModel().getData().Items[vIndex];
					oList.getModel().getData().Items.splice(vIndex, 1);
					oList.getModel().refresh(true);

					this.subtCountItemOperation(oItem.Opera);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: create order
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				saveOrder: function(oEvent) {
					var oNotific = "",
						oCreate = "",
						bCompact = "",
						oThat = "",
						oJsonMessage = "";

					oThat = this;

					oNotific = this.getDataNotific(oEvent);
					oCreate = this.createOrder(oNotific);

					bCompact = !!this.othis.getView().$().closest(".sapUiSizeCompact").length;

					if (!oCreate.data) {

						oJsonMessage = JSON.parse(oCreate.response.body);

						MessageBox.show(
							oJsonMessage.error.message.value, {
								icon: MessageBox.Icon.ERROR,
								title: "Error"
									// actions: [MessageBox.Action.YES, MessageBox.Action.NO],
									// onClose: function (oAction) {
									// 	/ * do something * /
									// }
							}
						);

						return;
					}

					if (oCreate.data.Type === "Error") {
						MessageBox.show(
							oCreate.data.Mensg, {
								icon: MessageBox.Icon.ERROR,
								title: "Error"
									// actions: [MessageBox.Action.YES, MessageBox.Action.NO],
									// onClose: function (oAction) {
									// 	/ * do something * /
									// }
							}
						);

					} else {

						MessageBox.show(
							oCreate.data.Mensg, {
								icon: MessageBox.Icon.SUCCESS,
								title: "Exito",
								actions: [MessageBox.Action.OK],
								onClose: function(oAction) {
									if (oAction === sap.m.MessageBox.Action.OK) {
										oThat.navToNotifc("", "ZLOPM3041APPAVI", "create");
										return;
									}
								}
							}
						);

					}

					// MessageBox.success(
					// 	oCreate.data.Mensg, {
					// 		styleClass: bCompact ? "sapUiSizeCompact" : ""
					// 	});
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get data by order create
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getDataNotific: function(oEvent) {

					var oAviso = "",
						oClaseOrden = "",
						oGrupoPlan = "",
						oCentro = "",
						oPuestoTrabajo = "",
						oUbicacionTec = "",
						oUbicacionTecDes = "",
						oEquipo = "",
						oDesEquipo = "",
						oPrioridad = "",
						oFechaIni = "",
						oFechaFin = "",
						oNotific = {};

					oAviso = this.othis.getView().byId("idAviso");
					oClaseOrden = this.othis.getView().byId("idClaseOrden");
					oGrupoPlan = this.othis.getView().byId("idGrupoPlan");
					oCentro = this.othis.getView().byId("idCentro");
					oPuestoTrabajo = this.othis.getView().byId("idPuestoTrabajo");
					oUbicacionTec = this.othis.getView().byId("idUbicTecnica");
					oUbicacionTecDes = this.othis.getView().byId("idDesUbicTecnica");
					oEquipo = this.othis.getView().byId("idEquipo");
					oDesEquipo = this.othis.getView().byId("idDescEquipo");
					oPrioridad = this.othis.getView().byId("idPrioridad");
					oFechaIni = this.othis.getView().byId("idFechaIni");
					oFechaFin = this.othis.getView().byId("idFechaFin");

					oNotific = {
						Arbpl: oPuestoTrabajo.getText(),
						Artpr: oPrioridad.getText() !== "NA" ? oPrioridad.getText() : "",
						Eqktx: oDesEquipo.getText(),
						Equnr: oEquipo.getText() !== "NA" ? oEquipo.getText() : "",
						Auart: oClaseOrden.getText(),
						// Erdat: "",
						// Ernam: "",
						// Iloai: "",
						// Iloan: "",
						Ingrp: oGrupoPlan.getText(),
						Iwerk: oCentro.getText(),
						// Pltxt: "",
						Priok: oPrioridad.getText() !== "NA" ? oPrioridad.getText() : "",
						// Qmart: "",
						// Qmdat: "",
						Qmnum: oAviso.getText(),
						// Qmtxt: "",
						// Tplnr: ""
						OperacionSaveSet: this.getDataOperationSave(oEvent),
						ComponenteSaveSet: this.getDataReplacementSave(oEvent),
						ObservacionSaveSet: this.getDataObservationSave(oEvent)
					};

					return oNotific;

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get data operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getDataOperationSave: function(oEvent) {
					var oList = "",
						aOperation = [],
						oCentro = "";

					oList = this.othis.getView().byId("ProductList");
					oCentro = this.othis.getView().byId("idCentro");

					for (var i = oList.getModel().getData().Items.length - 1; i >= 0; i--) {
						var oItem = oList.getModel().getData().Items[i],
							oOperation = {},
							vArbeite = "";

						if (oItem.Time === "M") {
							vArbeite = "MIN";
						} else if (oItem.Time === "H") {
							vArbeite = "H";
						}

						oOperation = {
							Anlzu: oItem.Actividad ? "1" : "0",
							Arbeite: "MIN",
							Arbpl: oItem.Arbpl,
							Canti: "1",
							Daunor: oItem.Duration !== "" ? oItem.Duration : "0",
							Daunore: vArbeite,
							Indet: "2",
							Ltxa1: oItem.Text,
							Steus: "PM01",
							Vornr: oItem.Pos,
							Werks: oCentro.getText(),
							Anzkap: 1
						};

						aOperation.push(oOperation);

					}

					return aOperation;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: create order
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				createOrder: function(oNotific) {
					var sServiceUrl = "",
						oModelService = "";

					sServiceUrl = this.othis.getView().getModel().sServiceUrl;
					oModelService = new sap.ui.model.odata.ODataModel(sServiceUrl, true);

					return this.dao.createOrder(oModelService, "AvisoSet", oNotific);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get data replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getDataReplacementSave: function(oEvent) {
					var oList = "",
						aComponent = [],
						oCentro = "";

					oList = this.othis.getView().byId("replacementList");
					oCentro = this.othis.getView().byId("idCentro");
					oCentro = this.othis.getView().byId("idCentro");

					for (var i = oList.getModel().getData().Items.length - 1; i >= 0; i--) {
						var oItem = oList.getModel().getData().Items[i],
							oComponent = {};

						oComponent = {
							Lgort: oItem.Lgort,
							Matnr: oItem.Matnr,
							Meins: "UN",
							Posnr: oItem.Pos,
							Postp: "L",
							Quan: oItem.Canti,
							Vornr: oItem.Opera,
							Werks: oCentro.getText()
						};

						aComponent.push(oComponent);

					}

					return aComponent;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: count operaton
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				setCountOperation: function(oEvent) {
					var oList = "",
						oTabOperation = "";

					oList = this.othis.getView().byId("ProductList");
					oTabOperation = this.othis.getView().byId("idOperation");

					oTabOperation.setCount(oList.getModel().getData().Items.length);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: count replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				setCountComponent: function(oEvent) {
					var oList = "",
						oTabOperation = "";

					oList = this.othis.getView().byId("replacementList");
					oTabOperation = this.othis.getView().byId("idReplacement");

					oTabOperation.setCount(oList.getModel().getData().Items.length);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: nav replacement
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				navReplacement: function(oEvent) {
					var oTab = "";

					oTab = this.othis.getView().byId("idIconTabBarMulti");
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: check obligatory fields
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				checkObligatoryReplacement: function(oEvent) {

					var inputs = [
							sap.ui.getCore().byId("idOperacion"),
							sap.ui.getCore().byId("idMaterial"),
							sap.ui.getCore().byId("idCantidad")
						],
						canContinue = true;

					// check that inputs are not empty
					// this does not happen during data binding as this is only triggered by changes
					jQuery.each(inputs, function(i, input) {
						input.setValueState("Success");
						if (!input.getValue()) {
							input.setValueState("Error");
						}
					});

					jQuery.each(inputs, function(i, input) {
						if ("Error" === input.getValueState()) {
							canContinue = false;
							return false;
						}
					});

					if (!canContinue) {
						MessageBox.error("Ingresa datos en campos obligatorios");
						return false;
					}

					inputs = [
						sap.ui.getCore().byId("idCantidad")
					];

					jQuery.each(inputs, function(i, input) {
						input.setValueState("Success");
						if (Number(input.getValue()) <= 0) {
							input.setValueState("Error");
						}
					});

					jQuery.each(inputs, function(i, input) {
						if ("Error" === input.getValueState()) {
							canContinue = false;
							return false;
						}
					});

					if (!canContinue) {
						MessageBox.error("La cantidad debe ser mayor a cero");
						return false;
					}

					return true;

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: Map data notific
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				mapDataAvisoParameters: function(oData) {
					var oAviso = "",
						oClaseOrden = "",
						oGrupoPlan = "",
						oCentro = "",
						oPuestoTrabajo = "",
						oUbicacionTec = "",
						oUbicacionTecDes = "",
						oEquipo = "",
						oDesEquipo = "",
						oPrioridad = "",
						oPrioridadx = "",
						oFechaIni = "",
						oFechaFin = "";

					oAviso = this.othis.getView().byId("idAviso");
					oClaseOrden = this.othis.getView().byId("idClaseOrden");
					oGrupoPlan = this.othis.getView().byId("idGrupoPlan");
					oCentro = this.othis.getView().byId("idCentro");
					oPuestoTrabajo = this.othis.getView().byId("idPuestoTrabajo");
					oUbicacionTec = this.othis.getView().byId("idUbicTecnica");
					oUbicacionTecDes = this.othis.getView().byId("idDesUbicTecnica");
					oEquipo = this.othis.getView().byId("idEquipo");
					oDesEquipo = this.othis.getView().byId("idDescEquipo");
					oPrioridad = this.othis.getView().byId("idPrioridad");
					oPrioridadx = this.othis.getView().byId("idPrioridadx");
					oFechaIni = this.othis.getView().byId("idFechaIni");
					oFechaFin = this.othis.getView().byId("idFechaFin");

					oAviso.setText(oData.Qmnum);
					oClaseOrden.setText(oData.Auart);
					oGrupoPlan.setText(oData.Ingrp);
					oCentro.setText(oData.Iwerk);
					oPuestoTrabajo.setText(oData.Arbpl);
					oUbicacionTec.setText(oData.Tplnr);
					oUbicacionTecDes.setText(oData.Pltxt);
					oEquipo.setText(oData.Equnr);
					oDesEquipo.setText(oData.Eqktx);
					oPrioridad.setText(oData.Priok);
					oPrioridadx.setText(oData.Priokx);
					oFechaIni.setText(oData.Gstrp);
					oFechaFin.setText(oData.Gltrp);

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: get data operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				getDataObservationSave: function(oEvent) {
					var oList = "",
						aObservation = [];

					oList = this.othis.getView().byId("ProductList");

					// for (var i = 0; i < oList.getModel().getData().Items.length; i++) {
					for (var i = oList.getModel().getData().Items.length - 1; i >= 0; i--) {
						var oItem = oList.getModel().getData().Items[i],
							oOperation = {},
							vArbeite = "",
							aObservaton = "";

						if (oItem.Observ === "") {
							continue;
						}

						oOperation = {
							Vornr: oItem.Pos,
							Tdformat: "",
							Tdline: oItem.Text
						};

						aObservation.push(oOperation);

						//Obtener lineas cada 132 caracteres	
						aObservaton = oItem.Observ.match(/.{132}/g);

						if (aObservaton === null) {

							oOperation = {
								Vornr: oItem.Pos,
								Tdformat: "/=",
								Tdline: oItem.Observ
							};

							aObservation.push(oOperation);

							continue;
						}

						for (var j = 0; j < aObservaton.length; j++) {
							var oItemObservation = aObservaton[j];

							oOperation = {
								Vornr: oItem.Pos,
								Tdformat: "=",
								Tdline: oItemObservation
							};

							aObservation.push(oOperation);

						}
					}

					return aObservation;
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: Navigarion app launchpad
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				navToNotifc: function(poParams, pcObjecSem, pcAction) {

					var vcIntent = pcObjecSem + "-" + pcAction;
					// get a handle on the global XAppNav service
					var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

					oCrossAppNavigator.isIntentSupported([vcIntent])
						.done(function(aResponses) {

						})
						.fail(function() {
							sap.m.MessageToast("Provide corresponding intent to navigate");
						});

					// generate the Hash to display a employee Id
					var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
						target: {
							semanticObject: pcObjecSem,
							action: pcAction
						}
						// params: poParams
					})) || "";

					//Generate a  URL for the second application
					var url = window.location.href.split('#')[0] + hash;

					//Navigate to second app
					sap.m.URLHelper.redirect(url, false);
				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: title operation
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				titleReplacement: function(oEvent) {
					var oList = "",
						vPos = "",
						vTitle = "",
						oPos = "";

					oList = this.othis.getView().byId("replacementList");
					vPos = oList.getModel().getData().Items.length;
					vTitle = sap.ui.getCore().byId("titleRepla");

					if (oList.getModel().getData().Items.length > 0) {
						oPos = oList.getModel().getData().Items[0];

						vPos = parseInt(oPos.Pos) + 10;
						vPos = vPos.toString();
					} else {
						vPos = "10";
					}

					vTitle.setTitle("Nuevo Repuesto " + vPos);

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description method: check obligatory fields
				 * @function
				 * @memberOf module: Implements
				 * @inner
				 */
				checkObligatoryOperation: function(oEvent) {

					var inputs = [
							sap.ui.getCore().byId("descp"),
							sap.ui.getCore().byId("txtPuestoEdit"),
							sap.ui.getCore().byId("number")
						],
						canContinue = true;

					// check that inputs are not empty
					// this does not happen during data binding as this is only triggered by changes
					jQuery.each(inputs, function(i, input) {
						input.setValueState("Success");
						if (!input.getValue()) {
							input.setValueState("Error");
						}
					});

					jQuery.each(inputs, function(i, input) {
						if ("Error" === input.getValueState()) {
							canContinue = false;
							return false;
						}
					});

					if (!canContinue) {
						MessageBox.error("Ingresa datos en campos obligatorios");
						return false;
					}

					return true;

				},

				/**
				 * @author: EXSSAABARRIO (Johnny López)
				 * @description: Longitud texto breve de la operación
				 * @function
				 * @memberOf module: Detalle
				 * @inner
				 */
				f_lenghtTextOperation: function(oEvent) {

					var vLabel = sap.ui.getCore().byId("lbTextBrief"),
						vText = sap.ui.getCore().byId("descp"),
						vLabelText = "";

					vLabelText = this.othis.getView().getModel("i18n").getResourceBundle().getText("detailText");

					vLabel.setText(vLabelText + " " + vText.getValue().length);
				}

			});

		return Implement;
	});