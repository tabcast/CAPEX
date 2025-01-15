/*global location */
sap.ui.define([
	"co/com/postobon/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"co/com/postobon/model/formatter",
	"co/com/postobon/js/Implements",
	"sap/m/MessageBox",
	"co/com/postobon/js/operationsFragment"
], function(BaseController, JSONModel, formatter, Implements, MessageBox, opFragment) {
	"use strict";

	var url;
	return BaseController.extend("co.com.postobon.controller.Detail", {
		formatter: formatter,
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0,
				lineItemListTitle: this.getResourceBundle().getText("detailLineItemTableHeading")
			});

			if (typeof sap.ui.getCore().fragment === "undefined") {
				sap.ui.getCore().fragment = new opFragment(this);
			}

			if (typeof sap.ui.getCore().detailImpliments === "undefined") {
				sap.ui.getCore().detailImpliments = new Implements(this);
			}

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
			this.setModel(oViewModel, "detailView");
			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */
		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onShareEmailPress: function() {
			var oViewModel = this.getModel("detailView");
			sap.m.URLHelper.triggerEmail(null, oViewModel.getProperty("/shareSendEmailSubject"), oViewModel.getProperty(
				"/shareSendEmailMessage"));
		},
		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("detailView"),
				oShareDialog = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: oViewModel.getProperty("/shareOnJamTitle")
						}
					}
				});
			oShareDialog.open();
		},
		/**
		 * Updates the item count within the line item table's header
		 * @param {object} oEvent an event containing the total number of items in the list
		 * @private
		 */
		onListUpdateFinished: function(oEvent) {
			var sTitle, iTotalItems = oEvent.getParameter("total"),
				oViewModel = this.getModel("detailView");
			// only update the counter if the length is final
			if (this.byId("lineItemsList").getBinding("items").isLengthFinal()) {
				if (iTotalItems) {
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeadingCount", [iTotalItems]);
				} else {
					//Display 'Line Items' instead of 'Line items (0)'
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeading");
				}
				oViewModel.setProperty("/lineItemListTitle", sTitle);
			}
		},
		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */
		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			sap.ui.getCore().fragment.fnOpenDialog("co.com.postobon.view.fragment.BusyDialog", this);
			debugger;
			var sObjectId = oEvent.getParameter("arguments").objectId;
			var solicituId = oEvent.getParameter("arguments").solicituId;
			
					
			this.f_LoadData(sObjectId, solicituId);					
			jQuery.sap.delayedCall(1500, this, function () {
				sap.ui.getCore().fragment.fnCloseFragment(this);
			});			
			
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("PRESUPUESTO", {
					bukrs: sObjectId,
					solicitud: solicituId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));

			var oDataPresupuesto = "";
			oDataPresupuesto = {
				txtDescripcion : "",
				txtRequiere : "",
				txtBeneficios : "",
				txtConsecuencias : "",
				txtcomunicaciones : "",
				link: "",
				totalAmpliaciones: 0,
				totalItems: 0,
				totalAprob: 0,
				lstItemsItems: [],
				lstAmpliaciones: [],
				lstItemsAprobadores: []
			};
			
			//Textos
			oDataPresupuesto.txtDescripcion = sap.ui.getCore().detailImpliments.getPresupuesto().texto_descripcion;
			var listItem1 = this.getView().byId("listItem1");
			listItem1.setDescription(oDataPresupuesto.txtDescripcion);
			
			oDataPresupuesto.txtRequiere = sap.ui.getCore().detailImpliments.getPresupuesto().texto_requiere;
			var listItem2 = this.getView().byId("listItem2");
			listItem2.setDescription(oDataPresupuesto.txtRequiere);
			
			oDataPresupuesto.txtBeneficios = sap.ui.getCore().detailImpliments.getPresupuesto().texto_beneficios;
			var listItem3 = this.getView().byId("listItem3");
			listItem3.setDescription(oDataPresupuesto.txtBeneficios);
			
			oDataPresupuesto.txtConsecuencias = sap.ui.getCore().detailImpliments.getPresupuesto().texto_consecuencias;
			var listItem4 = this.getView().byId("listItem4");
			listItem4.setDescription(oDataPresupuesto.txtConsecuencias);
			
			oDataPresupuesto.txtcomunicaciones = sap.ui.getCore().detailImpliments.getPresupuesto().texto_comunicacion;
			var listItem5 = this.getView().byId("listItem5");
			listItem5.setDescription(oDataPresupuesto.txtcomunicaciones);
			
			
			//URL
			url = sap.ui.getCore().detailImpliments.getPresupuesto().url;
			//TOTALES
			oDataPresupuesto.totalAmpliac = sap.ui.getCore().detailImpliments.getPresupuesto().total_ampliaciones;
			oDataPresupuesto.totalItems = sap.ui.getCore().detailImpliments.getPresupuesto().total_items;
			oDataPresupuesto.totalAprob = sap.ui.getCore().detailImpliments.getPresupuesto().total_aprobadores;

			//datos para Tablas
			if (sap.ui.getCore().detailImpliments.getPresupuesto().APROBADORES !== null) {
				oDataPresupuesto.lstItemsAprobadores = sap.ui.getCore().detailImpliments.getPresupuesto().APROBADORES.results;
			} else {
				oDataPresupuesto.lstItemsAprobadores = "";
			}
			if (sap.ui.getCore().detailImpliments.getPresupuesto().ITEMS !== null) {
				oDataPresupuesto.lstItemsItems = sap.ui.getCore().detailImpliments.getPresupuesto().ITEMS.results;
			} else {
				oDataPresupuesto.lstItemsItems = "";
			}
			if (sap.ui.getCore().detailImpliments.getPresupuesto().AMPLIACIONES !== null) {
				oDataPresupuesto.lstAmpliaciones = sap.ui.getCore().detailImpliments.getPresupuesto().AMPLIACIONES.results;
			} else {
				oDataPresupuesto.lstAmpliaciones = "";
			}

			var oModel = new sap.ui.model.json.JSONModel(oDataPresupuesto);
			var oList = this.getView().byId("_table_aprob");
			oList.setModel(oModel);
			var oList_items = this.getView().byId("tbl_items");
			oList_items.setModel(oModel);
			var oList_ampli = this.getView().byId("_table_ampli");
			oList_ampli.setModel(oModel);

			//Url Set
			var Link = this.getView().byId("_LinkUrl");
			if (url === '') {
				Link.setText("No se encontró información de presupuesto");
				Link.setEnabled(false);
			} else {
				Link.setText(url);
				Link.setEnabled(true);
			}

			var iconTabBarFilter3 = this.getView().byId("iconTabBarFilter3");
			iconTabBarFilter3.setCount(oDataPresupuesto.totalAmpliac);

			var iconTabBarFilter2 = this.getView().byId("iconTabBarFilter2");
			iconTabBarFilter2.setModel(oModel);
			var iconTabBarFilter1 = this.getView().byId("iconTabBarFilter1");
			iconTabBarFilter1.setModel(oModel);
			
		
		},

		_OnLinkUrl: function() {
			if (url !== '')
				window.open(url, '_blank');
		},

		/**
		 * Binds the view to the object path. Makes sure that detail view displays
		 * a busy indicator while data for the corresponding element binding is loaded.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound to the view.
		 * @private
		 */
		_bindView: function(sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getModel("detailView");
			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);
			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});

		},
		_onBindingChange: function() {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();
			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				// if object could not be found, the selection in the master list
				// does not make sense anymore.
				this.getOwnerComponent().oListSelector.clearMasterListSelection();
				return;
			}

			var sPath = oElementBinding.getPath(),
				oResourceBundle = this.getResourceBundle(),
				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.bukrs,
				sObjectName = oObject.solicitud,
				oViewModel = this.getModel("detailView");

			this.getOwnerComponent().oListSelector.selectAListItem(sPath);
			oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("shareSaveTileAppTitle", [sObjectName]));
			oViewModel.setProperty("/shareOnJamTitle", sObjectName);
			oViewModel.setProperty("/shareSendEmailSubject", oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage", oResourceBundle.getText("shareSendEmailObjectMessage", [
				sObjectName,
				sObjectId,
				location.href
			]));

			sap.ui.getCore().detailImpliments.setTextoSolicitud("");

		},
		_onMetadataLoaded: function() {
			// Store original busy indicator delay for the detail view
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = this.getModel("detailView"),
				oLineItemTable = this.byId("lineItemsList"),
				iOriginalLineItemTableBusyDelay = oLineItemTable.getBusyIndicatorDelay();
			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/lineItemTableDelay", 0);
			oLineItemTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for line item table
				oViewModel.setProperty("/lineItemTableDelay", iOriginalLineItemTableBusyDelay);
			});
			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		},
		/**
		 * @author: ce_alopez (Johnny López)
		 * @description: Load data
		 * @function
		 * @memberOf module: Detalle
		 * @inner
		 */
		f_LoadData: function(objectId, solicituId) {
			//sap.ui.getCore().detailImpliments.clearPresupuesto();
			sap.ui.getCore().detailImpliments.setPresupuestPost(objectId, solicituId);
			//sap.ui.getCore().detailImpliments.setDataPresupuestoAsyn();
			sap.ui.getCore().detailImpliments.setDataPresupuesto();
		},
		/**
		 * @author: ce_alopez (Johnny López)
		 * @description: Verificar si los datos están cargados
		 * @function
		 * @memberOf module: Detalle
		 * @inner
		 */
		f_check_data: function() {
			var oData = "";
			oData = sap.ui.getCore().detailImpliments.getPresupuesto();
			if (!oData.hasOwnProperty('data')) {
				sap.ui.getCore().detailImpliments.setDataPresupuesto();
			}
		},
		onBeforeRendering: function() {},
		onAfterRendering: function() {},

		/**
		 * @author: ce_alopez (Johnny López)
		 * @description: Rechazar solicitud
		 * @function
		 * @memberOf module: Detalle
		 * @inner
		 */
		fnCancelar: function(oEvent) {
			var oResponseProceso = {},
				sSolicitud = {},
				sCodigoSociedad = {};

			sSolicitud = this.getView().byId("Solicitud").getText();
			sCodigoSociedad = this.getView().byId("CodigoSociedad").getText();
			oResponseProceso = sap.ui.getCore().detailImpliments.executeActionButton(sSolicitud, sCodigoSociedad, "", "X", sap.ui.getCore().detailImpliments
				.getTextoSolicitud());

			if (oResponseProceso.data !== null) {

				MessageBox.show(
					"No se rechazo la solicitud", {
						icon: MessageBox.Icon.ERROR,
						title: "No Rechazada"
							// actions: [MessageBox.Action.YES, MessageBox.Action.NO],
							// onClose: function (oAction) {
							// 	/ * do something * /
							// }
					}
				);

				return;
			} else if (oResponseProceso.data === null) {

				MessageBox.show(
					"Se rechazo la solicitud", {
						icon: MessageBox.Icon.SUCCESS,
						title: "Rechazada"
							// actions: [MessageBox.Action.YES, MessageBox.Action.NO],
							// onClose: function (oAction) {
							// 	/ * do something * /
							// }
					}
				);

			}
		},

		/**
		 * @author: ce_alopez (Johnny López)
		 * @description: Aceptar solicitud
		 * @function
		 * @memberOf module: Detalle
		 * @inner
		 */
		fnAceptar: function(oEvent) {
			debugger;
			var oResponseProceso = {},
				sSolicitud = {},
				sCodigoSociedad = {};

			sSolicitud = this.getView().byId("Solicitud").getText();
			sCodigoSociedad = this.getView().byId("CodigoSociedad").getText();
			oResponseProceso = sap.ui.getCore().detailImpliments.executeActionButton(sSolicitud, sCodigoSociedad, "X", "", sap.ui.getCore().detailImpliments
				.getTextoSolicitud());

			if (oResponseProceso.data !== null) {

				MessageBox.show(
					"No se aprobó la solicitud", {
						icon: MessageBox.Icon.ERROR,
						title: "No aprobada"
							// actions: [MessageBox.Action.YES, MessageBox.Action.NO],
							// onClose: function (oAction) {
							// 	/ * do something * /
							// }
					}
				);

				return;
			} else if (oResponseProceso.data !== null) {

				MessageBox.show(
					"Se aprobo solicitud", {
						icon: MessageBox.Icon.SUCCESS,
						title: "Aprobada"
							// actions: [MessageBox.Action.YES, MessageBox.Action.NO],
							// onClose: function (oAction) {
							// 	/ * do something * /
							// }
					}
				);

			}
		},

		/**
		 * @author: ce_alopez (Johnny López)
		 * @description: Agregar nota solicitud
		 * solicitud
		 * @function
		 * @memberOf module: Detalle
		 * @inner
		 */
		fnAgregarNota: function(oEvent) {
			var sTextoSolicitud = "";
			sap.ui.getCore().fragment.fnOpenDialog("co.com.postobon.view.fragment.texto", this);
			sTextoSolicitud = sap.ui.getCore().byId("observ");
			sTextoSolicitud.setValue(sap.ui.getCore().detailImpliments.getTextoSolicitud());
		},

		/**
		 * @author: ce_alopez (Johnny López)
		 * @description: Confirmar nota solicitud
		 * solicitud
		 * @function
		 * @memberOf module: Detalle
		 * @inner
		 */
		fnTextoSolicitud: function(oEvent) {
			var sTextoSolicitud = "";
			sTextoSolicitud = sap.ui.getCore().byId("observ");

			sap.ui.getCore().detailImpliments.setTextoSolicitud(sTextoSolicitud.getValue());
			sap.ui.getCore().fragment.fnCloseFragment(this);
		},

		/**
		 * @author: ce_alopez (Johnny López)
		 * @description: Cancelar nota solicitud
		 * solicitud
		 * @function
		 * @memberOf module: Detalle
		 * @inner
		 */
		fnCerrarFragment: function(oEvent) {
			sap.ui.getCore().fragment.fnCloseFragment(this);
		},

		fnSelectIconBar: function(OEvent) {
			this.f_check_data();
			this.f_map_data();
		},

		f_map_data: function() {

			var oDataPresupuesto = "";
			oDataPresupuesto = {
				link: "",
				totalAmpliaciones: 0,
				totalItems: 0,
				totalAprob: 0,
				lstItemsItems: [],
				lstAmpliaciones: [],
				lstItemsAprobadores: []
			};			
			
			//URL
			url = sap.ui.getCore().detailImpliments.getPresupuesto().data.url;
			//TOTALES
			oDataPresupuesto.totalAmpliac = sap.ui.getCore().detailImpliments.getPresupuesto().data.total_ampliaciones;
			oDataPresupuesto.totalItems = sap.ui.getCore().detailImpliments.getPresupuesto().data.total_items;
			oDataPresupuesto.totalAprob = sap.ui.getCore().detailImpliments.getPresupuesto().data.total_aprobadores;

			//datos para Tablas
			if (sap.ui.getCore().detailImpliments.getPresupuesto().data.APROBADORES !== null) {
				oDataPresupuesto.lstItemsAprobadores = sap.ui.getCore().detailImpliments.getPresupuesto().data.APROBADORES.results;
			} else {
				oDataPresupuesto.lstItemsAprobadores = "";
			}
			if (sap.ui.getCore().detailImpliments.getPresupuesto().data.ITEMS !== null) {
				oDataPresupuesto.lstItemsItems = sap.ui.getCore().detailImpliments.getPresupuesto().data.ITEMS.results;
			} else {
				oDataPresupuesto.lstItemsItems = "";
			}
			if (sap.ui.getCore().detailImpliments.getPresupuesto().data.AMPLIACIONES !== null) {
				oDataPresupuesto.lstAmpliaciones = sap.ui.getCore().detailImpliments.getPresupuesto().data.AMPLIACIONES.results;
			} else {
				oDataPresupuesto.lstAmpliaciones = "";
			}
			
			var oModel = new sap.ui.model.json.JSONModel(oDataPresupuesto);
			var oList = this.getView().byId("_table_aprob");
			oList.setModel(oModel);
			var oList_items = this.getView().byId("tbl_items");
			oList_items.setModel(oModel);
			var oList_ampli = this.getView().byId("_table_ampli");
			oList_ampli.setModel(oModel);

			//Url Set
			var Link = this.getView().byId("_LinkUrl");
			if (url === '') {
				Link.setText("No se encontró información de presupuesto");
				Link.setEnabled(false);
			} else {
				Link.setText(url);
				Link.setEnabled(true);
			}

			var iconTabBarFilter3 = this.getView().byId("iconTabBarFilter3");
			iconTabBarFilter3.setCount(oDataPresupuesto.totalAmpliac);

			var iconTabBarFilter2 = this.getView().byId("iconTabBarFilter2");
			iconTabBarFilter2.setModel(oModel);
			var iconTabBarFilter1 = this.getView().byId("iconTabBarFilter1");
			iconTabBarFilter1.setModel(oModel);
		}

	});
});